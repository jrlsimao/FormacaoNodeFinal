import {Request, Response, NextFunction} from 'express';
import {LocalInterface} from '../interfaces/local-interface';
import {Localizacao} from '../config/bancoDados/Schemas/local-schema';
import {Usuario} from '../config/bancoDados/Schemas/usuario-schema';

export class LocalizacaoClass{

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
            const localizacao = await Localizacao.findOneAndUpdate({usuario:req.body.usuario}, {localizacao: {type: 'Point', coordinates: req.body.coordinates}});
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
            console.log(req.params);
            const localizacao = await Localizacao.findOne({usuario:req.params.id});
            console.log(localizacao);
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

    public async removeLocalizacao(req:Request, resp:Response){
        if(req.params.id){
            try{
                const eliminaLocalizacao = await Localizacao.findByIdAndRemove(req.params.id);
                if(eliminaLocalizacao){
                    resp.status(200).send('Localizacao Eliminada');
                }
                else{
                    resp.status(500).send('Localizacao não encontrada');
                }
            }catch{
                resp.status(500).send('Erro no nétodo de eliminação da Localização');
            }
        }else{
            resp.status(500).send('Id não encontrado no Request');
        }
    }

    private async preencheLocalizacao(payload:any): Promise<LocalInterface|undefined>{
        if(payload.usuario){
            const usuarioResult = await Usuario.findById(payload.usuario);
            if(usuarioResult && payload.lat && payload.log){
                let instance = await new Localizacao({
                    usuario: usuarioResult._id,
                    localizacao: {
                        type: 'Point',
                        coordinates: [payload.lat, payload.log]
                    },
                    motorista: payload.motorista
                });
                if(instance){
                    return instance;
                }
            }
            else{
                console.log('morreu');
                return <LocalInterface>{};
            }
        }
        else{
            console.log('morreu mai alto');
            return <LocalInterface>{};
        }
    }

}