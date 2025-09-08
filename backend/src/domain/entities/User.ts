import { UserError } from "./errors/UserError";

import { Id } from "./shared/Id";

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
      throw new UserError(
        "username_is_invalid",
        "The username cannot be less than 3 characters"
      );
    }
  }
}

class Password {
  private _password: string;

  constructor(password: string) {
    this._password = password;

    this.validate();
  }

  get password(): string {
    return this._password;
  }

  validate() {
    if (this._password !== this._password.trim())
      throw new UserError(
        "password_is_invalid",
        "Password cannot contain empty spaces"
      );

    if (this._password.length < 8)
      throw new UserError(
        "password_is_invalid",
        "The password must contain 8 or more characters"
      );

    if (!/[a-zA-Z]/.test(this._password))
      throw new UserError(
        "password_is_invalid",
        "The password must have least one letter"
      );

    if (!/\d/.test(this._password))
      throw new UserError(
        "password_is_invalid",
        "The password must have least one number"
      );
  }
}

export class User {
  private _id: Id;
  private _name: Name;
  private _password: Password;

  constructor(id: Id, name: Name, password: Password) {
    this._id = id;
    this._name = name;
    this._password = password;
  }

  get id(): number {
    return this._id.id;
  }

  get name(): string {
    return this._name.name;
  }

  get password(): string {
    return this._password.password;
  }

  toObject(): object {
    return {
      id: this._id,
      name: this._name,
      password: this._password,
    };
  }
}
