import {Document} from 'mongoose';

export interface VeiculoInterface extends Document{
    marca?: String;
    modelo?: String;
    ano?: Number;
    cor?: String;
    matricula?: String;
    status?: boolean;
}