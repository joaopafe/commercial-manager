import { SupplierError } from "./errors/SupplierError";

class Id {
  private _id: number;

  constructor(id: number) {
    this._id = id;

    this.validate();
  }

  get id(): number {
    return this._id;
  }

  validate() {
    if (this._id <= 0) {
      throw new SupplierError(
        "id_is_invalid",
        "The supplier id cannot be less than or equal to zero"
      );
    }

    if (!Number.isInteger(this._id)) {
      throw new SupplierError(
        "id_is_invalid",
        "The supplier id must be an integer"
      );
    }
  }
}

class CNPJ {
  private _cnpj: string;

  constructor(cnpj: string) {
    this._cnpj = cnpj;

    this.validate();
  }

  get cnpj(): string {
    return this._cnpj;
  }

  validate() {
    const cnpj = this._cnpj.replace(/[^\d]+/g, "");

    if (cnpj.length !== 14)
      throw new SupplierError(
        "cnpj_is_invalid",
        "The CNPJ must contain 14 numeric characters."
      );

    if (/^(\d)\1{13}$/.test(cnpj))
      throw new SupplierError(
        "cnpj_is_invalid",
        "The CNPJ cannot contain all the same digits."
      );

    let length = 12;
    let numbers = cnpj.substring(0, length);
    let digits = cnpj.substring(length);
    let sum = 0;
    let position = length - 7;

    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * position--;
      if (position < 2) position = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0)))
      throw new SupplierError(
        "cnpj_is_invalid",
        "The first verification digit of the CNPJ is invalid"
      );

    length = 13;
    numbers = cnpj.substring(0, length);
    sum = 0;
    position = length - 7;

    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * position--;
      if (position < 2) position = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1)))
      throw new SupplierError(
        "cnpj_is_invalid",
        "The second verification digit of the CNPJ is invalid"
      );

    this.formatCNPJ(cnpj);
  }

  formatCNPJ = (cnpj: string) => {
    cnpj = cnpj.replace(/[^\d]+/g, "");

    if (cnpj.length !== 14)
      throw new SupplierError(
        "cnpj_is_invalid",
        "CNPJ deve conter 14 dígitos."
      );

    this._cnpj = `${cnpj.substring(0, 2)}.${cnpj.substring(
      2,
      5
    )}.${cnpj.substring(5, 8)}/${cnpj.substring(8, 12)}-${cnpj.substring(
      12,
      14
    )}`;
  };
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
    if (this._name.length <= 2) {
      throw new SupplierError(
        "name_is_invalid",
        "The supplier name cannot be less than 2 characters"
      );
    }
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
      throw new SupplierError(
        "phone_is_invalid",
        "The phone number must contain 10 or 11 digits"
      );

    // If it is a cell phone, the ninth digit must be 9
    if (tel.length === 11 && tel[2] !== "9")
      throw new SupplierError("phone_is_invalid", "The third digit must be 9");

    // Checks if DDD is valid (01 to 99, without 00)
    const ddd = tel.substring(0, 2);
    if (!/^[1-9]{2}$/.test(ddd))
      throw new SupplierError("phone_is_invalid", "The DDD is invalid");

    // Eliminates repeated numbers like "11111111111"
    if (/^(\d)\1+$/.test(tel))
      throw new SupplierError(
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

export class Supplier {
  private _id: Id;
  private _cnpj: CNPJ;
  private _name: Name;
  private _phone: Phone;

  constructor(id: Id, cnpj: CNPJ, name: Name, phone: Phone) {
    (this._id = id),
      (this._cnpj = cnpj),
      (this._name = name),
      (this._phone = phone);
  }

  get id(): number {
    return this._id.id;
  }

  get cnpj() {
    return this._cnpj.cnpj;
  }

  get name() {
    return this._name.name;
  }

  get phone() {
    return this._phone.phone;
  }

  toObject(): object {
    return {
      id: this._id,
      cnpj: this._cnpj,
      name: this._name,
      phone: this._phone,
    };
  }
}
