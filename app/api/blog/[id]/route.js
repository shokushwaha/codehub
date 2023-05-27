
import Prompt from "@models/prompt";

import { connectToDB } from "@utils/database"

export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const blog = await Prompt.find({ _id: params.id }).populate('creator');
        return new Response(JSON.stringify(blog), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch the blog", { status: 500 });

    }
}