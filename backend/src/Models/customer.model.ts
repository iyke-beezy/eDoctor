import User from "./user.model";
import makeid from "../helpers/makeid";

class Customer extends User {
    public custId: string;
    constructor(username: string, firstName: string, lastName: string, email: string, mobile: string, password: string, address?: string) {
        super(username, firstName, lastName, email, mobile, password, address);

        this.custId = makeid(10);
    }
}

export default Customer;