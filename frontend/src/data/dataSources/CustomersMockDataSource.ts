import { Customer } from "../../domain/entities/Customer";

import { CustomerDataSource } from "../repositories/CustomerRepositoryImpl";

import { delay } from "../../shared/utils/delay";

const customersMock: Customer[] = [
  {
    code: 1,
    cpf: "941.089.010-10",
    name: "José da Silva",
    email: "jose.silva@mail.com",
    phone: "(16) 9 9455-3232",
  },
  {
    code: 2,
    cpf: "838.017.020-22",
    name: "Antônio Ferreira",
    email: "antonio.ferreira@mail.com",
    phone: "(16) 9 9185-4412",
  },
  {
    code: 3,
    cpf: "712.296.980-00",
    name: "Luana de Jesus",
    email: "luana.jesus@mail.com",
    phone: "(14) 9 8815-4532",
  },
  {
    code: 4,
    cpf: "486.239.220-26",
    name: "Aldemir Carvalho de Souza",
    email: "adcarvalho2020@mail.com",
    phone: "(19) 9 8821-8721",
  },
];

export class CustomerMockDataSource implements CustomerDataSource {
  async list(): Promise<Customer[] | null> {
    await delay(500);

    return customersMock;
    // return null
  }
}
