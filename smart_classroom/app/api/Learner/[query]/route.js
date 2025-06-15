import { NextResponse } from "next/server";
import { connect_to_mongo } from "../../mongo/connect_to_mongo";
import { course, login, quiz_data } from "../../mongo/mongo_schema";

await connect_to_mongo()

export async function GET(request, { params }) {
    const query = params.query

    if (query === "getMyCourseList") {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const learner_id = searchParams.get('user_id');

        try {
            const candidate = await login.findOne({ candidate_id: learner_id })

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
    else if (query === "fetch_user_profile_data") {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const id = searchParams.get('user_id');

        try {
            const target_user = await login.findOne({ candidate_id: id })
            if (target_user) {
                const result = {
                    user_address: target_user.candidate_address,
                    user_name: target_user.candidate_ename,
                    user_phone: target_user.candidate_phone,
                    user_age: target_user.candidate_age,
                    user_dob: target_user.candidate_dob,
                    user_image: target_user.candidate_imageURL,
                }
                return NextResponse.json({ message: "user details fetched", data: result }, { status: 200 });
            } else {
                return NextResponse.json({ message: 'User not found' }, { status: 404 });
            }
        } catch (error) {
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }
    }
}
export async function PUT(request, { params }) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const id = searchParams.get('user_id');

    try {
        const { address, age, date_of_birth, name, phone, image } = req.body;
        const user = await login.findOne({ candidate_id: id })
        if (user) {
            user.candidate_address = address;
            user.candidate_age = age;
            user.candidate_dob = date_of_birth;
            user.candidate_ename = name;
            user.candidate_phone = phone;
            user.candidate_imageURL = image;
            await user.save();
            return NextResponse.json({ message: "Profile updated successfully", data: user }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}