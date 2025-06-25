import { NextResponse } from "next/server";
import { connect_to_mongo } from "../../mongo/connect_to_mongo";
import { login, student_dashboard } from "../../mongo/mongo_schema";

await connect_to_mongo()

export async function DELETE(request) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const user = searchParams.get('user');
    const id = searchParams.get('id');

    try {
        const target_user = await login.findOne({ candidate_id: user });
        if (!target_user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        target_user.candidate_courses = target_user.candidate_courses.filter(courseId => courseId !== id);
        await target_user.save();

        await student_dashboard.deleteMany({ student_id: user, course_id: id });

        return NextResponse.json({ message: "Target course deleted and data from dashboard deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
    }
}