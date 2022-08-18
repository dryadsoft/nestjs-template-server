import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { EditProfileinput, EditProfileOutput } from './dtos/edit-profile.dto';
import { Verification } from './entities/verification.entity';
import { VerifyEmailOutput } from './dtos/verify-email.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verification: Repository<Verification>,
    private readonly jwtService: JwtService,
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
      const newUser = await this.users.save(
        this.users.create({
          email,
          password,
          role,
        }),
      );
      await this.verification.save(this.verification.create({ user: newUser }));
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

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne({
        where: { email },
        select: ['id', 'password'],
      });
      if (!user) {
        return {
          ok: false,
          error: '계정이 존재하지 않습니다.',
        };
      }
      const isSame = await user.checkPassword(password);
      if (!isSame) {
        return {
          ok: false,
          error: '비밀번호가 일치하지 않습니다.',
        };
      }
      const token = this.jwtService.sign({ id: user.id });
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findById(id: number): Promise<UserProfileOutput> {
    try {
      const user = await this.users.findOne({ where: { id } });
      if (!user) {
        throw Error();
      }
      return {
        ok: true,
        user,
      };
    } catch (err) {
      return {
        ok: false,
        error: 'User Not Found',
      };
    }
  }

  async editProfile(
    userId: number,
    { email, password }: EditProfileinput,
  ): Promise<EditProfileOutput> {
    try {
      const user = await this.users.findOne({ where: { id: userId } });
      console.log(user);
      if (email) {
        user.email = email;
        user.verified = false;
        await this.verification.save(this.verification.create({ user }));
      }
      if (password) {
        user.password = password;
      }
      await this.users.save(user);
      return {
        ok: true,
      };
    } catch (err) {
      console.log(err);
      return {
        ok: false,
        error: 'user update faile',
      };
    }
  }

  async verifyEmail(code: string): Promise<VerifyEmailOutput> {
    try {
      const verification = await this.verification.findOne({
        where: { code },
        relations: ['user'],
      });
      if (verification) {
        verification.user.verified = true;
        this.users.save(verification.user);
        // console.log(verification, verification.user);
      }
      return {
        ok: true,
      };
    } catch (err) {
      return {
        ok: false,
        error: 'fail verify email',
      };
    }
  }
}
