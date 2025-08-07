import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Timestamp } from 'typeorm'
import { User } from '../../users/entities/user.entity';

@Entity('role')

export class Role {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({ type: 'varchar', length: 50 })
    title: string;

    @Column('text', { array: true })
    permissions: string[];

    
    @OneToMany(() => User, user => user.role_id)
    users: User[];
    
    @Column({ type: 'boolean', default:0})
    is_deleted: boolean;

    @Column({ type: 'timestamp', default: () => 'current_timestamp'})
    created_at: Timestamp;

    @Column({type: 'timestamp', default: () => 'current_timestamp'})
    updated_at: Timestamp;
}