import mongoose from 'mongoose';

export class BancoDeDados {
    private port = 27017;
    private mongo : mongoose.Mongoose|null = mongoose;

    constructor(){
      this.ligacao();
    }

  private ligacao() {
    mongoose.connect(`mongodb://localhost:${this.port}/Simober`, (error) => {
      if (error) {
        console.error('Ups! Deu erro na ligação MOLEQUE! ', error);
      }
      else {
        console.log('Estamos ligados...É nois!');
      }
    });
  }

    public getMongo() : mongoose.Mongoose|null {
      return this.mongo;
    }
}

