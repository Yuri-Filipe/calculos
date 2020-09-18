let _valorOrdem = [0, 0, 0]; //valor de cada ordem
let _loss = [0, 0, 0]; // porcentagem de loss de cada ordem
let _valorLoss = [0, 0, 0]; // valor de loss de cada ordem
let _metaValor = 0;
let _valorRetorno = [0, 0, 0];

interface Resultado {
  Id: number;
  ValorOrdem: number;
  Win: number;
  Loss: number;
  ValorAposLoss: number;
}
let resultado: Resultado[];
export function Calculo(BancaInicial, Payout, Retorno) {
  //CALCULOS=========================================================

  //Valor retorno [0] é sempre o 1º retorno
  //Valor da ordem[0] é sempre o retorno[0] * 100 / payout
  _valorRetorno[0] = (BancaInicial / 100) * Retorno;
  _valorOrdem[0] = (_valorRetorno[0] * 100) / Payout;

  //Valor retorno [1] é retorno[0] + o valor perdido da 1ª ordem
  _valorRetorno[1] = _valorRetorno[0] + _valorOrdem[0];
  _valorOrdem[1] = (100 * _valorRetorno[1]) / Payout;

  _valorRetorno[2] = _valorRetorno[1] + _valorOrdem[1];
  _valorOrdem[2] = (100 * _valorRetorno[2]) / Payout;

  //Para calcular o risco da operação ou o loss, pegue 100% - a (Banca Inicial - o valor das ordens já realizadas, multiplica esse valor por 100 e divide pela banca inicial)

  _valorLoss[0] = BancaInicial - _valorOrdem[0];
  _valorLoss[1] = BancaInicial - _valorOrdem[1] - _valorOrdem[0];
  _valorLoss[2] =
    BancaInicial - _valorOrdem[2] - _valorOrdem[1] - _valorOrdem[0];

  _loss[0] = 100 - (_valorLoss[0] * 100) / BancaInicial;
  _loss[1] = 100 - (_valorLoss[1] * 100) / BancaInicial;
  _loss[2] = 100 - (_valorLoss[2] * 100) / BancaInicial;

  //Calculara o valor da meta apenas se a chave estiver false ou seja sempre no inicio
  resultado = [
    {
      Id: 1,
      ValorOrdem:Number(_valorOrdem[0]) ,
      Win: Number(_valorRetorno[0]),
      Loss: Number(_loss[0]),
      ValorAposLoss:Number( _valorLoss[0]),
    },
    {
      Id: 2,
      ValorOrdem: Number(_valorOrdem[1]),
      Win: Number(_valorRetorno[1]),
      Loss: Number(_loss[1]),
      ValorAposLoss: Number(_valorLoss[1]),
    },
    {
      Id: 3,
      ValorOrdem: Number(_valorOrdem[2]),
      Win: Number(_valorRetorno[2]),
      Loss: Number(_loss[2]),
      ValorAposLoss: Number(_valorLoss[2]),
    },
  ];
}

export { resultado };
