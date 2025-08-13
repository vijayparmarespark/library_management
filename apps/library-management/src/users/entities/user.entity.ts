import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Timestamp,
  JoinColumn,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  first_name: string;

  @Column({ type: 'varchar', length: 50 })
  last_name: string;

  @Column({ type: 'varchar', length: 15 })
  phone_number: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @Column({ type: 'varchar', nullable: true })
  profile_image: string;

  @Column({ type: 'int', nullable: true })
  otp: number;

  @Column({ type: 'timestamp', nullable: true })
  otp_expiry: Timestamp;

  @Column({ type: 'boolean', default: 0 })
  is_deleted: boolean;

  @Column({ type: 'timestamp', default: () => 'current_timestamp' })
  created_at: Timestamp;

  @Column({ type: 'timestamp', default: () => 'current_timestamp' })
  updated_at: Timestamp;
}
