import { User } from "../../domain/entities/User";
import { AddUserParams } from "../../domain/useCases/CreateUser";

export interface UserDataSource {
  login(user: User): Promise<string | Error>;
  list(): Promise<User[] | null>;
  create(user: AddUserParams): Promise<User | Error>;
  update(user: User): Promise<User | Error>;
  delete(userCode: number): Promise<User | Error>;
}
