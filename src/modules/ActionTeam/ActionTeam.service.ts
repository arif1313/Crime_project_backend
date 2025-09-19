// src/modules/ActionTeam/ActionTeam.service.ts
import { Types } from "mongoose";
import { ActionTeamModel } from "./ActionTeam.model";
import { IUserResponse, UserService } from "../User/user.service";
import { IActionteam } from "./ActionTeam.Interface";

export type IActionTeamResponse = {
  user: IUserResponse;
  actionTeam: IActionteam;
};

export type CreateActionTeamInput = Omit<IActionteam, "userId"> & {
  userId?: string;
  email: string;
  password: string;
  contactNumber: string;
  teamName: string;
};

// ✅ ActionTeam Create Service
const createActionTeamDB = async (
  teamData: CreateActionTeamInput
): Promise<IActionTeamResponse> => {
  let userId: string;
  let user: IUserResponse;

  // যদি আগে থেকে userId পাঠানো থাকে → সেটা দিয়ে নাও
  if (teamData.userId) {
    const foundUser = await UserService.findUserById(teamData.userId);
    if (!foundUser) throw new Error("User not found for given userId");
    userId = foundUser._id!;
    user = foundUser;
  } else {
    // আগে থেকে email দিয়ে user খুঁজো
    const existingUser = await UserService.getAllUsersDB();
    const foundUser = existingUser.find((u) => u.email === teamData.email);

    if (foundUser) {
      // আগে থেকে User থাকলে reuse করো
      userId = foundUser._id!;
      user = foundUser;
    } else {
      // ✅ নতুন User create করো
      const newUser = await UserService.createUserDB({
        name: teamData.teamName || teamData.firstName,
        email: teamData.email,
        contactNumber: teamData.contactNumber,
        password: teamData.password, // 👈 এখন password body থেকে নেব
        role: "actionTeam",
      });
      userId = newUser._id!;
      user = newUser;
    }
  }

  // ✅ এখন ActionTeam create করো
  const actionTeam = await ActionTeamModel.create({
    ...teamData,
    userId,
    joingDate: teamData.joingDate || new Date(), // default আজকের তারিখ
  });

  return { user, actionTeam };
};

// ✅ Get All
const getAllActionTeams = async (): Promise<IActionteam[]> => {
  const results = await ActionTeamModel.find({ isDeleted: false });
  return results.map((s) => s.toObject());
};

// ✅ Get By ID
const getActionTeamById = async (id: string): Promise<IActionteam | null> => {
  const team = await ActionTeamModel.findById(id);
  return team ? team.toObject() : null;
};

// ✅ Update
const updateActionTeamById = async (
  id: string,
  data: Partial<IActionteam>
): Promise<IActionteam | null> => {
  const updated = await ActionTeamModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return updated ? updated.toObject() : null;
};

// ✅ Soft Delete
const softDeleteActionTeamById = async (id: string): Promise<IActionteam | null> => {
  const team = await ActionTeamModel.findById(id);
  if (!team) return null;

  if (team.isDeleted) return team.toObject();

  team.isDeleted = true;
  await team.save();
  return team.toObject();
};

// ✅ Restore
const restoreActionTeamById = async (id: string): Promise<IActionteam | null> => {
  const restored = await ActionTeamModel.findByIdAndUpdate(
    id,
    { isDeleted: false },
    { new: true }
  );
  return restored ? restored.toObject() : null;
};

// ✅ Block
const blockActionTeamById = async (id: string): Promise<IActionteam | null> => {
  const blocked = await ActionTeamModel.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true }
  );
  return blocked ? blocked.toObject() : null;
};

// ✅ Unblock
const unblockActionTeamById = async (id: string): Promise<IActionteam | null> => {
  const unblocked = await ActionTeamModel.findByIdAndUpdate(
    id,
    { isBlocked: false },
    { new: true }
  );
  return unblocked ? unblocked.toObject() : null;
};

// ✅ Live search (teamName, teamAddress)
const liveSearchActionTeam = async (keyword: string): Promise<IActionteam[]> => {
  const results = await ActionTeamModel.find({
    $or: [
      { teamName: { $regex: keyword, $options: "i" } },
      { teamAddress: { $regex: keyword, $options: "i" } },
    ],
    isDeleted: false,
  });
  return results.map((s) => s.toObject());
};

// ✅ Search by isDeleted
const searchActionTeamByDeleted = async (isDeleted: boolean): Promise<IActionteam[]> => {
  const results = await ActionTeamModel.find({ isDeleted });
  return results.map((s) => s.toObject());
};

// ✅ Search by isBlocked
const searchActionTeamByBlocked = async (isBlocked: boolean): Promise<IActionteam[]> => {
  const results = await ActionTeamModel.find({ isBlocked, isDeleted: false });
  return results.map((s) => s.toObject());
};

// ✅ Search by userId
const searchActionTeamByUserId = async (userId: string): Promise<IActionteam | null> => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid userId");
  }

  const team = await ActionTeamModel.findOne({ userId, isDeleted: false });
  return team ? team.toObject() : null;
};


export const ActionTeamServices = {
  createActionTeamDB,
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
