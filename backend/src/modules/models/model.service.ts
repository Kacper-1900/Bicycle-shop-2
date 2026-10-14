import {models} from "./model.model.js";

export class ModelService {
    static async findAll() {
        return models.findAll({
            order: [["id", "ASC"]],
        });
    }
    static async findById(id: number) {
        return models.findByPk(id);
    }
    static async create(data: { 
        name: string;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        return models.create(data);
    }
    static async update(
        brand: models,
        data: {
            name?: string;
        }
    ) {
        return brand.update(data);
    }
    static async delete(brand: models) {
        await brand.destroy();
    }
}