import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductVariantSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  barcode: String,
  sku: String,
  images: [String],
});

ProductVariantSchema.pre("validate", function (next) {
  const product = this.product;
  Product.findById(product, (err, product) => {
    if (err) return next(err);

    // Fetch the variant types from another collection
    VariantType.find({}, (err, variantTypes) => {
      if (err) return next(err);

      variantTypes.forEach((variantType) => {
        const type = variantType.type;
        const attribute = variantType.attribute;

        if (product.variant_type.includes(type)) {
          this[attribute] = this.variant_name;
        }
      });

      next();
    });
  });
});

const ProductSchema = new Schema({
  product_name: String,
  description: String,
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  brand: { type: Schema.Types.ObjectId, ref: "Brand" },
  images: [String],
  variant_type: [{ type: Schema.Types.ObjectId, ref: "VariantTypes" }],
  productvariants: [{ type: Schema.Types.ObjectId, ref: "ProductVariant" }],
});

const InventorySchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  productVariant: {
    type: Schema.Types.ObjectId,
    ref: "ProductVariant",
    default: null,
  },
  quantity: { type: Number, default: 0 },
  listPrice: { type: Number, default: 0 },
});

const Product = mongoose.model("Product", ProductSchema);
const ProductVariant = mongoose.model("Variant", ProductVariantSchema);
const Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = { Product, ProductVariant, Inventory };
