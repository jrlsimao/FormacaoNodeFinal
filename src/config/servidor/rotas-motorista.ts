import * as Express from 'express';
import {MotoristaClass} from '../../controladores/motorista-controlador';
export class RotasMotorista {
    private expressApp : Express.Application;
    private localController : any;

    constructor(serverApp: Express.Application){
        this.expressApp = serverApp;
        this.localController = new MotoristaClass();//Novo localCOntroller
        this.expressApp.post('/createUserAMotorista', this.localController.criarMotorista.bind(this.localController));
        this.expressApp.put('/updateMotoristas', this.localController.UpdateMotorista.bind(this.localController));
        this.expressApp.delete('/deleteMotoristas', this.localController.DeleteMotorista.bind(this.localController));
        this.expressApp.get('/getMotorista/:id', this.localController.getMotoristaByID.bind(this.localController));
        this.expressApp.post('/getMotoristas', this.localController.getMotoristaNear.bind(this.localController));
        
    }


}