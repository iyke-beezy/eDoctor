import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import UserEntity from '../entity/user.entity';
import { NotFoundError, AuthenticationError, UserExistError, ServerError } from '../Error/errors'

class User {
    public userName: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public mobile: string;
    private password: string;
    public address: string;
    public dob: Date;
    public lastLogin: Date;
    public signupDate: Date;
    public dataSource: any;
    public repository: any;
    public userAccType = "CUST";
    private jwtPrivateSecret: string;

    constructor(dataSource: any) {
        this.dataSource = dataSource
        this.repository = dataSource.getRepository(UserEntity);
        this.jwtPrivateSecret = process.env.JWT_PRIVATE_SECRET.replace(/\\n/g, "\n");
    }

    public async getPassword(password: string) {
        return await bcrypt.hash(password, parseInt(process.env.hash) || 10)
    }

    public async login(userName: string, password: string) {
        // eslint-disable-next-line no-useless-catch
        try {
            const user = await this.dataSource.getRepository(UserEntity).findOneBy({
                userName
            })
            if (!user) {
                throw new NotFoundError('User does not exist, please create a new User.')
            }
            this.password = user.password;
            const checkPassword = await this.comparePassword(password);

            if (!checkPassword) {
                throw new AuthenticationError('Wrong Credentials!');
            }

            this.lastLogin = new Date();
            user.lastLogin = this.lastLogin;
            await this.repository.save(user);

            // generate sha256 token for frontend
            const token = this.generateVerificationToken(user.id, user.name);

            return {
                user: { id: user.id, name: user.firstName + " " + user.lastName },
                token
            };
        }
        catch (error) {
            if (error instanceof NotFoundError || error instanceof AuthenticationError) {
                throw error;
            } else {
                throw new ServerError()
            }
        }
    }

    async getUser(id: string) {
        try {
            const user = await this.repository.findOneBy({
                id
            });
            if (!user) {
                throw new NotFoundError('User Not Found');
            }
            return user;
        } catch (err) {
            if (err instanceof NotFoundError) throw err;
            throw new ServerError();
        }

    }

    async getUsers(cliche: string, value: string) {
        try {
            const users = await this.repository.find({
                where: {
                    [cliche]: value
                }
            })

            if (!users) {
                throw new NotFoundError('Users not Found for operation.')
            }
            return users;
        } catch (err) {
            if (err instanceof NotFoundError) throw err;
            throw new ServerError();
        }
    }

    async getAllUsers() {
        try {
            const users = await this.repository.find({
                order: {
                    id: "DESC",
                },
            });
            return users;
        } catch (err) {
            return err;
        }

    }

    async register(username: string, firstName: string, lastName: string, email: string, mobile: string, dob?: Date, password?: string, address?: string) {
        this.userName = username;
        this.firstName = firstName;
        this.lastName = lastName
        this.email = email;
        this.mobile = mobile;
        this.address = address;
        this.dob = new Date(dob);
        this.password = password;
        password = await this.getPassword(password)

        this.signupDate = new Date();
        const checkUserName = await this.repository.findOneBy({
            userName: username,
        })
        // check if username exists
        if (checkUserName) {
            throw new UserExistError('Username Already Exists! Please choose another username');
        }
        else {
            const user = new UserEntity();
            user.firstName = this.firstName;
            user.lastName = this.lastName;
            user.userName = this.userName;
            user.email = this.email;
            user.password = password;
            user.mobile = this.mobile;
            user.address = this.address;
            user.dob = this.dob;
            user.signupDate = this.signupDate
            user.userAccType = "CUST"

            await this.repository.save(user);
            return {
                status: '200',
                data: this.toJSON()
            };
        }
    }

    async comparePassword(password: string) {
        return await bcrypt.compare(password, this.password);
    }

    /*async saveRecord() {
        try {
            await this.dataSource.save();
            return this;
        } catch (error) {
            return {
                status: 500,
                message: error.message
            }
        }
    }
*/
    toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            email: this.email,
            mobile: this.mobile,
            address: this.address,
            dob: this.dob,
        }
    }

    private generateVerificationToken = (id: number, name: string) => {
        return jwt.sign({ id, name }, this.jwtPrivateSecret, {
            expiresIn: "10d",
            algorithm: "RS256",
        });
    }
}

export default User;