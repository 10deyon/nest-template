import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateOrderDto } from './dto';
import { Order } from 'src/entities';
import { OrderDetails } from 'src/entities/order-details.entity';
import { ProductService } from '../products/product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetails)
    private readonly orderDetailRepository: Repository<OrderDetails>,
    private readonly productService: ProductService,
    private readonly entityManager: EntityManager,
  ) {}

  //   async create(orderData: CreateOrderDto, customerId) {
  //     return this.entityManager.transaction(
  //       async (transactionalEntityManager) => {
  //         const createOrder = this.orderRepository.create({
  //           customer_id: customerId,
  //         });
  //         const order = await transactionalEntityManager.save(createOrder);

  //         let total_amount = 0;
  //         for (const orderDatum of orderData.order) {
  //           const product = await this.productService.getProductById(
  //             orderDatum.product_id,
  //           );

  //           const item_total_price = orderDatum.quantity * product.price;
  //           const details = this.orderDetailRepository.create({
  //             order_id: order.id,
  //             store_id: orderDatum.store_id,
  //             product_id: orderDatum.product_id,
  //             quantity: orderDatum.quantity,
  //             price: product.price,
  //           });
  //           await transactionalEntityManager.save(details);

  //           total_amount += item_total_price;
  //         }

  //         order.total = total_amount;
  //         await this.orderRepository.save(order);

  //         const orderDetais = await this.orderWithItems(order.id);

  //         return orderDetais;
  //       },
  //     );
  //   }

  async create(orderData: CreateOrderDto, customerId: string) {
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const order = await this.createOrder(
          customerId,
          transactionalEntityManager,
        );
        const totalAmount = await this.processOrderItems(
          order,
          orderData,
          transactionalEntityManager,
        );

        order.total_amount = totalAmount;
        await this.orderRepository.save(order);

        const orderDetails = await this.orderWithItems(order.id);

        return orderDetails;
      },
    );
  }

  async createOrder(customerId: string, entityManager: EntityManager) {
    const createOrder = this.orderRepository.create({
      customer_id: customerId,
    });
    return await entityManager.save(createOrder);
  }

  private async processOrderItems(
    order: Order,
    orderData: CreateOrderDto,
    entityManager: EntityManager,
  ) {
    let totalAmount = 0;
    for (const orderDatum of orderData.order) {
      const product = await this.productService.getProductById(
        orderDatum.product_id,
      );

      const itemTotalPrice = orderDatum.quantity * product.price;
      const details = this.orderDetailRepository.create({
        order_id: order.id,
        store_id: orderDatum.store_id,
        product_id: orderDatum.product_id,
        quantity: orderDatum.quantity,
        price: product.price,
      });
      await entityManager.save(details);

      totalAmount += itemTotalPrice;
    }
    return totalAmount;
  }

  async orderWithItems(id: string) {
    return await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.order_items', 'orderItem')
      .where('order.id = :id', { id })
      .getOne();
  }

  async index() {
    return await this.orderRepository.find();
  }

  async getById(id: string) {
    return await this.orderRepository.findOneBy({ id });
  }

  async update(id: string, orderDto) {
    const order = await this.orderRepository.findOneBy({ id });

    if (!order) {
      throw new HttpException(
        'Category record does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.orderRepository.save(orderDto);
  }

  async delete(id: string) {
    await this.orderRepository.delete(id);
  }
}
