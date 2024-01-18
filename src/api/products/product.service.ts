import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from '../categories/category.service';
import { TagService } from '../tags/tag.service';
import { Product } from 'src/entities/product.entity';
import { CreateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService,
  ) {}

  async createProduct(productDto: CreateProductDto) {
    const category = await this.categoryService.getById(productDto.category_id);

    if (!category) {
      throw new HttpException(
        'Category record does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    const tag = await this.tagService.getById(productDto.category_id);

    if (!tag) {
      throw new HttpException(
        'Tag record does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    const product = new Product();
    product.store_id = productDto.store_id;
    product.category_id = productDto.category_id;
    product.tag_id = productDto.tag_id;
    product.name = productDto.name;
    product.description = productDto.description;
    product.price = productDto.price;
    product.stock_quantity = productDto.stock_quantity;
    return await this.productRepository.save(product);
  }

  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async getProductById(id: string): Promise<Product | undefined> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new HttpException(
        `Product with this id: ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return product;
  }

  async updateProduct(id: string, productDto: CreateProductDto) {
    const product = await this.productRepository.findOneBy({ id });

    product.store_id = productDto.store_id;
    product.category_id = productDto.category_id;
    product.tag_id = productDto.tag_id;
    product.name = productDto.name;
    product.description = productDto.description;
    product.price = productDto.price;
    product.stock_quantity = productDto.stock_quantity;
    return await this.productRepository.save(product);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }

  async searchProducts(query: {
    store_id?: number;
    category_id?: number;
    tag_id?: number;
    name?: string;
    categoryName?: string;
    tagName?: string; // Add tagName property
  }): Promise<Product[]> {
    const { store_id, category_id, tag_id, name, categoryName, tagName } =
      query;
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (store_id) {
      queryBuilder.andWhere('product.store_id = :store_id', { store_id });
    }

    if (category_id) {
      queryBuilder.andWhere('product.category_id = :category_id', {
        category_id,
      });
    }

    if (tag_id) {
      queryBuilder.andWhere('product.tag_id = :tag_id', { tag_id });
    }

    if (name) {
      queryBuilder.andWhere('product.name LIKE :name', { name: `%${name}%` });
    }

    // Search by category name
    if (categoryName) {
      queryBuilder.innerJoin('product.category', 'category');
      queryBuilder.andWhere('category.name LIKE :categoryName', {
        categoryName: `%${categoryName}%`,
      });
    }

    // Search by tag name
    if (tagName) {
      queryBuilder.innerJoin('product.tag', 'tag');
      queryBuilder.andWhere('tag.name LIKE :tagName', {
        tagName: `%${tagName}%`,
      });
    }

    return await queryBuilder.getMany();
  }
}
