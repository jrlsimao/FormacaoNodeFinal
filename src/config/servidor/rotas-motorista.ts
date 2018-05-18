import * as Express from 'express';
import {MotoristaClass} from '../../controladores/motorista-controlador';
import UsuarioControlador from '../../controladores/usuario-controlador'
export class RotasMotorista {
    private expressApp : Express.Application;
    private localController : any;

    constructor(serverApp: Express.Application){
        this.expressApp = serverApp;
        this.localController = new MotoristaClass();//Novo localCOntroller
        const controladorAuth = new UsuarioControlador();
        this.expressApp.post('/createUserAMotorista', this.localController.criarMotorista.bind(this.localController));
        this.expressApp.put('/updateMotoristas', controladorAuth.verificaLogin.bind(controladorAuth),this.localController.UpdateMotorista.bind(this.localController));
        this.expressApp.delete('/deleteMotoristas/:id', controladorAuth.verificaLogin.bind(controladorAuth),this.localController.DeleteMotorista.bind(this.localController));
        this.expressApp.get('/getMotorista/:id', controladorAuth.verificaLogin.bind(controladorAuth),this.localController.getMotoristaByID.bind(this.localController));
        this.expressApp.post('/getMotoristas', controladorAuth.verificaLogin.bind(controladorAuth), this.localController.getMotoristaNear.bind(this.localController));
        
    }


}