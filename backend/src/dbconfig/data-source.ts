import { DataSource } from 'typeorm';
import User from '../entity/user.entity';

export const myDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "edoctor",
    password: "edoctor",
    database: "api",
    entities: [User],
    logging: true,
    synchronize: true,
});