import {Document, Schema} from 'mongoose';
import {LocalizacaoInterface} from './localizacao-interface';

export interface LocalMotoristaInterface extends Document{
    motorista: Schema.Types.ObjectId;
    localizacao: LocalizacaoInterface;
    data?: Date;
}