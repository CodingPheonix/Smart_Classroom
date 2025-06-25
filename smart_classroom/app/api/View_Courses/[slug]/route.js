import { NextResponse } from "next/server";
import { connect_to_mongo } from "../../mongo/connect_to_mongo";
import { course } from "../../mongo/mongo_schema";

await connect_to_mongo()

export async function GET(request, { params }) {
    const slug = params.slug;

    if (slug === 'get_title') {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const Course = searchParams.get('course_id');

        try {
            const courses = await course.findOne({ course_id: Course })
            return NextResponse.json({ success: true, message: "Course title fetched successfully", data: courses })
        } catch (error) {
            return NextResponse.json({ status: 'error', message: 'Failed to fetch course title', error: error.message });
        }
    }
}