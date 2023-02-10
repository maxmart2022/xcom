// Copied from Smily. No changes made
import mongoose from "mongoose";

interface brandAttrs {
  name: string;
  parent?: mongoose.Types.ObjectId;
  brandOwner: string;
  createdBy: mongoose.Types.ObjectId;
}

interface BrandModel extends mongoose.Model<BrandDoc> {
  build(attrs: brandAttrs): BrandDoc;
}

interface BrandDoc extends mongoose.Document {
  name: string;
  parent: mongoose.Types.ObjectId;
  child: [mongoose.Types.ObjectId];
  brandOwner: string;
  createdBy: mongoose.Types.ObjectId;
}

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    parent: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
      default: null,
    },
    child: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Brand",
      },
    ],
    brandOwner: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    lastUpdatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

brandSchema.statics.build = (attrs: brandAttrs) => {
  return new Brand(attrs);
};

const Brand = mongoose.model<BrandDoc, BrandModel>("Brand", brandSchema);

async function buildSubBrand(brand: BrandDoc) {
  const parentBrand = await Brand.findById(brand.parent, " child").exec();

  if (parentBrand) {
    const { id } = brand; // Name and id of the brand just inserted
    let child = [...parentBrand.child]; // Fetching the existing children from the parent Brand
    if (!parentBrand.child.includes(new mongoose.Types.ObjectId(id))) {
      child = [...parentBrand.child, new mongoose.Types.ObjectId(id)];
    }
    await Brand.findByIdAndUpdate(parentBrand.id, { $set: { child } }); // Updating the parent brand
  }
}

export { Brand, buildSubBrand };
