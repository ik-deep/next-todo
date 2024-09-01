import connectMongoDB from "@/libs/mongodb";
import Todo from "@/models/todo";
import { NextResponse } from "next/server";



export async function PUT(request, {params}){
     const {id} = params;
     const {title,description, text_align,
        font_weight,
        font_style,
        text_underline,
        text_color,
        list_type} = await request.json();

     await connectMongoDB();
     await Todo.findByIdAndUpdate(id,{title,description,
        text_align,
        font_weight,
        font_style,
        text_underline,
        text_color,
        list_type
      });
     return NextResponse.json({message:"Todo Updated"},{status:200});

}

export async function GET(request,{params}){
    const {id} = params;
    await connectMongoDB();
    const todo = await Todo.findOne({_id:id});
    return NextResponse.json({todo});
}

