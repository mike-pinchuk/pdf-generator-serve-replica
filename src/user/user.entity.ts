import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from 'src/post/post.entity'

@Entity('user')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ name: 'password_hash', nullable: false })
    passwordHash: string;

    @JoinColumn({name: 'userId'})
    userId: string

    @OneToMany(() => PostEntity, (post) => post.user)
    @JoinColumn({ name: 'userId' })
    posts: PostEntity[]
}
