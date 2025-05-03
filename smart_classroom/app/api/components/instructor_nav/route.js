import { NextResponse } from "next/server";
import { connect_to_mongo } from "../../mongo/connect_to_mongo";
import { login, user } from "@/app/api/mongo/mongo_schema";

await connect_to_mongo()

export async function GET(request) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const Id = searchParams.get('user_id');

    try {
        const target_user = await login.findOne({ candidate_id: Id })
        if (target_user) {
            NextResponse.status(200).send({ message: "Fetched user details", data: target_user })
        } else {
            NextResponse.send({ message: "Required user not found" })
        }
    } catch (error) {
        NextResponse.status(500).json({ message: 'Internal server error' });
    }

}

export async function DELETE() {
    try {
        await user.deleteMany({});
        NextResponse.status(200).json({ message: "Current user deleted successfully" });
      } catch (error) {
        NextResponse.status(500).json({ message: 'Internal server error' });
      }
}