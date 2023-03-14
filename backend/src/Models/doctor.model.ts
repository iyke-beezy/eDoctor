import User from "./user.model";
import makeid from "../helpers/makeid";

class Doctor extends User {
    public doctorId: string;
    async register() {
        this.signupDate = Date.now();
        return;
    }

    constructor(username: string, firstName: string, lastName: string, email: string, mobile: string, password: string, address?: string) {
        super(username, firstName, lastName, email, mobile, password, address);
        this.doctorId = makeid(10)
    }

    async login() {
        this.lastLogin = Date.now();
        return;
    }
}

export default Doctor;