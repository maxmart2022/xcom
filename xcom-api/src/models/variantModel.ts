import { Schema, model, Types } from "mongoose";
import { generateCombinations } from "../helpers/helpers";

const variantSchema = new Schema({
    name: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      }
});




export const Variant = model("Variant", variantSchema);

// const sizes: Variant = { name: 'size', values: ['S', 'M', 'L', 'XL', 'XXL'] };
// const colors: Variant = { name: 'color', values: ['red', 'blue', 'green', 'yellow'] };
// const materials: Variant = { name: 'material', values: ['cotton', 'polyester'] };

// const combinations = generateCombinations([sizes, colors, materials]);

const combinations: generateCombinations(Variant)