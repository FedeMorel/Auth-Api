import { Request, Response } from "express";
import { User } from "../../schemas/user";
import { resultCode } from "../../utils/resultCode.enum";

export const getUsers = async (req: Request, res: Response) => {

  try {
    const reqPage = Number(req.query.page) || 1;
    const reqLimit = Number(req.query.limit) || 20;

    const options = {
      page: reqPage,
      limit: reqLimit
    }

    const { docs, totalDocs, limit, totalPages, page, pagingCounter, nextPage } = await User.paginate({}, options);
    const users = docs.map(user => obfuscateData(user));

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
        users: users
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


