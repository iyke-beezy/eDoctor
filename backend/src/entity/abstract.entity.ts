import { Column, PrimaryGeneratedColumn } from 'typeorm'


abstract class Content {
    @PrimaryGeneratedColumn()
    id: string

    @Column("varchar", { length: 20 })
    firstName: string

    @Column()
    lastName: string

    @Column({ type: "varchar", length: 20 })
    userName: string;

    @Column()
    email: string;

    @Column()
    mobile: string;

    @Column()
    password: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    address: string;

    @Column({
        nullable: true
    })
    dob: Date;

    @Column({
        nullable: true
    })
    lastLogin: Date;

    @Column({
        nullable: true
    })
    signupDate: Date;

    @Column()
    userAccType: string;
}

export default Content;