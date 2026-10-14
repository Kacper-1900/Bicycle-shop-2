import { Bicycle } from "../bicycles/bicycle.model.js";
import { Order } from "../orders/order.model.js";
import { OrderItem } from "./order-item.model.js";

export class OrderItemService {
    static async findAll() {
        return OrderItem.findAll({
            order: [["id", "ASC"]],
        });
    }
    static async getById(id: number) {
        return OrderItem.findByPk(id);
    }

    static async getOrderItemsByBicycleId(bicycleId: number) {
    return OrderItem.findAll({
        where: {
            bicycleId: bicycleId
        },
        include: [
            {
                model: Order,
                as: "order",
                attributes: ["id", "orderDate", "status"],
                required: true
            },
            {
                model: Bicycle,
                as: "bicycle",
                attributes: ["id", "model", "price"],
                required: true
            }
        ]
    });
}
    static async create(data: {
        orderId: number;
        bicycleId: number;
        quantity: number;
        unitPrice: number;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        return OrderItem.create(data);
    }
    static async update(id: number, data: {
        orderId?: number;
        bicycleId?: number;
        quantity?: number;
        unitPrice?: number;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        const orderItem = await OrderItem.findByPk(id);
        if (!orderItem) {
            return null;
        }
        return orderItem.update(data);
    }
    static async delete(id: number) {
        const orderItem = await OrderItem.findByPk(id);
        if (!orderItem) {
            return null;
        }
        return orderItem.destroy();
    }
}