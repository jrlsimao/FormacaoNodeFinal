import {Request, Response} from 'express';
import {UsuarioInterface} from '../interfaces/usuario-interface';
import {PessoaInterface} from '../interfaces/pessoa-interface';
import {LocalUsuarioInterface} from '../interfaces/local-usuario-interface';
import {Usuario} from '../config/bancoDados/Schemas/usuario-schema';
import {Pessoa} from '../config/bancoDados/Schemas/pessoa-schema';
import {LocalizacaoUsuario} from '../config/bancoDados/Schemas/local-usuario-schema';
import axios, { AxiosStatic, AxiosInstance } from 'axios';


export default class UsuarioControlador {

    constructor(){

    }

    public async criarUsuario(req:Request, resp:Response){
        if(Object.keys(req.body).length !== 0 && req.body.constructor === Object){
            try{
                let instanciaUsuario = new Usuario(<UsuarioInterface>req.body);
                if(instanciaUsuario){
                    const usuario = await instanciaUsuario.save();

                    if(usuario){

                        let instanciaPessoa = new Pessoa(<PessoaInterface>req.body);
                        instanciaPessoa.Usuario = usuario._id;
                        const pessoa = await instanciaPessoa.save();

                        if(pessoa){
                            const infoPessoa = pessoa;
                            const infoUser = usuario;
                                
                            const resultado = await this.enviaMail('Bemvindo à plataforma ' + infoPessoa.Nome, infoUser.email);
                            
                            if(resultado===true){
                                resp.status(200).send(pessoa);
                            }
                            else{
                                resp.status(500).send('Problemas no envio de Email');
                            }
                        }else{
                            resp.status(500).send('Erro no preenchimento da informação da Pessoa');
                        }
                        
                    }else{
                        resp.status(500).send('Erro no cadastro do usuario');
                    }
                }else{
                    resp.status(500).send('Erro no cadastro');
                }
            }
            catch(Erro){
                console.log(Erro);
                resp.status(500).send('Erro no metodo de criacao');
            }
        }
    }

    public async login(req:Request, resp: Response){
        
        if(Object.keys(req.body).length !== 0 && req.body.constructor === Object){
            let mail = req.body.email;
            let password = req.body.password;
            try{
                const resultado = await Usuario.findOne({email: mail});

                if(resultado){
                    const isUser = await this.verificaUser(resultado, password);

                    if(isUser){
                        console.log('isUser--' + resultado._id);
                        let tokenResult = await axios.post(
                                'http://127.0.0.1:3002/criarToken',
                                {
                                    id: resultado._id
                                }
                            );
                        
                        if(tokenResult){
                            console.log(tokenResult.data);
                            resp.status(200).send(tokenResult.data.tokenAssinado);
                        }
                        else{
                            console.log('Problemas na criação do token');
                            resp.status(500).send('Erro na criacao do usuario');
                        }
                    }

                }
            }
            catch(error){
                console.log('[E]:' + error);
                resp.status(500).send('Erro no login');
            }
        }


    }

    public async verificaUser(resultado: UsuarioInterface, password: String): Promise<boolean>{
        if(resultado.password === password ){
            return true;
        }
        else{
            return false;
        }

    }

    public async cadastrarLocalizacaoUser(req: Request, resp: Response){
        try{
            let localizacaoinstancia = await this.preencheLocalizacao(req.body);
            if(localizacaoinstancia){
                const sucesso = await localizacaoinstancia.save();
                if(sucesso){
                    resp.status(200).send(sucesso);
                }else{
                    resp.status(500).send('Erro a cadastrar localizacao');
                }
            }
            else{
                resp.status(500).send('Erro a cadastrar localizacao');
            }
        }catch(Error){
            console.log(Error);
            resp.status(500).send('Erro no método cadastrar localizacao');
        }
    }

    public async updateLocalizacao(req: Request, resp: Response){
        try{
            console.log(req.body);
            const localizacao = await LocalizacaoUsuario.findOneAndUpdate({usuario:req.body.usuario}, {localizacao: {type: 'Point', coordinates: req.body.coordinates}});
            if(localizacao){
                resp.status(200).send(localizacao);
            }
            else{
                resp.status(500).send('Erro na actualizacao da localizacao');
            }
        }
        catch(error){
            console.log(error);
            resp.status(500).send('Erro no método de actualizacao da localizacao');
        }
    }

    public async getLocalizacao(req:Request, resp:Response){
        try{
            const localizacao = await LocalizacaoUsuario.findOne({usuario:req.params.id});
            if(localizacao){
                resp.status(200).send(localizacao.localizacao.coordinates);
            }else{
                resp.status(500).send('Erro na procura de localizacao');
            }
        }catch(Erro){
            console.log(Erro);
            resp.status(500).send('Erro no metodo de devolucao da localizacao');
        }
    }

    private async preencheLocalizacao(payload:any): Promise<LocalUsuarioInterface|undefined>{
        if(payload.usuario){
            const usuarioResult = await Usuario.findById(payload.usuario);
            console.log(usuarioResult);
            if(usuarioResult && payload.lat && payload.log){
                let instance = await new LocalizacaoUsuario({
                    usuario: usuarioResult._id,
                    localizacao: {
                        type: 'Point',
                        coordinates: [payload.lat, payload.log]
                    }
                });
                if(instance){
                    return instance;
                }
            }
            else{
                console.log('morreu');
                return <LocalUsuarioInterface>{};
            }
        }
        else{
            console.log('morreu mai alto');
            return <LocalUsuarioInterface>{};
        }
    }

    /*
    * SEPARAR PARA OUTRO CONTROLADOR
    */
    private async enviaMail(mensagem:any, enderecoDestino:any): Promise<boolean>{
        const instanciaSendMail = await this.configurationAxios();
        if(instanciaSendMail){
            const resultadoMail = await instanciaSendMail.post('/sendMail', {
                from : "registoAutomatico@plataformaVirtual.com",
                to: enderecoDestino,
                subject: "Registo Automatico na Plataforma Virtual",
                text: mensagem
            });
            
            if (resultadoMail){
                return resultadoMail.data !== 'Sucesso' ? false : true;
            }
            else{
                return false;
            }
        }
        return false;
    }

    private async configurationAxios(): Promise<AxiosInstance> {
        //Timeout Gigantesco
        const AxiosInstance = await axios.create({
            baseURL: 'http://localhost:3001',
            timeout: 30000
        });

        return AxiosInstance; 
    }



    
}