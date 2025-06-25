import { NextResponse } from "next/server";
import { connect_to_mongo } from "../mongo/connect_to_mongo";
import { course, login } from "../mongo/mongo_schema";

await connect_to_mongo()

export async function GET(request) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const learner_id = searchParams.get('user_id');

    try {
        const candidate = await login.findOne({ candidate_id: learner_id })
        console.log(candidate);
        
        const mycourses_id = candidate.candidate_courses

        const mycourses = await Promise.all(
            mycourses_id.map(async (courseId) => {
                return await course.findOne({ course_id: courseId });
            })
        );

        if (mycourses) {
            return NextResponse.json({ message: "Fetched all courses", data: mycourses }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'target course not found' }, { status: 404 });
        }

    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}