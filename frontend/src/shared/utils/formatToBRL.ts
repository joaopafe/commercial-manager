export const formatToBRL = (value: number) => {
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formattedValue.format(value);
};
