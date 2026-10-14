import type { Request, Response, NextFunction } from "express";
import { BicycleService } from "./bicycle.service.js";

export class BicycleController {
    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const bicycles = await BicycleService.findAll();
            res.json(bicycles);
        } catch (error) {
            next(error);
        }
    }

    static async getById(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const id = Number(req.params.id);
            const bicycle = await BicycleService.findById(id);
            console.log("Ejecuando: getById");

            if (!bicycle) {
                res.status(404).json({
                    message: "Bicycle not found",
                });
                return;
            }
            res.json(bicycle);
        } catch (error) {
            next(error);
        }
    }

    static async getEagerlyById(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const id = Number(req.params.id);
            const bicycle = await BicycleService.findEagerlyById(id);
            if (!bicycle) {
                res.status(404).json({
                    message: "Bicycle not found",
                });
                return;
            }
            res.json(bicycle);
        } catch (error) {
            next(error);
        }
    }

    static async getAllEagerlyByFrameMaterial(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const frameMaterial = String(req.params.frameMaterial);

            const bicycles = await BicycleService.findAllEagerlyByFrameMaterial(frameMaterial);

            res.json(bicycles);
        } catch (error) {
            next(error);
        }
    }

    static async create(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { brandId, modelId, description, weight, price, stock } = req.body;
            if (!brandId || !modelId || price === undefined) {
                res.status(400).json({
                    message: "brandId, modelId, and price are required",
                });
                return;
            }
            const bicycle = await BicycleService.create({
                brandId,
                modelId,
                description,
                weight,
                price,
                stock,
            });
            res.status(201).json(bicycle);
        } catch (error) {
            next(error);
        }
    }

    static async update(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const id = Number(req.params.id);
            const bicycle = await BicycleService.findById(id);
            if (!bicycle) {
                res.status(404).json({
                    message: "Bicycle not found",
                });
                return;
            }
            const updatedBicycle = await BicycleService.update(
                bicycle,
                req.body
            );
            res.json(updatedBicycle);
        } catch (error) {
            next(error);
        }
    }

    static async delete(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const id = Number(req.params.id);
            const bicycle = await BicycleService.findById(id);
            if (!bicycle) {
                res.status(404).json({
                    message: "Bicycle not found",
                });
                return;
            }
            await BicycleService.delete(bicycle);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    static async getAllWithBrandAndModel(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            console.log("EJECUTANDO: getAllWithBrandAndModel");

            const bicycles = await BicycleService.getAllWithBrandAndModel();
            res.json(bicycles);
        } catch (error) {
            next(error);
        }
    }
    static async getAllByPriceSearch(req: Request, res: Response, next: NextFunction) {
        try {
            const bikes = await BicycleService.getAllWherePriceIsHigherThanHoundred();

            res.json(bikes);
        } catch (error) {
            next(error)
        }

    }

    static async getAllByPriceAndWeight(req: Request, res: Response, next: NextFunction){
        try {
            const bikes = await BicycleService.getAllPriceLowerThanHoundedAndWeightLowerThanTwenty();

            res.json(bikes)
        } catch (error) {
            next(error)
        }
    }
}