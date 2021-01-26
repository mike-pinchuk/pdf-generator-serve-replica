import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PostService } from './post.service';

@ApiBearerAuth()
@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    
}
