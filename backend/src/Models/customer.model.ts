import User from "./user.model";
import makeid from "../helpers/makeid";

class Customer extends User {
    public custId: string;
    constructor(dataSource: any) {
        super(dataSource)

        this.custId = makeid(10);
    }
}

export default Customer;