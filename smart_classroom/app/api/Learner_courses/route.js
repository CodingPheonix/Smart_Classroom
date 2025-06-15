import { NextResponse } from "next/server";
import { connect_to_mongo } from "../../mongo/connect_to_mongo";
import { course } from "../mongo/mongo_schema";

await connect_to_mongo()

export async function GET(request) {
    try {
        const courses = await course.find({})
        return NextResponse.json({ success: true, message: "Courses fetched successfully", data: courses });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to fetch courses', error: error.message }, { status: 500 });
    }
}