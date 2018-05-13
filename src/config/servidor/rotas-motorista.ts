import * as Express from 'express';
import {MotoristaClass} from '../../controladores/motorista-controlador';
export class RotasMotorista {
    private expressApp : Express.Application;
    private localController : any;

    constructor(serverApp: Express.Application){
        this.expressApp = serverApp;
        this.localController = new MotoristaClass();//Novo localCOntroller
        this.expressApp.post('/createUserAMotorista', this.localController.criarMotorista.bind(this.localController));
        this.expressApp.post('/getMotoristas', this.localController.getMotoristaNear.bind(this.localController));
        
    }


}