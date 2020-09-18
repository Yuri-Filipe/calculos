import { gerarOrdem2} from "../martingale/functions";

let bancaInicial = 100;
let valorSoros = 0;
let payout = 87;
let retorno = 27;
let banca = 0;
let qtdMartingales = 1;
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

const novoDia = () => {
  banca = bancaInicial;
  if (banca <= 0) {
    banca = 100;
  }

  for (let index = 1; index <= 4; index++) {
    ordemAtual++;
    let ordem = gerarOrdem2();

    if (ordem === "win") {
      qtdWins++;
      ordem = gerarOrdem2();
      if (ordem === "win") {
        qtdWins++;
        banca += 23;
      } else if (ordem === "loss") {
        banca -= 10;
        qtdLoss++;
      }
    } else if (ordem === "loss") {
      banca -= 10;
      qtdLoss++;
    }
  }
  if (banca < 100) {
    qtdHits++;
  } else {
    qtdPositivo++;
  }
  bancaInicial = banca;
};

function start() {
  for (let index = 1; index <= 10000; index++) {
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
