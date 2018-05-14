import {Request, Response, NextFunction} from 'express';
import {UsuarioInterface} from '../interfaces/usuario-interface';
import {PessoaInterface} from '../interfaces/pessoa-interface';
import {Usuario} from '../config/bancoDados/Schemas/usuario-schema';
import {Pessoa} from '../config/bancoDados/Schemas/pessoa-schema';
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
        }else{
            resp.status(500).send('Request Inválido');
        }
    }

    public async eliminarPerson( req:Request, resp:Response, next:NextFunction){
        if(req.params.id){
            try{
                const resultado = await Pessoa.findById(req.params.id);
                if(resultado){
                    const elimUsuario = Usuario.findByIdAndRemove(resultado.Usuario);
                    if(elimUsuario){
                        const elimPessoa = await Pessoa.findByIdAndRemove(req.params.id);
                        if(elimPessoa){
                            resp.status(200).send('Pessoa Eliminada');
                        }
                        else{
                            resp.status(500).send('Usuario Eliminado mas Pessoa não foi encontrada');
                        }
                    }
                    else{
                        resp.status(500).send('Usuario Não foi Encontrado');
                    }
                }
                else{
                    resp.status(500).send('Pessoa não foi encontrada');
                }
            }
            catch{
                resp.status(500).send('Erro no método de eliminar Pessoa');
            }
        }else{
            resp.status(500).send('Não foi encontrado ID na Call');
        }
    }

    public async updatePerson(req: Request, resp: Response){
        if(Object.keys(req.body).length !== 0 && req.body.constructor === Object){
            try{
                const resultado = await Pessoa.findByIdAndUpdate(req.body.id, <PessoaInterface>req.body);
                if(resultado){
                    resp.status(200).send(resultado);
                }else{
                    resp.status(500).send('Não foi encontrado');
                }
            }catch{
                resp.status(500).send('Erro no método de Update da Pessoa');
            }
        }else{
            resp.status(500).send('Request Inválido');
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
    //Separar o Login noutra classe
    public async verificaLogin(req:Request, resp:Response, next:NextFunction){
        if(req.headers.tokenassinado){
            try{
                let resultado = await axios.post(
                    'http://127.0.0.1:3002/buscarToken',
                    {
                        tokenassinado: req.headers.tokenassinado
                    }
                );
                if(resultado && resultado.data.result === 'Valido'){
                    next();
                }
                else{
                    resp.status(500).send('Token Inválido - Sessão Expirou');
                }
            }
            catch(Error){
                resp.status(500).send('Erro na função de Verificação de Login');
            }
        }
        else{
            resp.status(500).send('Token não recebido');
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