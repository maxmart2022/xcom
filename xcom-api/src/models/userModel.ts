import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import { roles } from "../constants/roles";
import { Password } from "../helpers/password";

interface UserAttrs {
  email: string;
  password: string;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  app: string;
  version: number;
  generateAuthToken(): string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(roles),
      default: roles.SUPERSTAFF,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    app: {
      type: String,
      default: "Supermax",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
  }
);

userSchema.set("versionKey", "version");
// userSchema.plugin(updateIfCurrentPlugin);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      id: this.id,
      email: this.email,
      role: this.role,
      app: this.app,
      isActive: this.isActive,
    },
    process.env.JWT_KEY!,
    { expiresIn: "5m" }
  );
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
