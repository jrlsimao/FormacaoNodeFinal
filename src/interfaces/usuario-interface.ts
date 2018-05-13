import {Document} from 'mongoose';

export interface UsuarioInterface extends Document{
  email: string;
  creationData?: Date;
  password: string;
}
