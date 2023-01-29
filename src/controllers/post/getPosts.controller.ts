import { Post } from "../../schemas/post.schema";
import { Request, Response } from "express";
import { resultCode } from "../../utils/resultCode.enum";

export const getPosts = async (req: Request, res: Response) => {

  const reqPage = Number(req.query.page) || 1;
  const reqLimit = Number(req.query.limit) || 20;

  const options = {
    page: reqPage,
    limit: reqLimit
  }

  try {
    const { docs, totalDocs, limit, totalPages, page, pagingCounter, nextPage } = await Post.paginate({}, options);
    res.status(200).json({
      header: {
        resultCode: resultCode.OK,
      },
      data: {
        info: {
          totalDocs,
          limit,
          totalPages,
          page,
          pagingCounter,
          nextPage
        },
        users: docs
      }
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ header: { resultCode: resultCode.FAIL, error } });
  }
}