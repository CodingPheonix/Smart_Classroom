import { NextResponse } from "next/server";
import { connect_to_mongo } from "../../mongo/connect_to_mongo";
import { login, user } from "../../mongo/mongo_schema";

await connect_to_mongo()

export async function GET(request) {
    const url = new URL(request.url);
    console.log(url)
    const searchParams = url.searchParams;
    const Id = searchParams.get('user_id');

    try {
        const target_user = await login.findOne({ candidate_id: Id })
        console.log(target_user)
        if (target_user) {
            return NextResponse.json({ message: "Fetched user details", data: target_user }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Required user not found" }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }

}

export async function DELETE() {
    try {
        await user.deleteMany({});
        return NextResponse.json({ message: "Current user deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}