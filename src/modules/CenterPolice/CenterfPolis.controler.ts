import { Request, Response } from "express";
import { centerPoliceServices } from "./Centerpolice.service";

// 🔹 Create
const createCenterPolice = async (req: Request, res: Response) => {
  try {
    const result = await centerPoliceServices.createCenterPoliceDB(req.body);
    res.status(201).json({
      success: true,
      message: "Center Police created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 Get all
const getAllCenterPolice = async (req: Request, res: Response) => {
  try {
    const result = await centerPoliceServices.getAllCenterPoliceDB();
    res.status(200).json({
      success: true,
      message: "All Center Police fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 Get by userId
const getCenterPoliceByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await centerPoliceServices.findByCenterPoliceId(userId);
    if (!result) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 Update
const updateCenterPolice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await centerPoliceServices.updateCenterPoliceById(
      userId,
      req.body
    );
    if (!result) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.status(200).json({
      success: true,
      message: "Center Police updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 Soft delete
const softDeleteCenterPolice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await centerPoliceServices.softDeleteCenterPoliceById(userId);
    res.status(200).json({
      success: true,
      message: "Soft deleted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 Restore
const restoreCenterPolice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await centerPoliceServices.restoreCenterPoliceById(userId);
    res.status(200).json({
      success: true,
      message: "Restored successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 Live search
const liveSearchCenterPolice = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    const result = await centerPoliceServices.liveSearchCenterPolice(
      query as string
    );
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 Search by status
const searchByStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const result = await centerPoliceServices.searchByStatus(status as string);
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 Search by email
const searchByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const result = await centerPoliceServices.searchByEmail(email as string);
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 Search by _id
const searchById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await centerPoliceServices.searchById(id);
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 Search by userId
const searchByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const result = await centerPoliceServices.searchByUserId(userId as string);
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 Search by isBlocked
const searchByIsBlocked = async (req: Request, res: Response) => {
  try {
    const { isBlocked } = req.query;
    const result = await centerPoliceServices.searchByIsBlocked(
      isBlocked === "true"
    );
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 Search by isDeleted
const searchByIsDeleted = async (req: Request, res: Response) => {
  try {
    const { isDeleted } = req.query;
    const result = await centerPoliceServices.searchByIsDeleted(
      isDeleted === "true"
    );
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export const centerPoliceControler={
     createCenterPolice,
  getAllCenterPolice,
  getCenterPoliceByUserId,
  updateCenterPolice,
  softDeleteCenterPolice,
  restoreCenterPolice,
  liveSearchCenterPolice,
  searchByStatus,
  searchByEmail,
  searchById,
  searchByUserId,
  searchByIsBlocked,
  searchByIsDeleted,
}