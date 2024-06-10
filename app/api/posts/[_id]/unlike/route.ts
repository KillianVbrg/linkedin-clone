import connectDB from "@/mongodb/db";
import { Post } from "@/mongodb/models/Post";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export interface UnlikePostRequestBody {
  userId: string;
}

export async function POST(
  request: Request,
  { params }: { params: { _id: string } }
) {

  auth().protect()

  await connectDB();

  const user = await currentUser()

  try {
    const post = await Post.findById(params._id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await post.unlikePost(user!.id);
    return NextResponse.json({ message: "Post unliked successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while unliking the post" },
      { status: 500 }
    );
  }
}