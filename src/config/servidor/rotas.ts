import * as Express from 'express';
import UsuarioControlador from '../../controladores/usuario-controlador';
export class RotasUser {
    private expressApp : Express.Application;
    private localController : any;

    constructor(serverApp: Express.Application){
        this.expressApp = serverApp;
        this.localController = new UsuarioControlador();
        this.expressApp.post('/createUserAPerson', this.localController.criarUsuario.bind(this.localController));
        this.expressApp.put('/updatePerson', this.localController.updatePerson.bind(this.localController));
        this.expressApp.delete('/deletePerson', this.localController.eliminarPerson.bind(this.localController));
        this.expressApp.post('/login', this.localController.login.bind(this.localController));
    }


}