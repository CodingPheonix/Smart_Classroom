import { NextResponse } from "next/server";
import { connect_to_mongo } from "../../mongo/connect_to_mongo";
import { login, course } from "../../mongo/mongo_schema";

await connect_to_mongo()

export async function GET(request, { params }) {
    const query = params.query;

    if (query === "getCourses") {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const Instructor = searchParams.get('user_id');

        try {
            const courses = await course.find({ instructor_id: Instructor })
            return NextResponse.json({ success: true, message: "Courses fetched successfully", data: courses });
        } catch (error) {
            return NextResponse.json({ success: false, message: 'Failed to fetch courses', error: error.message }, { status: 500 });
        }
    }
    else if (query === "fetch_instructor_data") {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const id = searchParams.get('id');

        try {
            const target_user = await login.findOne({ candidate_id: id })
            if (target_user) {
                const result = {
                    title: target_user.candidate_title,
                    name: target_user.candidate_ename,
                    contact: target_user.candidate_phone,
                    institution: target_user.candidate_department,
                    aboutMe: target_user.candidate_about,
                    achievements: target_user.candidate_certifications,
                    image: target_user.candidate_imageURL
                }
                return NextResponse.json({ message: "user details fetched", data: result });
            } else {
                return NextResponse.json({ message: 'User not found' }, { status: 404 });
            }
        } catch (error) {
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }
    }
}

export async function PUT(request, { params }) {
    const query = params.query;

    if (query === "upload_instructor_profile") {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const id = searchParams.get('id');

        try {
            const { name, title, institution, contact, aboutMe, achievements, image } = req.body

            const target_instructor = await login.findOne({ candidate_id: id })
            if (target_instructor) {
                target_instructor.candidate_ename = name;
                target_instructor.candidate_title = title;
                target_instructor.candidate_department = institution;
                target_instructor.candidate_phone = contact;
                target_instructor.candidate_about = aboutMe;
                target_instructor.candidate_certifications = achievements;
                target_instructor.candidate_imageURL = image;
                await target_instructor.save();
                return NextResponse.json({ message: "Profile updated successfully", data: target_instructor });
            } else {
                return NextResponse.json({ message: 'User not found' }, { status: 404 });
            }
        } catch (error) {
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }
    }
}