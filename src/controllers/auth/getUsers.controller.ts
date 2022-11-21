import { Request, Response } from "express";
import { User } from "../../schemas/user";
import { resultCode } from "../../utils/resultCode.enum";

export const getUsers = async (req: Request, res: Response) => {

  const options = {
    page: 1,
    limit: 10
  }

  try {
    const { docs, totalDocs, limit, totalPages, page, pagingCounter, nextPage } = await User.paginate({}, options);
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
  } catch (err) {

  }
}