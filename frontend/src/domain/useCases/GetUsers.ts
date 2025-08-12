import { UserRepository } from "../repositories/UserRepository";

export class GetUsers {
  constructor(private userRepository: UserRepository) {}

  async exec() {
    const users = await this.userRepository.list();

    return users;
  }
}
