import { Servidor } from './config/servidor/servidor';
import {BancoDeDados} from './config/bancoDados/DB';
import {RotasUser} from './config/servidor/rotas';
import {RotasLocal} from './config/servidor/rotas-local'
import {RotasMotorista} from './config/servidor/rotas-motorista';
const appServidor = new Servidor().getAppConfig();
const appDB = new BancoDeDados().getMongo();
//https://www.sitepoint.com/using-json-web-tokens-node-js/
//https://codeburst.io/building-a-budget-manager-with-vue-js-and-node-js-part-i-f3d7311822a8
//https://www.npmjs.com/package/jsonwebtoken
//https://nodejs.org/api/crypto.html
//https://www.codementor.io/olatundegaruba/5-steps-to-authenticating-node-js-with-jwt-7ahb5dmyr
//https://github.com/auth0/node-jsonwebtoken


appServidor.get('/hello', (req, res) => {
  res.status(200).send('Hello world I\'m alive bitch');
});



appServidor.listen(3000, () => {
  let rotas = new RotasUser(appServidor);
  let rotasLocalizacao = new RotasLocal(appServidor);
  let rotasMotorista = new RotasMotorista(appServidor);
});
