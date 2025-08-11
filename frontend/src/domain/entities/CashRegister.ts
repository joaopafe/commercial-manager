export interface CashRegister {
  description: string;
  value: number;
  date: Date;
  type: "Entrada" | "Saída";
}
