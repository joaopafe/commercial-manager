import { User } from "../entities/User";

import { AddUserParams } from "../useCases/CreateUser";

export interface UserRepository {
  asynclogin(user: User): Promise<string | Error>;
  list(): Promise<User[] | null>;
  create(user: AddUserParams): Promise<User | Error>;
  update(user: User): Promise<User | Error>;
  delete(userCode: number): Promise<User | Error>;
}
