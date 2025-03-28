import { RequestHandler } from "express";
import Joi from "joi";
import UserModel from "../../models/Users/User.model";
import { TEXT } from "../../utils/JoiErrors";
import ResponseService from "../../utils/ResponseService";
import validateFields, { JOI, PASSWORD_REGEX } from "../../utils/validation";

const validationSchema = JOI.object({
  email: Joi.string().strict().required(),
  password: Joi.string().strict().pattern(PASSWORD_REGEX).required(),
});

const resetPasswordController: RequestHandler = async (req, res) => {
  const { password, email } = req.body;

  if (await validateFields(validationSchema, req, res)) return;

  try {
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return ResponseService.error(res, TEXT.ERRORS.wrongOldPassword);
    }

    user.setPassword(password);
    await user.save();
    res.status(201).end();
  } catch (error: any) {
    ResponseService.error(res, error.message);
  }
};

export default resetPasswordController;
