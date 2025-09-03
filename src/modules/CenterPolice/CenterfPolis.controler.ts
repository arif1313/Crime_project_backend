// src/modules/CenterPolice/CenterPolice.controller.ts
import { Request, Response } from "express";
import { createCenterPoliceValidation, updateCenterPoliceValidation } from "./CenterPolice.validation";
import { CenterPoliceServices } from "./Centerpolice.service";


// ✅ Create
const createCenterPoliceController = async (req: Request, res: Response) => {
  try {
    const { error, value } = createCenterPoliceValidation.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        details: error.details.map((d) => d.message),
      });
    }

    const result = await CenterPoliceServices.createCenterPoliceDB(value);
    res.status(201).json({ success: true, message: "Center police created", data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get All
const getAllCenterPoliceController = async (_req: Request, res: Response) => {
  try {
    const results = await CenterPoliceServices.getAllCenterPolice();
    res.status(200).json({ success: true, data: results });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get By ID
const getCenterPoliceController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await CenterPoliceServices.getCenterPoliceById(id);
    if (!result) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Update
const updateCenterPoliceController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { error, value } = updateCenterPoliceValidation.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        details: error.details.map((d) => d.message),
      });
    }

    const updated = await CenterPoliceServices.updateCenterPoliceById(id, value);
    if (!updated) return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, message: "Updated", data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Soft Delete
const softDeleteCenterPoliceController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deleted = await CenterPoliceServices.softDeleteCenterPoliceById(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, message: "Soft deleted", data: deleted });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Restore
const restoreCenterPoliceController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const restored = await CenterPoliceServices.restoreCenterPoliceById(id);
    if (!restored) return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, message: "Restored", data: restored });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Block
const blockCenterPoliceController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const blocked = await CenterPoliceServices.blockCenterPoliceById(id);
    if (!blocked) return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, message: "Blocked", data: blocked });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Unblock
const unblockCenterPoliceController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const unblocked = await CenterPoliceServices.unblockCenterPoliceById(id);
    if (!unblocked) return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, message: "Unblocked", data: unblocked });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// ✅ Live Search Controller
const liveSearchCenterPoliceController = async (req: Request, res: Response) => {
  try {
    const { keyword } = req.query;
    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: "Keyword is required",
      });
    }

    const results = await CenterPoliceServices.liveSearchCenterPolice(keyword as string);
    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Search by isDeleted
const searchCenterPoliceByDeletedController = async (req: Request, res: Response) => {
  try {
    const { isDeleted } = req.query;
    if (isDeleted === undefined) {
      return res.status(400).json({ success: false, message: "isDeleted is required (true/false)" });
    }

    const results = await CenterPoliceServices.searchCenterPoliceByDeleted(isDeleted === "true");
    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Search by isBlocked
const searchCenterPoliceByBlockedController = async (req: Request, res: Response) => {
  try {
    const { isBlocked } = req.query;
    if (isBlocked === undefined) {
      return res.status(400).json({ success: false, message: "isBlocked is required (true/false)" });
    }

    const results = await CenterPoliceServices.searchCenterPoliceByBlocked(isBlocked === "true");
    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
export const CenterPoliceControllers = {
  createCenterPoliceController,
  getAllCenterPoliceController,
  getCenterPoliceController,
  updateCenterPoliceController,
  softDeleteCenterPoliceController,
  restoreCenterPoliceController,
  blockCenterPoliceController,
  unblockCenterPoliceController,
  liveSearchCenterPoliceController,
  searchCenterPoliceByDeletedController,
  searchCenterPoliceByBlockedController
};
