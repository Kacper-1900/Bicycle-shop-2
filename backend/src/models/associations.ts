import { Bicycle } from "../modules/bicycles/bicycle.model.js";
import { Brand } from "../modules/brands/brand.model.js";

export function defineAssociations() {
  console.log("Associations defined"); 
  Brand.hasMany(Bicycle, { foreignKey: "brandId", as: "bicycles" });
  Bicycle.belongsTo(Brand, { foreignKey: "brandId", as: "brand" });
}