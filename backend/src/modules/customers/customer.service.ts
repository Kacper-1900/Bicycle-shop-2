import { Order } from "../orders/order.model";
import { Customer } from "./customer.model";
import { Op } from "sequelize";

export class CustomerService {
    static async findAll() {
        return Customer.findAll({
            order: [["id", "ASC"]],
        });
    }
    static async findById(id: number) {
        return Customer.findByPk(id);
    }
    static async create(data: {
        name: string;
        email: string;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        return Customer.create(data);
    }
    static async update(id: number, data: {
        name: string;
        email: string;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        const customerInstance = await Customer.findByPk(id);
        if (!customerInstance) {
            return null;
        }
        return customerInstance.update(data);
    }
    static async delete(id: number) {
        const customerInstance = await Customer.findByPk(id);
        if (!customerInstance) {
            return null;
        }
        return customerInstance;
    }
    static async findCustomerswithOrdersByNameSearch(nameSearch: string) {
        return Customer.findAll({
            where: { name: { [Op.like]: `%${nameSearch}%` } },
            include: [{
                model: Order,
                as: "orders",
                required: true,
            }],
        });
    }

}