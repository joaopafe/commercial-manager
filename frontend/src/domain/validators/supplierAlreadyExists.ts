import { Supplier } from "../entities/Supplier";

export const supplierAlreadyExists = (
  supplierCode: number,
  suppliers: Supplier[]
) => {
  const supplierAlreadyExists =
    suppliers.filter((supplier) => {
      return supplier.code === supplierCode;
    }).length === 1;

  return supplierAlreadyExists;
};
