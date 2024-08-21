import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config';
import { Game } from './game/entities/game.entity';
import { Bet } from './bet/entities/bet.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABSE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: [Game, Bet],
  migrations: ['./src/migration/*.ts'],
  subscribers: [],
});
