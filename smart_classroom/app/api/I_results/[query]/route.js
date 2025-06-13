import { NextResponse } from "next/server";
import { connect_to_mongo } from "../../mongo/connect_to_mongo";
import { login, student_dashboard } from "../../mongo/mongo_schema";

await connect_to_mongo()

export async function GET(request, { params }) {
    const query = params.query

    if (query == 'get_student_data') {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const user_id = searchParams.get('user_id');

        try {
            const target_instructor = await login.findOne({ candidate_id: user_id });
            let return_data = [];

            if (target_instructor) {
                const target_courses = target_instructor.candidate_courses;

                for (const course of target_courses) {
                    const student_data = await student_dashboard.find({ course_id: course });

                    for (const data of student_data) {
                        const existing_data = return_data.find(each_data => each_data.stud_id === data.student_id);

                        if (existing_data) {
                            if (data.quiz_score) {
                                existing_data.achieved_score += data.quiz_score;
                            }
                            if (data.total_score) {
                                existing_data.total_score += data.total_score;
                            }
                        } else {
                            const [imageData, courseTitle] = await Promise.all([
                                get_image_url(data.student_id),
                                get_course(course)
                            ]);

                            return_data.push({
                                stud_id: data.student_id,
                                name: imageData.name,
                                image: imageData.image,
                                registered_course: courseTitle,
                                ...data,
                                achieved_score: data.quiz_score || 0,
                                total_score: data.total_score || 0,
                            });
                        }
                    }
                }
            }

            return NextResponse.json({ message: "Data fetched", data: return_data });
        } catch (error) {
            console.error("Error fetching student data:", error);
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }
    }
}