import { CustomerError } from "./errors/CustomerError";

import { Id } from "./shared/Id";

class CPF {
  private _cpf: string;

  constructor(cpf: string) {
    this._cpf = cpf;

    this.validate();
  }

  get cpf(): string {
    return this._cpf;
  }

  validate() {
    const cpf = this._cpf.replace(/[^\d]+/g, "");

    if (cpf.length !== 11)
      throw new CustomerError(
        "cpf_is_invalid",
        "The CPF must contain 11 numeric characters."
      );

    if (/^(\d)\1{10}$/.test(cpf))
      throw new CustomerError(
        "cpf_is_invalid",
        "The CPF cannot contain all the same digits."
      );

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(cpf.charAt(9))) {
      throw new CustomerError(
        "cpf_is_invalid",
        "The first verification digit of the CPF is invalid"
      );
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(cpf.charAt(10))) {
      throw new CustomerError(
        "cpf_is_invalid",
        "The second verification digit of the CPF is invalid"
      );
    }

    this.formatCPF(cpf);
  }

  formatCPF(cpf: string) {
    const digits = cpf.replace(/\D/g, "");

    if (cpf.length === 11) {
      this._cpf = digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
  }
}

class Name {
  private _name: string;

  constructor(name: string) {
    this._name = name.trim();

    this.validate();
  }

  get name(): string {
    return this._name;
  }

  validate() {
    if (this._name.length <= 3) {
      throw new CustomerError(
        "name_is_invalid",
        "The customer name cannot be less than 2 characters"
      );
    }
  }
}

class Email {
  private _email: string;

  constructor(email: string) {
    this._email = email;

    this.validate();
  }

  get email(): string {
    return this._email;
  }

  validate() {
    const email = this._email.trim();

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isValidEmail = regex.test(email);

    if (!isValidEmail)
      throw new CustomerError("email_is_invalid", "The email is invalid");
  }
}

class Phone {
  private _phone: string;

  constructor(phone: string) {
    this._phone = phone;

    this.validate();
  }

  get phone(): string {
    return this._phone;
  }

  validate() {
    const tel = this._phone.replace(/\D/g, "");

    // Check if it has 10 (landline) or 11 digits (mobile with 9)
    if (!(tel.length === 10 || tel.length === 11))
      throw new CustomerError(
        "phone_is_invalid",
        "The phone number must contain 10 or 11 digits"
      );

    // If it is a cell phone, the ninth digit must be 9
    if (tel.length === 11 && tel[2] !== "9")
      throw new CustomerError("phone_is_invalid", "The third digit must be 9");

    // Checks if DDD is valid (01 to 99, without 00)
    const ddd = tel.substring(0, 2);
    if (!/^[1-9]{2}$/.test(ddd))
      throw new CustomerError("phone_is_invalid", "The DDD is invalid");

    // Eliminates repeated numbers like "11111111111"
    if (/^(\d)\1+$/.test(tel))
      throw new CustomerError(
        "phone_is_invalid",
        "The phone cannot contain the same digits"
      );

    this.formatPhone(this._phone);
  }

  formatPhone(phone: string) {
    const digits = phone.replace(/\D/g, "");

    if (digits.length === 11) {
      this._phone = digits.replace(
        /(\d{2})(\d{1})(\d{4})(\d{4})/,
        "($1) $2 $3-$4"
      );
    }

    if (digits.length === 10) {
      this._phone = digits.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
  }
}

export class Customer {
  private _id: Id;
  private _cpf: CPF;
  private _name: Name;
  private _email: Email;
  private _phone: Phone;

  constructor(id: Id, cpf: CPF, name: Name, email: Email, phone: Phone) {
    this._id = id;
    (this._cpf = cpf), (this._name = name), (this._email = email);
    this._phone = phone;
  }

  get id(): number {
    return this._id.id;
  }

  get cpf(): string {
    return this._cpf.cpf;
  }

  get name(): string {
    return this._name.name;
  }

  get email(): string {
    return this._email.email;
  }

  get phone(): string {
    return this._phone.phone;
  }

  toObject(): object {
    return {
      id: this._id,
      cpf: this._cpf,
      name: this._name,
      email: this._email,
      phone: this._phone,
    };
  }
}
