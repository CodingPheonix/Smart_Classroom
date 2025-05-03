import { NextResponse } from "next/server";
import { connect_to_mongo } from "../../mongo/connect_to_mongo";
import { course } from "../../mongo/mongo_schema";

await connect_to_mongo()

export async function DELETE(request) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const course_id = searchParams.get('id');

    try {
        const target = await course.findOneAndDelete({ course_id: course_id })
        return NextResponse.json({ message: "target course deleted" })
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error', error: error.message });
    }
}