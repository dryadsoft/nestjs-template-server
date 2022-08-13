import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTestDto4 } from './dtos/create-test.dto';
import { Test } from './entities/test.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test) private readonly test: Repository<Test>,
  ) {}
  getAll(): Promise<Test[]> {
    return this.test.find();
  }
  createTest4(createTestDto4: CreateTestDto4): Promise<Test> {
    const newTest = this.test.create(createTestDto4);
    return this.test.save(newTest);
  }
}
