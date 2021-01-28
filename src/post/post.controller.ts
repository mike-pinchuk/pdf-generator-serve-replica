import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserServices } from 'src/user/user.service';
import { CreatePostUserDto } from './dto/post-user.dto';
import { PostService } from './post.service';

@ApiBearerAuth()
@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService, private readonly userService: UserServices) { }

    @Post()
    createPost(@Body() createPostUserDto: CreatePostUserDto) {
        return this.postService.createNewPost(createPostUserDto)
    }

}
