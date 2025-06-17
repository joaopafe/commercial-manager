import { Supplier } from "../../domain/entities/Supplier";

import { SupplierDataSource } from "../repositories/SupplierRepositoryImpl";

import { delay } from "../../shared/utils/delay";

const suppliersMock: Supplier[] = [
  "Visconde",
  "GM",
  "Bosh",
  "Mobil",
  "Valeo",
  "Delphi",
  "Magneti Marelli",
  "Notus",
];

export class SupplierMockDataSource implements SupplierDataSource {
  async list(): Promise<Supplier[] | null> {
    await delay(2_000);

    return suppliersMock;
    // return null
  }
}
