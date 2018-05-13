import * as Express from 'express';
import UsuarioControlador from '../../controladores/usuario-controlador';
export class Rotas {
    private expressApp : Express.Application;
    private localController : any;

    constructor(serverApp: Express.Application){
        this.expressApp = serverApp;
        this.localController = new UsuarioControlador();
        this.expressApp.post('/createUserAPerson', this.localController.criarUsuario.bind(this.localController));
        this.expressApp.post('/createGPSCoordinates', this.localController.cadastrarLocalizacaoUser.bind(this.localController));
        this.expressApp.post('/login', this.localController.login.bind(this.localController));
        this.expressApp.put('/updateCoordinates', this.localController.updateLocalizacao.bind(this.localController));
        this.expressApp.get('/getCurrentPosition/:id', this.localController.getLocalizacao.bind(this.localController));
    }


}