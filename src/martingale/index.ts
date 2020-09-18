import { gerarOrdem , gerarOrdem2} from "./functions";
import { resultado, Calculo } from "./CalculoOrdens";
import { resultado2, Calculo2 } from "./CalculoOrdens_2";
let bancaInicial = 100;
let payout = 87;
let retorno = 11;
let banca = 0;
let qtdMartingales = 2;
let qtdHits = 0;
let qtdPositivo = 0;
let qtdWins = 0;
let qtdLoss = 0;
let ordemAtual = 1;
let SIMULACOES = 0;

//CALCULOS DO DIA
// SO POSSO GANHAR 3 ORDENS AO DIA
//FOI WIN GANHEI - DE 3X CONTINUAR OPERAÇÕES
// FOI WIN GANHEI 3X DIA POSITIVO, PX DIA
// FOI LOSS ESTÁ - DE 3 MARIGALES, CONTINUAR OPERAÇÕES
//FOI LOSS ESTÁ NO 4 MARTIGALE DIA NEGATIVO, PARAR DE OPERAR
const martigale = () => {
  let result = "";

  for (let index = 1; index <= qtdMartingales; index++) {
    let ordem = gerarOrdem2();
    //ESSE BLOCO VERIFICA SE FOI WIN, SAIR DO LOOP DO MARTIGALE
    //SE FOI LOSS REALIZAR OUTRO MARTIGALE
    if (ordem === "win") {
      console.log(`Win no ${index}º martingale`);
      banca += resultado[index].Win;
      qtdWins++;
      result = "win";
      break;
    } else if (ordem === "loss") {
      console.log(`Loss no ${index}º martingale`);
      banca = resultado[index].ValorAposLoss;
      qtdLoss++;
      if (index === qtdMartingales) {
        console.log("HIT");
        result = "hit";
        qtdHits++;
        break;
      }
    }
  }
  return result;
};
const novoDia = () => {
  banca = 100;
  if(banca <=0){banca = 100}

  for (let index = 1; index <= 3; index++) {
    Calculo(banca, payout, retorno);

    
    ordemAtual++;
    let ordem = gerarOrdem2();

    if (ordem === "win") {
      console.log("Win direto");
      banca += resultado[0].Win;
      qtdWins++;
    } else if (ordem === "loss") {
      console.log("Loss");
      banca = resultado[0].ValorAposLoss;
      let result = martigale();
      if (result === "hit") {
        break;
      }
    }
  }

  //ESSE BLOCO VERIFICA SE FOI WIN OU LOSS NO DIA
  if (ordemAtual > 3) {
    qtdPositivo++;
    console.log("POSITIVO");
  }
  bancaInicial += banca - 100;
  ordemAtual = 1;
  console.log("BANCA FINAL " + banca);

  // SE ESTIVER NO PRIMEIRO MARTIGALE USAR O VALOR DA ORDEM NORMAL
};

function start() {
  for (let index = 1; index <= 1000; index++) {
    SIMULACOES++;
    novoDia();

    let result = [
      {
        simulacoes: SIMULACOES,
        banca_Atual: bancaInicial.toFixed(2),
        qtd_Hits: qtdHits,
        qtd_Positivo: qtdPositivo,
        qtd_Wins: qtdWins,
        qtd_Loss: qtdLoss,
      },
    ];
    console.table(result);
  }
}
start();