import mongoose from "mongoose";
const todoSchema = mongoose.Schema({
    todo: { type: String, required: true },
    disabled: { type: Boolean, default: false, required: true }, 
  });
  
export default mongoose.model("Todo", todoSchema);