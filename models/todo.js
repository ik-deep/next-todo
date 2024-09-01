import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
    {
        title: String,
        description: String,
        text_align: String,
        font_weight: String,
        font_style: String,
        text_underline: String,
        text_color: String,
        list_type: String

    },
    {
        timestamps: true,
    }
);

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema)
export default Todo;