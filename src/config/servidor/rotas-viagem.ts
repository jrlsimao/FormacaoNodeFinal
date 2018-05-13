import * as Express from 'express';
import {ViagemClass} from '../../controladores/viagem-controlador';
export class RotasViagem {
    private expressApp : Express.Application;
    private localController : any;

    constructor(serverApp: Express.Application){
        this.expressApp = serverApp;
        this.localController = new ViagemClass();
        this.expressApp.post('/createTrip', this.localController.cadastrarViagem.bind(this.localController));
        this.expressApp.get('/getTrip/:id', this.localController.getViagemById.bind(this.localController));
    }


}