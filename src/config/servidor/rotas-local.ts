import * as Express from 'express';
import {LocalizacaoClass} from '../../controladores/local-controlador';

export class RotasLocal {
    private expressApp : Express.Application;
    private localController : any;

    constructor(serverApp: Express.Application){
        this.expressApp = serverApp;
        this.localController = new LocalizacaoClass();
        this.expressApp.post('/createGPSCoordinates', this.localController.cadastrarLocalizacaoUser.bind(this.localController));
        this.expressApp.put('/updateCoordinates', this.localController.updateLocalizacao.bind(this.localController));
        this.expressApp.delete('/removeGPSPosition/:id', this.localController.removeLocalizacao.bind(this.localController));
        this.expressApp.get('/getCurrentPosition/:id', this.localController.getLocalizacao.bind(this.localController));
    }


}