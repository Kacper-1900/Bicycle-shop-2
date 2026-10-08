import type { Request, Response, NextFunction } from "express";

import { OrderItemService } from "./order-item.service.js";

export class OrderItemController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const orderItems = await OrderItemService.findAll();
            res.json(orderItems);
        } catch (error) {
            next(error);
        }
    }
    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const orderItem = await OrderItemService.getById(id);
            if (!orderItem) {
                res.status(404).json({
                    message: "Order item not found",
                });
                return;
            }
            res.json(orderItem);
        } catch (error) {
            next(error);
        }

    }
    static async getOrderItemsByBicycleId(req: Request, res: Response, next: NextFunction) {
        try {
            const bicycleId = Number(req.params.bicycleId);
            const orderItems = await OrderItemService.getOrderItemsByBicycleId(bicycleId);
            res.json(orderItems);
        } catch (error) {
            next(error);
        }
    }
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { orderId, bicycleId, quantity, unitPrice } = req.body;
            const orderItem = await OrderItemService.create({
                orderId,
                bicycleId,
                quantity,
                unitPrice
            });
            res.status(201).json(orderItem);
        } catch (error) {
            next(error);
        }
    }
    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const { orderId, bicycleId, quantity, unitPrice } = req.body;
            const orderItem = await OrderItemService.update(id, {
                orderId,
                bicycleId,
                quantity,
                unitPrice
            });
            if (!orderItem) {
                res.status(404).json({
                    message: "Order item not found",
                });
                return;
            } 
              res.json(orderItem);
        } catch (error) {
            next(error);
        }
    }
    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const orderItem = await OrderItemService.delete(id);
            if (!orderItem) {
                res.status(404).json({
                    message: "Order item not found",
                });
                return;
            }
            res.json({
                message: "Order item deleted successfully",
            });
        } catch (error) {
            next(error);
        }
    }
}