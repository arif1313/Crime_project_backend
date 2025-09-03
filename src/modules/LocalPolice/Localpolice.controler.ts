import { Request, Response } from "express";

import {
  createLocalPoliceValidation,
  updateLocalPoliceValidation,
} from "./localPolice.validation";
import { LocalPoliceStationServices } from "./LocalPolice.service";

// ✅ Create
const createLocalPoliceController = async (req: Request, res: Response) => {
  try {
    const { error, value } = createLocalPoliceValidation.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        details: error.details.map((d) => d.message),
      });
    }

    const result = await LocalPoliceStationServices.createLocalPoliceStationDB(value);
    res
      .status(201)
      .json({ success: true, message: "Police station created", data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get All
const getAllLocalPoliceController = async (_req: Request, res: Response) => {
  try {
    const stations = await LocalPoliceStationServices.getAllLocalPoliceStations();
    res.status(200).json({ success: true, data: stations });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get By ID
const getLocalPoliceController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const station = await LocalPoliceStationServices.getLocalPoliceStationById(id);
    if (!station)
      return res
        .status(404)
        .json({ success: false, message: "Police station not found" });

    res.status(200).json({ success: true, data: station });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Update
const updateLocalPoliceController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { error, value } = updateLocalPoliceValidation.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        details: error.details.map((d) => d.message),
      });
    }

    const updated = await LocalPoliceStationServices.updateLocalPoliceStationById(id, value);
    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Police station not found" });

    res
      .status(200)
      .json({ success: true, message: "Police station updated", data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Soft Delete
const softDeleteLocalPoliceController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deleted = await LocalPoliceStationServices.softDeleteLocalPoliceStationById(id);
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Police station not found" });

    res.status(200).json({
      success: true,
      message: "Police station soft deleted",
      data: deleted,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Restore
const restoreLocalPoliceController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const restored = await LocalPoliceStationServices.restoreLocalPoliceStationById(id);
    if (!restored)
      return res
        .status(404)
        .json({ success: false, message: "Police station not found" });

    res.status(200).json({
      success: true,
      message: "Police station restored",
      data: restored,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Block
const blockLocalPoliceController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const blocked = await LocalPoliceStationServices.blockLocalPoliceStationById(id);
    if (!blocked)
      return res
        .status(404)
        .json({ success: false, message: "Police station not found" });

    res.status(200).json({
      success: true,
      message: "Police station blocked",
      data: blocked,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Unblock
const unblockLocalPoliceController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const unblocked = await LocalPoliceStationServices.unblockLocalPoliceStationById(id);
    if (!unblocked)
      return res
        .status(404)
        .json({ success: false, message: "Police station not found" });

    res.status(200).json({
      success: true,
      message: "Police station unblocked",
      data: unblocked,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Live Search
const liveSearchLocalPoliceController = async (req: Request, res: Response) => {
  try {
    const { keyword } = req.query;
    if (!keyword)
      return res
        .status(400)
        .json({ success: false, message: "Keyword is required" });

    const results = await LocalPoliceStationServices.liveSearchLocalPoliceStations(
      keyword as string
    );
    res
      .status(200)
      .json({ success: true, count: results.length, data: results });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Search by isDeleted
const searchByIsDeletedController = async (req: Request, res: Response) => {
  try {
    const { isDeleted } = req.query;
    if (isDeleted === undefined)
      return res
        .status(400)
        .json({ success: false, message: "isDeleted is required" });

    const results = await LocalPoliceStationServices.searchByIsDeleted(
      isDeleted === "true"
    );
    res
      .status(200)
      .json({ success: true, count: results.length, data: results });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Search by isBlocked
const searchByIsBlockedController = async (req: Request, res: Response) => {
  try {
    const { isBlocked } = req.query;
    if (isBlocked === undefined)
      return res
        .status(400)
        .json({ success: false, message: "isBlocked is required" });

    const results = await LocalPoliceStationServices.searchByIsBlocked(
      isBlocked === "true"
    );
    res
      .status(200)
      .json({ success: true, count: results.length, data: results });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const LocalPoliceControllers = {
  createLocalPoliceController,
  getAllLocalPoliceController,
  getLocalPoliceController,
  updateLocalPoliceController,
  softDeleteLocalPoliceController,
  restoreLocalPoliceController,
  blockLocalPoliceController,
  unblockLocalPoliceController,
  liveSearchLocalPoliceController,
  searchByIsDeletedController,
  searchByIsBlockedController,
};
