import { CNPJ, Name, Phone, Supplier } from "../../domain/entities/Supplier";
import { Id } from "../../domain/entities/shared/Id";

import {
  SupplierRepository,
  ParamsForSupplierCreation,
} from "../../domain/repositories/SupplierRepository";

export interface SupplierData {
  id: number;
  cnpj: string;
  name: string;
  phone: string;
}

export interface SupplierDataSource {
  createTable(): Promise<boolean>;
  findAll(): Promise<SupplierData[]>;
  findById(id: number): Promise<SupplierData>;
  create(supplier: Omit<SupplierData, "id">): Promise<SupplierData>;
  update(supplier: SupplierData): Promise<SupplierData>;
  remove(id: number): Promise<SupplierData>;
}

export class SupplierRepositoryImpl implements SupplierRepository {
  constructor(private supplierDataSource: SupplierDataSource) {}

  async getAllSuppliers(): Promise<Supplier[] | null> {
    const suppliers = await this.supplierDataSource.findAll();

    const mappedSuppliers = suppliers.map((supplier) => {
      const id = new Id(supplier.id);
      const cnpj = new CNPJ(supplier.cnpj);
      const name = new Name(supplier.name);
      const phone = new Phone(supplier.phone);

      return new Supplier(id, cnpj, name, phone);
    });

    return mappedSuppliers;
  }

  async getSupplierById(id: Id): Promise<Supplier | null> {
    const supplier = await this.supplierDataSource.findById(id.id);

    const supplierId = new Id(supplier.id);
    const cnpj = new CNPJ(supplier.cnpj);
    const name = new Name(supplier.name);
    const phone = new Phone(supplier.phone);

    return new Supplier(supplierId, cnpj, name, phone);
  }

  async createSupplier(supplier: ParamsForSupplierCreation): Promise<Supplier> {
    const createdSupplier = await this.supplierDataSource.create({
      cnpj: supplier.cnpj.cnpj,
      name: supplier.name.name,
      phone: supplier.phone.phone,
    });

    const id = new Id(createdSupplier.id);
    const cnpj = new CNPJ(createdSupplier.cnpj);
    const name = new Name(createdSupplier.name);
    const phone = new Phone(createdSupplier.phone);

    return new Supplier(id, cnpj, name, phone);
  }

  async updateSupplier(supplier: Supplier): Promise<Supplier> {
    const updatedSupplier = await this.supplierDataSource.update({
      id: supplier.id,
      cnpj: supplier.cnpj,
      name: supplier.name,
      phone: supplier.phone,
    });

    const id = new Id(updatedSupplier.id);
    const cnpj = new CNPJ(updatedSupplier.cnpj);
    const name = new Name(updatedSupplier.name);
    const phone = new Phone(updatedSupplier.phone);

    return new Supplier(id, cnpj, name, phone);
  }

  async removeSupplier(id: Id): Promise<Supplier> {
    const removedSupplier = await this.supplierDataSource.remove(id.id);

    const supplierId = new Id(removedSupplier.id);
    const cnpj = new CNPJ(removedSupplier.cnpj);
    const name = new Name(removedSupplier.name);
    const phone = new Phone(removedSupplier.phone);

    return new Supplier(supplierId, cnpj, name, phone);
  }
}
