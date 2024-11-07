import mongoose from "mongoose";

interface ReviewDocument extends mongoose.Schema {
  name: string;
  comments: string;
}

const ReviwSchema = new mongoose.Schema<ReviewDocument>(
  {
    name: { type: String, max: 30 },
    comments: { type: String, max: 200 },
  },
  { timestamps: true }
);

const Review = mongoose.model<ReviewDocument>("Review", ReviwSchema);
export default Review;
