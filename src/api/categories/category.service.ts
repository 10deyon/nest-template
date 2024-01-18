import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository, Like } from 'typeorm';
import { CreateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categporyRepository: Repository<Category>,
  ) {}

  async create(createCategory) {
    return await this.categporyRepository.save(createCategory);
  }

  async index() {
    return await this.categporyRepository.find();
  }

  async getById(id: string) {
    return await this.categporyRepository.findOneBy({ id });
  }

  async update(id: string, productCategory: CreateCategoryDto) {
    const category = await this.categporyRepository.findOneBy({ id });

    if (!category) {
      throw new HttpException(
        'Category record does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.categporyRepository.save(productCategory);
  }

  async delete(id: string) {
    await this.categporyRepository.delete(id);
  }

  async searchProductByCategory(name: string, description: string) {
    return await this.categporyRepository.find({
      where: {
        name: Like(`%${name}%`),
        description: Like(`%${description}%`),
      },
    });
  }
}
