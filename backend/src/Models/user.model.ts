import bcrypt from 'bcrypt';
class User {
    public userName: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public mobile: string;
    private password: string;
    public address: string;
    public dob: Date;
    public lastLogin: number;
    public signupDate: number;

    constructor(username: string, firstName: string, lastName: string, email: string, mobile: string, password: string, address?: string) {
        this.userName = username;
        this.firstName = firstName;
        this.lastName = lastName
        this.email = email;
        this.mobile = mobile;
        this.address = address;
        this.setPassword(password)
    }

    private async setPassword(password: string) {
        this.password = await bcrypt.hash(password, parseInt(process.env.hash))
    }

    async login(userName?: string, password?: string) {
        this.lastLogin = Date.now();
        return;
    }

    async register() {
        this.signupDate = Date.now();
        return;
    }
}

export default User;