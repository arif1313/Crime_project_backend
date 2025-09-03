import { Request, Response } from "express";
import { LocalUserServices } from "./LocalUser.service";
import { createLocalUserValidation, updateLocalUserValidation } from "./localUser.validation";


const createLocalUserController = async (req: Request, res: Response) => {
  try {
    const { error, value } = createLocalUserValidation.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ success: false, message: "Validation error", details: error.details.map(d => d.message) });
    }

    const result = await LocalUserServices.createLocalUserDB(value);

    res.status(201).json({
      success: true,
      message: "Local user created successfully",
      data: result,  // user & localUser properly included
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// ✅ Get All LocalUsers
const getAllLocalUsersController = async (_req: Request, res: Response) => {
  try {
    const localUsers = await LocalUserServices.getAllLocalUsers();
    res.status(200).json({ success: true, data: localUsers });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ✅ Get LocalUser by ID
const getLocalUserController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const localUser = await LocalUserServices.getLocalUserById(id);
    if (!localUser) return res.status(404).json({ success: false, message: "Local user not found" });

    res.status(200).json({ success: true, data: localUser });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};


const updateLocalUserController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // Validate with optional fields
    const { error, value } = updateLocalUserValidation.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        details: error.details.map(d => d.message),
      });
    }

    const updatedLocalUser = await LocalUserServices.updateLocalUserById(id, value);

    if (!updatedLocalUser) {
      return res.status(404).json({ success: false, message: "Local user not found" });
    }

    res.status(200).json({
      success: true,
      message: "Local user updated successfully",
      data: updatedLocalUser,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const softDeleteLocalUserController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const deletedLocalUser = await LocalUserServices.softDeleteLocalUserById(id);

    if (!deletedLocalUser) {
      return res.status(404).json({
        success: false,
        message: "Local user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Local user soft-deleted successfully",
      data: deletedLocalUser,
    });

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


const restoreLocalUserController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const restoredUser = await LocalUserServices.restoreLocalUserById(id);

    if (!restoredUser) {
      return res.status(404).json({
        success: false,
        message: "Local user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Local user restored successfully",
      data: restoredUser,
    });

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export { restoreLocalUserController };


// Export all controller methods as object
export const LocalUserControllers = {
  createLocalUserController,
  getLocalUserController,
  updateLocalUserController,
  softDeleteLocalUserController,
  restoreLocalUserController,
  getAllLocalUsersController
};
