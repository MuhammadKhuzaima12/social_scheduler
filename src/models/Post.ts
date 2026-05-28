import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  scheduledTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
}, { timestamps: true })

export default mongoose.models.Post || mongoose.model("Post", PostSchema)