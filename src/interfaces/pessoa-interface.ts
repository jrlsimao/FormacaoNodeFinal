import {Document, Schema} from 'mongoose';

export interface PessoaInterface extends Document{
  Nome: string;
  NascData?: Date;
  Telefone?: string;
  NIF?: String;
  Usuario: Schema.Types.ObjectId;
}
