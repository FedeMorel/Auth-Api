import { Request, Response } from "express";
import { Comment } from "../../schemas/comment.schema";
import { User } from "../../schemas/user.schema";
import { resultCode } from "../../utils/resultCode.enum";

export const getCommentsOnPost = async (req: Request, res: Response) => {

  try {
    const reqPage = Number(req.query.page) || 1;
    const reqLimit = Number(req.query.limit) || 20;
    const { id } = req.params;
    const options = {
      page: reqPage,
      limit: reqLimit
    }

    const { docs, totalDocs, limit, totalPages, page, pagingCounter, nextPage } = await Comment.paginate({ idPost: id }, options);

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
        comments: docs
      }
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ header: { resultCode: resultCode.FAIL, error } });
  }

}


const obfuscateData = ({ address, name, mail, birthday, phone, state, role, date, id }: any) => {
  return { address, name, mail, birthday, phone, state, role, date, id }
}


