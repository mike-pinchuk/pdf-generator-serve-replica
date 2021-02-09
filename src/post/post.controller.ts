import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePostUserDto } from './dto/create-post-user.dto';
import { PostService } from './post.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthorizedRequest } from '../utils/types';
import { UpdatePostUserDto } from './dto/update-post.dto';
import { UserService } from '../user/user.service';

@ApiBearerAuth()
@ApiTags('post')
@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService, private readonly userService: UserService) {
  }

  @Post()
  async createPost(@Body() createPostUserDto: CreatePostUserDto, @Req() req: AuthorizedRequest) {
    const post = await this.postService.getPost({ title: createPostUserDto.title });
    if (post) {
      throw new BadRequestException('ERROR_POST_WITH_THIS_TITLE_EXIST');
    }
    const savedPost = await this.postService.createNewPost({ ...createPostUserDto, userId: req.user.id });
    return this.postService.getPost({ id: savedPost.id });
  }

  @Patch(':id')
  async updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostUserDto) {
    // TODO add uuid validation
    const post = await this.postService.getPost({ id });
    if (!post) {
      throw new BadRequestException('ERROR_POST_NOT_FOUND');
    }
    if ('title' in updatePostDto) {
      const postTitle = await this.postService.getPost({ title: updatePostDto.title });
      if (postTitle) {
        throw new BadRequestException('ERROR_POST_WITH_THIS_TITLE_EXIST');
      }
    }
    await this.postService.update(id, updatePostDto);
    return this.postService.getPost({ id });
  }

  @Get('/all')
  async findAllPosts() {
    return this.postService.getPosts();
  }

  @Get('/user/:id')
  async findAllUserPosts(@Param('id') userId: string) {
    // TODO add uuid validation
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new BadRequestException('ERROR_INVALID_USER_ID');
    }
    return this.postService.getPosts({ userId }, []);
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    // TODO add uuid validation
    const post = await this.postService.getPost({ id });
    if (!post) {
      throw new BadRequestException('ERROR_POST_NOT_FOUND');
    }
    return post;
  }

}
