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



// 1️⃣ Live search controller
const liveSearchLocalUsersController = async (req: Request, res: Response) => {
  try {
    const { keyword } = req.query;
    if (!keyword) return res.status(400).json({ success: false, message: "Keyword is required" });

    const results = await LocalUserServices.liveSearchLocalUsers(keyword as string);
    res.status(200).json({ success: true, count: results.length, data: results });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 2️⃣ Search by contactNumber
const searchByContactNumberController = async (req: Request, res: Response) => {
  try {
    const { contactNumber } = req.query;
    if (!contactNumber) return res.status(400).json({ success: false, message: "contactNumber is required" });

    const results = await LocalUserServices.searchByContactNumber(contactNumber as string);
    res.status(200).json({ success: true, count: results.length, data: results });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 3️⃣ Search by isDeleted
const searchByIsDeletedController = async (req: Request, res: Response) => {
  try {
    const { isDeleted } = req.query;
    if (isDeleted === undefined) return res.status(400).json({ success: false, message: "isDeleted is required" });

    const results = await LocalUserServices.searchByIsDeleted(isDeleted === "true");
    res.status(200).json({ success: true, count: results.length, data: results });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 4️⃣ Search by isBlocked
const searchByIsBlockedController = async (req: Request, res: Response) => {
  try {
    const { isBlocked } = req.query;
    if (isBlocked === undefined) return res.status(400).json({ success: false, message: "isBlocked is required" });

    const results = await LocalUserServices.searchByIsBlocked(isBlocked === "true");
    res.status(200).json({ success: true, count: results.length, data: results });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Block Local User
const blockLocalUserController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const blockedUser = await LocalUserServices.blockLocalUserById(id);

    if (!blockedUser) {
      return res.status(404).json({
        success: false,
        message: "Local user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Local user blocked successfully",
      data: blockedUser,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Unblock Local User
const unblockLocalUserController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const unblockedUser = await LocalUserServices.unblockLocalUserById(id);

    if (!unblockedUser) {
      return res.status(404).json({
        success: false,
        message: "Local user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Local user unblocked successfully",
      data: unblockedUser,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};





// Export all controller methods as object
export const LocalUserControllers = {
  createLocalUserController,
  getLocalUserController,
  updateLocalUserController,
  softDeleteLocalUserController,
  restoreLocalUserController,
  getAllLocalUsersController,
   liveSearchLocalUsersController,
  searchByContactNumberController,
  searchByIsDeletedController,
  searchByIsBlockedController,
   blockLocalUserController,
  unblockLocalUserController,
};
