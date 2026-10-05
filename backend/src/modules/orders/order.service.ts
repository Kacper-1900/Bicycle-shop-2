import {Order} from "./order.model.js";
import {Customer} from "../customers/customer.model.js";

type statusTypes = "pending" | "paid" | "shipped" | "cancelled";

export class OrderService {
    static async findAll() {
        return Order.findAll({
            order: [["id", "ASC"]],
        });
    }
    static async findById(id: number) {
        return Order.findByPk(id);
    }
    static async create(data: {
        customerId: number;
        orderDate?: Date;
        status: statusTypes;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        return Order.create(data);
    }
    static async update(id: number, data: {
        customerId?: number;
        orderDate?: Date;
        status?: statusTypes;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        const order = await Order.findByPk(id);
        if (!order) {
            return null;
        }
        return order.update(data);
    }
    static async delete(id: number) {
        const order = await Order.findByPk(id);
        if (!order) {
            return null;
        }   
        await order.destroy();
        return order;
    }
    static async findByCustomerId(customerId: number) {
        return Order.findAll({
            where: { customerId },
            include: [{ model: Customer, as: "customer", attributes: ["id", "name", "email"] }],
            order: [["id", "ASC"]],
        });
    }
}