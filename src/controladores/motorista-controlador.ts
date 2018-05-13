import {Motorista} from '../config/bancoDados/Schemas/motorista-schema';
import {MotoristaInterface} from '../interfaces/motorista-interface';
import {Request, Response, NextFunction} from 'express';
import {UsuarioInterface} from '../interfaces/usuario-interface';
import {Usuario} from '../config/bancoDados/Schemas/usuario-schema';
import axios, { AxiosInstance } from 'axios';
import { request } from 'https';
import { Localizacao } from '../config/bancoDados/Schemas/local-schema';

export class MotoristaClass {
    constructor(){

    }

    public async criarMotorista(req:Request, resp:Response){
        if(Object.keys(req.body).length !== 0 && req.body.constructor === Object){
            try{
                let instanciaUsuario = new Usuario(<UsuarioInterface>req.body);
                if(instanciaUsuario){
                    const usuario = await instanciaUsuario.save();

                    if(usuario){

                        let instanciaMotorista = new Motorista(<MotoristaInterface>req.body);
                        instanciaMotorista.user = usuario._id;
                        const pessoa = await instanciaMotorista.save();

                        if(pessoa){
                            const infoPessoa = pessoa;
                            const infoUser = usuario;
                                
                            const resultado = await this.enviaMail('Bemvindo à plataforma ' + infoPessoa.nome, infoUser.email);
                            
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

    public async getMotoristaNear(req: Request, res: Response){ //:Promise<MotoristaInterface| undefined>{
            if(req.body.lat && req.body.log){    
                Localizacao.find({localizacao:{$nearSphere:{
                    $geometry:
                    {type:"Point", coordinates:[req.body.lat,req.body.log]}
                    }}, motorista: true}).limit(1).exec((err, result)=>{
                    if(result){
                        //Tem de aparecer Helder
                        console.log('Closest is %s', result);
                        res.status(200).send(result);
                    }
                    else{
                        console.log('Cant find!');
                        res.status(404).send('Não encontrei');
                    }
                    });
            }else{
                res.status(500).send('Problema Motorista near');
            }
        };
    //Para separar noutro controlador
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