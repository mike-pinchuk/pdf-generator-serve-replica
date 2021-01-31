import { UserEntity } from '../user/user.entity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('post')
export class PostEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id!: string;

    @Column({ nullable: false, length: 120 })
    title!: string;

    @Column({ nullable: false, length: 1200 })
    content!: string;

    @Column({name: 'user_id', nullable: false})
    userId!: string;

    @CreateDateColumn({ nullable: false, name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' }) // onUpdate: 'now()'
    updatedAt!: Date;

    @ManyToOne(() => UserEntity, (user) => user.posts)
    @JoinColumn({name: 'user_id'})
    user?: UserEntity;
}
