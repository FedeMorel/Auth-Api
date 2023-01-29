import { Post } from "../../schemas/post.schema";
import { Request, Response } from "express";
import { resultCode } from "../../utils/resultCode.enum";

export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;


  try {
    const post = await Post.findById(id);

    if (!post) { res.status(200).json({ header: { resultCode: resultCode.POST_NOT_FOUND, error: 'Post not found' } }); }

    res.status(200).json({
      header: {
        resultCode: resultCode.OK,
      },
      data: {
        post
      }
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ header: { resultCode: resultCode.FAIL, error } });
  }
}