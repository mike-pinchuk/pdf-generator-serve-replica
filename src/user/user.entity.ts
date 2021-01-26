import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from 'src/post/post.entity'

@Entity('user')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ name: 'password_hash', nullable: false })
    passwordHash: string;

    @OneToMany(() => PostEntity, (post) => post.user)
    posts: PostEntity[]
}
