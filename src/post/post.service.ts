import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserServices } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreatePostUserDto } from './dto/post-user.dto';
import { PostEntity } from './post.entity';

@Injectable()
export class PostService {
    constructor(@InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>, private userService: UserServices) { }
    
    createNewPost(postDto: CreatePostUserDto) {
        
        return this.postRepository.save(postDto)
    }
}
