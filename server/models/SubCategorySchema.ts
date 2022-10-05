import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    parent: {
      type: String,
      required: true,
    },
    parentSlug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.SubCategory ||
  mongoose.model("SubCategory", SubCategorySchema);
