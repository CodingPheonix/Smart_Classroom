import { NextResponse } from "next/server";
import { connect_to_mongo } from "../../mongo/connect_to_mongo";
import { course, student_dashboard } from "../../mongo/mongo_schema";

await connect_to_mongo()

export async function GET(request, { params }) {
    const query = params.query;

    if (query === "getModule") {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const id = searchParams.get('id');

        try {
            const courses = await course.findOne({ course_id: id })
            return NextResponse.json({ success: true, message: "Course title fetched successfully", data: courses });
        } catch (error) {
            return NextResponse.json({ success: false, message: 'Failed to fetch course title', error: error.message }, { status: 500 });
        }
    }
    else if (query === "get_mark") {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const user = searchParams.get('user_id');
        const Module = searchParams.get('module_id');

        try {
            const target_module = await student_dashboard.findOne({ student_id: user, module_id: Module })
            if (target_module) {
                return NextResponse.json({ message: "Module mark status fetched", data: target_module.is_complete });
            } else {
                return NextResponse.json({ message: "No data found for the student" }, { status: 404 });
            }
        } catch (error) {
            return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
        }
    }
}