import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePostUserDto } from './dto/post-user.dto';
import { PostService } from './post.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthorizedRequest } from '../utils/types';
import { UpdatePostUserDto } from './dto/update-post.dto';

@ApiBearerAuth()
@ApiTags('posts')
@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createPost(@Body() createPostUserDto: CreatePostUserDto, @Req() req: AuthorizedRequest) {
        const savedPost = await this.postService.createNewPost({ ...createPostUserDto, userId: req.user.id });
        return this.postService.getPost({ id: savedPost.id });
    }

    @Get()
    async findAllPosts() {
        return this.postService.getPosts();
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostUserDto) {
        await this.postService.update(id, updatePostDto);
        return this.postService.getPost({ id });
    }

    @Get('/all_posts/:id')
    @UseGuards(JwtAuthGuard)
    async findAllUserPosts(@Param('id') id: string) {
        return this.postService.getPostsUser({ userId: id });
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getPostId(@Param('id') id: string) {
        return this.postService.getPost({ id });
    }

}
