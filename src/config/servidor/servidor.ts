import Express from 'express';
import * as bodyParser from 'body-parser';


export class Servidor {
    private app: Express.Application;

    constructor(){
        this.app = Express();
        this.app.use(bodyParser.json());
    }

    public getAppConfig(): Express.Application{
        return this.app;
    }

}
