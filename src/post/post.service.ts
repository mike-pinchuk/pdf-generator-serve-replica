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
        return this.postRepository.findOne(findCriteria, { relations });
    }

    async update(id: string, post: Partial<Omit<PostEntity, 'id'>>): Promise<void> {
        await this.postRepository.update({id}, post);
    }

    async getPosts(findCriteria: Partial<Pick<PostEntity, 'userId'>> = {}, relations = ['user']) {
        const [items, total] = await this.postRepository.findAndCount({
            where: findCriteria,
            relations,
        });
        return {
            items,
            total,
        };
    }
}
