import type { Request, Response, NextFunction } from "express";

import { OrderService } from "./order.service.js";

export class OrderController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const orders = await OrderService.findAll();
            res.json(orders);
        } catch (error) {
            next(error);
        }   
    }
    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const order = await OrderService.findById(id);
            if (!order) {
                res.status(404).json({
                    message: "Order not found",
                });
                return;
            }
            res.json(order);
        } catch (error) {
            next(error);
        }   
    }
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { customerId, orderDate, status } = req.body;
            if (!customerId || !status) {
                res.status(400).json({
                    message: "customerId and status are mandatory fields",
                });
                return;
            }
            const order = await OrderService.create({ customerId, orderDate, status });
            res.status(201).json(order);
        } catch (error) {
            next(error);
        }
    }
    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const { customerId, orderDate, status } = req.body;
            const order = await OrderService.update(id, { customerId, orderDate, status });
            if (!order) {
                res.status(404).json({
                    message: "Order not found",
                });
                return;
            }
            res.json(order);
        } catch (error) {
            next(error);
        }
    }
    static async delete(req: Request, res: Response, next: NextFunction) {
        try {   
            const id = Number(req.params.id);
            const order = await OrderService.delete(id);
            if (!order) {
                res.status(404).json({
                    message: "Order not found",
                });
                return;
            }
            res.json(order);
        } catch (error) {
            next(error);
        }
    }
    static async getByCustomerId(req: Request, res: Response, next: NextFunction) {
        try {
            const customerId = Number(req.params.id);
            const orders = await OrderService.findByCustomerId(customerId);
            res.json(orders);
        } catch (error) {
            next(error);
        }
    }
}