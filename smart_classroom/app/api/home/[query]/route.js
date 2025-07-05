import { NextResponse } from "next/server";
import { connect_to_mongo } from "../../mongo/connect_to_mongo";
import { user, login } from "../../mongo/mongo_schema";

await connect_to_mongo()

export async function POST(request, { params }) {

    const query = params.query
    console.log(query)

    if (query === 'upload_login_details') {
        console.log('entered')
        try {
            const { name, email, id, password, position } = await request.json()

            // Fetch the account by email
            const target_account = await login.findOne({ candidate_email: email });

            if (target_account) {
                return NextResponse.json({ message: "Account already exists" })
            } else {
                const new_login = new login({
                    candidate_name: name,
                    candidate_id: id,
                    candidate_email: email,
                    candidate_password: password,
                    candidate_position: position,
                    candidate_courses: [],

                    candidate_ename: "",
                    candidate_dob: "",
                    candidate_age: 0,
                    candidate_address: "",
                    candidate_phone: "",

                    candidate_title: "",
                    candidate_department: "",
                    candidate_about: "",
                    candidate_certifications: [],
                })

                await new_login.save()

                return NextResponse.json({ message: "login details uploaded", data: new_login, status: "200" })
            }
        } catch (error) {
            return NextResponse.json({ message: 'Internal server error' })
        }
    }

    if (query === 'verify_user_auth') {
        try {
            const { email, password } = await request.json();
            console.log("email = " + email + " password = " + password);
            // Fetch the account by email
            const target_account = await login.findOne({ candidate_email: email });

            if (!target_account) {
                return NextResponse.json({ message: "Account not found", status: "500" });
            } else {
                // Compare passwords
                if (target_account.candidate_password !== password) {
                    return NextResponse.json({ message: "Incorrect Password", status: "500" });
                } else {
                    return NextResponse.json({ message: "Login successful", data: target_account, status: "200" });
                }
            }
        } catch (error) {
            console.error("Error verifying user authentication:", error); // Log the actual error
            return NextResponse.json({ message: 'Internal server error' });
        }
    }

    if (query === 'set_current_user') {
        try {
            const { id, position } = await request.json();

            // Check if there is already an active user
            const currentUser = await user.findOne({});
            if (currentUser) {
                return NextResponse.json({ message: "Active user already set" });
            }

            // Create a new user entry
            const newUser = new user({
                user_id: id,
                position: position
            });
            await newUser.save();

            return NextResponse.json({ message: "Current user set successfully", data: newUser });
        } catch (error) {
            return NextResponse.json({ message: 'Internal server error' });
        }
    }
}

export async function GET(request, { params }) {

    const query = params.query

    if (query === 'get_current_user') {
        try {
            const users = await user.find({})
            if (users) {
                return NextResponse.json({ message: "Fetched current user successfully", data: users });
            } else {
                return NextResponse.json({ message: 'User not found' });
            }
        } catch (error) {
            return NextResponse.json({ message: 'Internal server error' });
        }
    }
}