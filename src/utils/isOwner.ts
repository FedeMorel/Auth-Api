import { Request, Response } from "express";
import { getTokenInfo } from "./getTokenInfo";

export const isOwner = async (req: Request, res: Response, userId: string): Promise<boolean> => {
    const tokenData = await getTokenInfo(req, res);
    return userId !== tokenData.id
}