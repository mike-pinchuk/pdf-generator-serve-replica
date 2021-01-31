import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';

@Injectable()
export class PostService {
    constructor(@InjectRepository(PostEntity) private postRepository: Repository<PostEntity>) { }

    async createNewPost(postDto: Pick<PostEntity, 'title' | 'content' | 'userId'>) {
        return this.postRepository.save(postDto);
    }

    async getPost(findCriteria: Partial<Pick<PostEntity, 'id' | 'title'>>, relations = ['user']) {
        return this.postRepository.findOne(findCriteria, {relations});
    }
}
