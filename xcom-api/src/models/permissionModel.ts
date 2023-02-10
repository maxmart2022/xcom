import mongoose from "mongoose";

interface PermissionAttrs {
  name: string;
  code: string;
}

interface PermissionModel extends mongoose.Model<PermissionDoc> {
  build(attrs: PermissionAttrs): PermissionDoc;
}

interface PermissionDoc extends mongoose.Document {
  name: string;
  code: string;
}

const permissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    code: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

permissionSchema.statics.build = (attrs: PermissionAttrs) => {
  return new Permission(attrs);
};

const Permission = mongoose.model<PermissionDoc, PermissionModel>(
  "Permission",
  permissionSchema
);

export { Permission };
