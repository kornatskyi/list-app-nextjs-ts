import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function setPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const postData = JSON.parse(req.body);

    const savedPost = await prisma.post.create({
      data: postData,
    });
    return res.json(savedPost);
  } else if (req.method == "DELETE") {
    const postId = JSON.parse(req.body).id;

    const deletedPosts = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return res.json(deletedPosts);
  }

  return res.status(405).json({ message: "Method no allowed" });
}
