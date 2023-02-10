import * as mongoose from "mongoose";
import Schema = mongoose.Schema;

interface CustomVariant {
  name: string;
  value: string;
}

const VariantSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  variant_name: String,
  price: Number,
  barcode: String,
  sku: String,
});

interface ProductAttrs {
  name: string;
  description: string;
  category: mongoose.Types.ObjectId;
  parentProduct: mongoose.Types.ObjectId;
  customVariants: { [key: string]: CustomVariant[] };
}

interface ProductDoc extends mongoose.Document {
  name: string;
  description: string;
  category: mongoose.Types.ObjectId;
  parentProduct: mongoose.Types.ObjectId;
  customVariants: { [key: string]: CustomVariant[] };
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

const customVariantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },
  parentProduct: { type: String, required: true, default: null },
  customVariants: { type: Map, of: [customVariantSchema] },
});

productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs);
};

VariantSchema.pre("validate", function (next) {
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

export const Product = mongoose.model<ProductDoc, ProductModel>(
  "Product",
  productSchema
);
