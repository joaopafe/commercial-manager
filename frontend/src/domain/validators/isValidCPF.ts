export const isValidCPF = (cpf: string) => {
  cpf = cpf.replace(/[^\d]/g, "");

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let firstDigit = 11 - (sum % 11);
  firstDigit = firstDigit >= 10 ? 0 : firstDigit;
  if (parseInt(cpf.charAt(9)) !== firstDigit) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  let secondDigit = 11 - (sum % 11);
  secondDigit = secondDigit >= 10 ? 0 : secondDigit;

  return parseInt(cpf.charAt(10)) === secondDigit;
};
