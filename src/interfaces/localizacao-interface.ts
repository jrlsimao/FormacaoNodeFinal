import {Document} from 'mongoose'

export interface LocalizacaoInterface extends Document {
    type?:String;
    coordinates: [Number];
}