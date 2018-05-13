import {Document, Schema} from 'mongoose';
import {EnderecoInterface} from './endereco-interface'
import {VeiculoInterface} from './veiculo-interface';

export interface MotoristaInterface extends Document{
    nome: String;
    dataNascimento?: Date;
    cartaConducao?: String;
    user?: Schema.Types.ObjectId;
    morada?: EnderecoInterface;
    telefone?: String;
    veiculo?: VeiculoInterface;
    status?: boolean;
}