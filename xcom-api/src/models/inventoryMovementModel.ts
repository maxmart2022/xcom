import mongoose from "mongoose";

const inventoryMovementSchema = new mongoose.Schema({
  variantId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "ProductVariant",
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  type: {
    type: String,
    required: true,
    enum: ["in", "out"],
  },
  details: String,
});

const InventoryMovement = mongoose.model(
  "InventoryMovement",
  inventoryMovementSchema
);

// module.exports = InventoryMovement;
export { InventoryMovement };
