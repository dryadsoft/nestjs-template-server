import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}
  getAll(): Promise<User[]> {
    return this.users.find();
  }
  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const user = await this.users.findOne({ where: { email } });
      if (user) {
        return {
          ok: false,
          error: '사용자 이메일이 이미 존재합니다. 계정을 생성할 수 없습니다.',
        };
      }
      const newUser = this.users.create({
        email,
        password,
        role,
      });
      await this.users.save(newUser);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: '신규계정을 생성할 수 없습니다.',
      };
    }
  }
}
