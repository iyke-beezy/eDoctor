import express from 'express';
import bodyParser from 'body-parser';
import User from './Models/user.model';
// import pool from './dbconfig/db'
import { Request, Response, NextFunction } from 'express';
import { myDataSource } from './dbconfig/data-source'
import authRoute from './routes/auth.route';
import apiRoute from './routes/api.route';

class App {
    private server;
    private config;
    public log;
    public dataSource: any;
    public applicationUser: User;

    constructor(config: any) {
        this.config = config;
        this.server = express();
        this.log = config.log();

        //connect to postgres db
        this.dbConnect();

        // configurations
        this.configuration();
        this.routerConfig();

    }

    private configuration() {
        this.server.use(bodyParser.urlencoded({ extended: true }))
        this.server.use(bodyParser.json({ limit: '1mb' })) //100kb by default

        if (this.server.get("env") === "development") {
            this.server.use((req: Request, res: Request, next: NextFunction) => {
                this.log.debug(`${req.method}: ${req.url}`);
                return next();
            });
        }

        /*this.server.use((error: any, req: Request, res: Response) => {
            // Log out the error to the console
            this.log.error(error);
            return res.status(500).json({
                error: {
                    message: error.message,
                },
            });
        });*/

    }

    private dbConnect() {
        /* pool.connect((err: any, client, done) => {
             if (err) throw new Error(err);
             this.log.info('DB Connected')
         });
 
         */
        // using typeorm 
        myDataSource
            .initialize()
            .then(() => {
                this.log.info("Data Source has been initialized!")
            })
            .catch((err) => {
                this.log.error("Error during Data Source initialization:", err)
            })

        this.dataSource = myDataSource;

    }

    public routerConfig() {
        this.server.get('/', (req: Request, res: Response) => {
            res.send('Hello World!');
        });

        this.server.use('/auth', authRoute(this.dataSource))
        this.server.use('/api', apiRoute(this.dataSource))
    }
    /*
    private setApplicationUser (value){
        this.applicationUser = value
    }

    private getApplicationUser() {
        return this.applicationUser;
    }

    public getAppUser () {
        return this.getApplicationUser
    }
    */

    public getServer() {
        return this.server;
    }
}

export default App;