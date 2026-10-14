import { Brand } from "../brands/brand.model.js";
import { Bicycle } from "./bicycle.model.js";
import { BicycleDetail } from "../bicycle-details/bicycle-detail.model.js";
import { models } from "../models/model.model.js";
import { Op } from 'sequelize'; // o '@sequelize/core'


export class BicycleService {
  static async findAll() {
    return Bicycle.findAll({
      order: [["id", "ASC"]],
    });
  }

  static async findById(id: number) {
    return Bicycle.findByPk(id);
  }

  static async findEagerlyById(id: number) {
    return Bicycle.findByPk(id, {
      include: [
        {
          model: Brand,
          as: "brand",
        },
      ],
    });
  }

  static async findAllEagerlyByFrameMaterial(frameMaterial: string) {
    return Bicycle.findAll({
      include: [
        {
          model: BicycleDetail,
          as: "detail",
          where: { frameMaterial },
        },
      ],
      order: [["id", "ASC"]],
    });
  }

  static async create(data: {
    brandId: number;
    modelId: number;
    description?: string | null;
    weight: number;
    price: number;
    stock?: number;
  }) {
    return Bicycle.create(data);
  }

  static async update(
    bicycle: Bicycle,
    data: {
      brandId?: number;
      model?: string | null;
      description?: string | null;
      weight?: number;
      price?: number;
      stock?: number;
    }
  ) {
    return bicycle.update(data);
  }

  static async delete(bicycle: Bicycle) {
    await bicycle.destroy();
  }

  static async getAllWithBrandAndModel() {
    return Bicycle.findAll({
      include: [
        {
          model: Brand,
          as: "brand",
          attributes: ["id", "name"],
          required: false
        },
        {
          model: models,
          as: "exactModel",
          attributes: ["id", "name"],
          required: false
        }
      ]
    });
  }

  static async getAllWherePriceIsHigherThanHoundred() {
    return Bicycle.findAll({
      where: {
        price: {
          [Op.gt]: 100
        }
      }
    });
  }

  static async getAllPriceLowerThanHoundedAndWeightLowerThanTwenty() {
    return Bicycle.findAll({
      where: {
        price:{
          [Op.lt]: 100
        },
        weight:{
          [Op.gt]: 20
        }
      }
    })
  }

}