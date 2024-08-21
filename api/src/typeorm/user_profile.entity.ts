import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'user_profile'})
export class UserProfile {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number;
  
  @Column({
    nullable: false,
    default: '',
  })
  username: string;

  @Column({
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    default: 2
  })
  role: number;
}