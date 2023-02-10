// Authorisation is to validate the rights of users
// copied from shabeeb - no changes made

import mongoose from "mongoose";
// import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { Actions, Modules } from "@shabeebm369/common";

interface authorizationAttrs {
  user: mongoose.Schema.Types.ObjectId;
  modules: Modules;
  rights: Actions;
}

interface AuthorizationModel extends mongoose.Model<AuthorizationDoc> {
  build(attrs: authorizationAttrs): AuthorizationDoc;
}

interface AuthorizationDoc extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  modules: [Modules];
  rights: [Actions];
  version: number;
}

const authorizationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "users",
    },
    modules: {
      type: String,
      required: true,
      enum: Object.values(Modules),
    },
    rights: [
      {
        type: String,
        required: true,
        enum: Object.values(Actions),
      },
    ],
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

authorizationSchema.set("versionKey", "version");
// authorizationSchema.plugin(updateIfCurrentPlugin);

authorizationSchema.statics.build = (attrs: authorizationAttrs) => {
  return new Authorization(attrs);
};

const Authorization = mongoose.model<AuthorizationDoc, AuthorizationModel>(
  "Authorization",
  authorizationSchema
);

export { Authorization };
