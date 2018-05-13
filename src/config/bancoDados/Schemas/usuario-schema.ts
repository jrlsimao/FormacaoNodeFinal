import { Schema, Model, model} from "mongoose";
import {UsuarioInterface} from "../../../interfaces/usuario-interface";

export const usuarioSchema : Schema = new Schema({
  email:{
      type: String,
      trim: true,
      required: [true, 'Este campo é de preenchimento obrigatório'],
      validate: {
        validator: function(v: string){
           return  /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: 'Email introduzido não é válido',
      },
    },
    creationData : {
      type: {
        Date,
        default: Date.now
      }
    },
    password:{
        type:String,
        required: true
    }
});

export const Usuario : Model<UsuarioInterface> = model<UsuarioInterface>("Usuarios", usuarioSchema);