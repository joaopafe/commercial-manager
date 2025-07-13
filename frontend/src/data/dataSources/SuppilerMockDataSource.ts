import { Supplier } from "../../domain/entities/Supplier";

import { AddSupplierParams } from "../../domain/useCases/CreateSupplier";

import { SupplierDataSource } from "../repositories/SupplierRepositoryImpl";

import { delay } from "../../shared/utils/delay";

const suppliersMock: Supplier[] = [
  {
    code: 1,
    cnpj: "51.955.546/0001-37",
    name: "Visconde",
    phone: "(85) 98568-8035",
  },
  {
    code: 2,
    cnpj: "76.184.908/0001-64",
    name: "GM",
    phone: "(98) 97030-5884",
  },
  {
    code: 3,
    cnpj: "84.083.564/0001-25",
    name: "Bosch",
    phone: "(84) 96465-1846",
  },
  {
    code: 4,
    cnpj: "09.339.556/0001-81",
    name: "Mobil",
    phone: "(69) 97806-2726",
  },
  {
    code: 5,
    cnpj: "51.377.809/0001-78",
    name: "Valeo",
    phone: "(64) 96527-2326",
  },
  {
    code: 6,
    cnpj: "99.203.973/0001-95",
    name: "Delphi",
    phone: "(46) 96621-0540",
  },
  {
    code: 7,
    cnpj: "28.258.156/0001-96",
    name: "Magneti Marelli",
    phone: "(63) 97604-6784",
  },
  {
    code: 8,
    cnpj: "20.614.041/0001-85",
    name: "Notus",
    phone: "(45) 96300-6731",
  },
];

export class SupplierMockDataSource implements SupplierDataSource {
  async list(): Promise<Supplier[] | null> {
    await delay(500);

    return suppliersMock;
    // return null;
  }

  async add(supplier: AddSupplierParams): Promise<Supplier | Error> {
    await delay(500);

    try {
      suppliersMock.push({
        code: suppliersMock[suppliersMock.length - 1].code + 1,
        cnpj: supplier.cnpj,
        name: supplier.name,
        phone: supplier.phone,
      });

      return suppliersMock[length - 1];
    } catch {
      return Error("Unable to register a new supplier");
    }
  }

  async edit(supplier: Supplier): Promise<Supplier | Error> {
    try {
      const editedSupplierIndex = suppliersMock.findIndex(
        (registeredSupplier) => registeredSupplier.code === supplier.code
      );

      suppliersMock[editedSupplierIndex] = {
        code: supplier.code,
        cnpj: supplier.cnpj,
        name: supplier.name,
        phone: supplier.phone,
      };

      return suppliersMock[editedSupplierIndex];
    } catch {
      return Error("It was not possible to edit the supplier");
    }
  }

  async remove(supplierCode: number): Promise<Supplier | Error> {
    try {
      const removedSupplierIndex = suppliersMock.findIndex(
        (registeredSupplier) => {
          return registeredSupplier.code === supplierCode;
        }
      );

      const removedSupplier = suppliersMock[removedSupplierIndex];

      suppliersMock.splice(removedSupplierIndex, 1);

      return removedSupplier;
    } catch {
      return Error("It was not possible to remove the supplier");
    }
  }
}
