import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({name: 'user_coin'})
export class UserCoin {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;
  
  @Column()
  user_id: number;

  @Column()
  network: string;

  @Column()
  address: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}