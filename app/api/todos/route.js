import connectMongoDB from "@/libs/mongodb";
import Todo from "@/models/todo";
import { NextResponse } from "next/server";

export async function POST(request){
    const {title,description, text_align,font_weight,font_style,text_underline,text_color,list_type} =await request.json();
    await connectMongoDB();
    await Todo.create({
        title,
        description, 
        text_align,
        font_weight,
        font_style,
        text_underline,
        text_color,
        list_type});
    return NextResponse.json({message:"Todo Created"}, {status:201})
}


export async function GET(){
    await connectMongoDB();
    const todos = await Todo.find();
    return NextResponse.json({todos},{status:201})
}

export async function DELETE(request){
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Todo.findByIdAndDelete(id);
    return NextResponse.json({message:"Todo deleted"},{status:200});
}