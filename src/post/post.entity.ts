import { id } from "cls-rtracer";
import { UserEntity } from "src/user/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('post')
export class PostEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
    id: string

    @Column({nullable: false, length: 120})
    title: string

    @Column({nullable: false, length: 1200})
    content: string

    @JoinColumn({name: 'id'})
    userId: string

    @Column({nullable: false, name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at', onUpdate: 'now()'})
    updatedAt: Date

    @ManyToOne(() => UserEntity, (user) => user.id)
    user: UserEntity
}