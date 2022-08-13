import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from './entities/test.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test) private readonly test: Repository<Test>,
  ) {}
  getAll(): Promise<Test[]> {
    return this.test.find();
  }
}
