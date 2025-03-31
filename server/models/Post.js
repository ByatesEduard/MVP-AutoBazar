import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    username: { type: String },
    title: { type: String, required: true },
    imgUrl: { type: String, default: "" }, 
    price: { type: Number, required: true },
    views: { type: Number, default: 0 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    fuel: { type: Number, required: true },
    engine: { type: Number, required: true },
    transmission: { type: Number, required: true },
    mileage: { type: Number, required: true }

  },
  { timestamps: true } // Включает createdAt и updatedAt автоматически
);

export default mongoose.model("Post", PostSchema);
