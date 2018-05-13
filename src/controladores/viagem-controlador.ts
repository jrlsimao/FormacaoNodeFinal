import {Request, Response, NextFunction} from 'express';
import {ViagemInterface} from '../interfaces/viagem-interface';
import {Viagem} from '../config/bancoDados/Schemas/viagem-schema';
export class ViagemClass{
    
    public async cadastrarViagem(req: Request, resp: Response){
        try{
            let viagemInstancia = new Viagem(<ViagemInterface>req.body);
            const sucesso = await viagemInstancia.save();
            if(sucesso){
                resp.status(200).send(sucesso);
            }else{
                resp.status(500).send('Erro a cadastrar Viagem');
            }

        }catch{
            resp.status(500).send('Erro no método cadastrar viagem');
        }
    }
    public async getViagemById(req: Request, resp: Response){
        try{
            const resultado = await Viagem.findById(req.params.id);
            if(resultado){
                resp.status(200).send(resultado);
            }
            else{
                resp.status(500).send('Não encontrou viagem');
            }
        }catch{
            resp.status(500).send('Erro no método cadastrar viagem');
        }
    }

}