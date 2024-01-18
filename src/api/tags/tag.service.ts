import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Tag } from 'src/entities/tag.entity';
import { CreateTagDto } from './dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(createCategory) {
    return await this.tagRepository.save(createCategory);
  }

  async getProductCategories() {
    return await this.tagRepository.find();
  }

  async getById(id: string) {
    return await this.tagRepository.findOneBy({ id });
  }

  async update(id: string, createTagDto: CreateTagDto) {
    return await this.tagRepository.save(createTagDto);
  }

  async delete(id: string) {
    await this.tagRepository.delete(id);
  }

  async searchProductByTag(name: string, description: string) {
    return await this.tagRepository.find({
      where: {
        name: Like(`%${name}%`),
        description: Like(`%${description}%`),
      },
    });
  }
}
