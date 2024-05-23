import UserModel from "../../models/Users/UserModel";
import { RequestHandler } from "express";
import ResponseService from "../../utils/ResponseService";
import { TEXT } from "../../utils/JoiErrors";
import { UserRequest } from "../../../test/utils/UserRequest";

const GetMyProfileController: RequestHandler = async (req, res) => {
  const userId = (req as UserRequest).userId;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return ResponseService.error(res, TEXT.ERRORS.userDoesntExists);
    }

    const { _id, email, createdAt, updatedAt } = user.toObject();

    ResponseService.success(res, {
      _id,
      email,
      createdAt,
      updatedAt,
    });
  } catch (error: any) {
    ResponseService.error(res, error.message);
  }
};

export default GetMyProfileController;
