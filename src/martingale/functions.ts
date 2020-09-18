export const gerarOrdem = () => {
  let result = "";
  let tmp = Math.floor(Math.random() * 2);
  if (tmp === 1) {
    result = "win";
  } else if (tmp === 0) {
    result = "loss";
  }

  return result;
};
export const gerarOrdem2 = () => {
  let result = "";
  let tmp = Math.floor(Math.random() * 3);
  if (tmp === 1) {
    result = "win";
  } else if (tmp === 0) {
    result = "loss";
  }
  else if (tmp === 2) {
    result = "win";
  }

  return result;
};

export const calcularWin = (banca, retorno) => {
  let result = (banca / 100) * retorno;
  return result;
};
export const calcularLoss = (valorWin, payout) => {
  let result = valorWin / (payout / 100);
  return result;
};
export const calcularMartigale = (valorWin, payout) => {
  let result = valorWin / (payout / 100);
  return result;
};
