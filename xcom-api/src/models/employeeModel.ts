import mongoose from "mongoose";

interface employeeAttrs {
  name: string;
}

interface EmployeeModel extends mongoose.Model<EmployeeDoc> {
  build(attrs: employeeAttrs): EmployeeDoc;
}

interface EmployeeDoc extends mongoose.Document {
  name: string;
  createdBy: mongoose.Types.ObjectId;
}

const employeeSchema = new mongoose.Schema(
  {
    name: {
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
        delete ret.__v;
      },
    },
  }
);

employeeSchema.statics.build = (attrs: employeeAttrs) => {
  return new Employee(attrs);
};

const Employee = mongoose.model<EmployeeDoc, EmployeeModel>(
  "Employee",
  employeeSchema
);

export { Employee };
