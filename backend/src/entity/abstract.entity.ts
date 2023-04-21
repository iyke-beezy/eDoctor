import { Column, PrimaryColumn } from 'typeorm'


abstract class Content {
    @Column()
    id: string

    @Column("varchar", { length: 20 })
    firstName: string

    @Column()
    lastName: string

    @PrimaryColumn({ type: "varchar", length: 20 })
    userName: string;

    @PrimaryColumn()
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