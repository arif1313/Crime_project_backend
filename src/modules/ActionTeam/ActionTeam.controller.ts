// src/modules/ActionTeam/ActionTeam.controller.ts
import { Request, Response } from "express";
import { ActionTeamServices } from "./ActionTeam.service";
import { UserModel } from "../User/User.model";
import { ActionTeamModel } from "./ActionTeam.model";

// const createActionTeam = async (req: Request, res: Response) => {
//   try {
//     const result = await ActionTeamServices.createActionTeamDB(req.body);
//     res.status(201).json({ success: true, data: result });
//   } catch (error: any) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };
const createActionTeam = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      age,
      address,
      dateOfBirth,
      email,
      contactNumber,
      password,
      status,
      activity,
      gender,
      joingDate,
    } = req.body;

    // ✅ Handle profile image (if uploaded with multer)
    let profileImage = "";
    if (req.file) {
      profileImage = `/uploads/${req.file.filename}`;
    }

    // ✅ Create User first (so that ActionTeam member can login)
    const user = await UserModel.create({
      name: `${firstName} ${lastName}`,
      email,
      password,
      contactNumber,
      role: "actionTeam", // fixed role for action team
    });

    // ✅ Now create ActionTeam record
    const actionTeam = await ActionTeamModel.create({
      userId: user._id,
      firstName,
      middleName,
      lastName,
      profileImage,
      gender,
      age,
      dateOfBirth,
      contactNumber,
      address,
      status,
      activity,
      joingDate,
      isBlocked: false,
      isDeleted: false,
    });

    res.status(201).json({
      success: true,
      message: "ActionTeam created successfully",
      data: actionTeam,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getAllActionTeams = async (_req: Request, res: Response) => {
  try {
    const result = await ActionTeamServices.getAllActionTeams();
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getActionTeamById = async (req: Request, res: Response) => {
  try {
    const result = await ActionTeamServices.getActionTeamById(req.params.id);
    if (!result) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateActionTeamById = async (req: Request, res: Response) => {
  try {
    const result = await ActionTeamServices.updateActionTeamById(req.params.id, req.body);
    if (!result) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const softDeleteActionTeamById = async (req: Request, res: Response) => {
  try {
    const result = await ActionTeamServices.softDeleteActionTeamById(req.params.id);
    if (!result) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const restoreActionTeamById = async (req: Request, res: Response) => {
  try {
    const result = await ActionTeamServices.restoreActionTeamById(req.params.id);
    if (!result) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const blockActionTeamById = async (req: Request, res: Response) => {
  try {
    const result = await ActionTeamServices.blockActionTeamById(req.params.id);
    if (!result) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const unblockActionTeamById = async (req: Request, res: Response) => {
  try {
    const result = await ActionTeamServices.unblockActionTeamById(req.params.id);
    if (!result) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const liveSearchActionTeam = async (req: Request, res: Response) => {
  try {
    const result = await ActionTeamServices.liveSearchActionTeam(req.query.q as string);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const searchActionTeamByDeleted = async (req: Request, res: Response) => {
  try {
    const result = await ActionTeamServices.searchActionTeamByDeleted(
      req.query.isDeleted === "true"
    );
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const searchActionTeamByBlocked = async (req: Request, res: Response) => {
  try {
    const result = await ActionTeamServices.searchActionTeamByBlocked(
      req.query.isBlocked === "true"
    );
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const searchActionTeamByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await ActionTeamServices.searchActionTeamByUserId(userId);
    if (!result) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};


// ✅ service এর মতো object আকারে export
export const ActionTeamController = {
  createActionTeam,
  getAllActionTeams,
  getActionTeamById,
  updateActionTeamById,
  softDeleteActionTeamById,
  restoreActionTeamById,
  blockActionTeamById,
  unblockActionTeamById,
  liveSearchActionTeam,
  searchActionTeamByDeleted,
  searchActionTeamByBlocked,
  searchActionTeamByUserId
};
