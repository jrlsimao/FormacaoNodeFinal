import {Document, Schema} from 'mongoose';

export interface ViagemInterface extends Document{
    origem : [Number];
    destino: [Number];
    dataViagem: Date;
    status: boolean;
    utilizador : Schema.Types.ObjectId;
    motorista: Schema.Types.ObjectId;
}