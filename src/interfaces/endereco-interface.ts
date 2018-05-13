import {Document} from 'mongoose';

export interface EnderecoInterface extends Document{
    rua?: String;
    numero?: Number;
    codPostal3?: Number;
    codPostal2?: Number;
    cidade?: String;
    pais?: String;
}