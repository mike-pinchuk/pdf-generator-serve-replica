import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePostUserDto } from './dto/post-user.dto';
import { PostService } from './post.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthorizedRequest } from 'src/utils/types';

@ApiBearerAuth()
@ApiTags('posts')
@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    createPost(@Body() createPostUserDto: CreatePostUserDto, @Req() req: AuthorizedRequest) {
        return this.postService.createNewPost({ ...createPostUserDto, userId: req.user.id });
    }

}
