import User from "./user.model";
import makeid from "../helpers/makeid";

class Doctor extends User {
    public userAccType = "CUST";

    constructor(dataSource: any) {
        super(dataSource);
        this.repository = dataSource.getRepository()
    }

}

export default Doctor;