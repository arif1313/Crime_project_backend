import { Request, Response } from "express";
import { LocalUserServices } from "./LocalUser.service";
const createLocalUser= async(req:Request, res:Response)=>{

   try{
   const localUserData = req.body.localuser;;
    const result= await LocalUserServices.createLocalUserDB(localUserData)
    res.status(200).json({
        success:true,
        massege:'localUser Create succesfully',
        data:result
    })
   }catch(err){
    console.log(err)

   }
}



    const getLocalUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    let result;
    if (userId) {
      result = await LocalUserServices.findByLocalUserId(userId as string);
    } else {
      result = await LocalUserServices.getallLocalUserDB();
    }

    res.status(200).json({
      success: true,
      message: "Localuser retrieved successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
   
  }
};

const updateLocalUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "localuser ID is required" });
    }

    const updatedlocaluser = await LocalUserServices.updateLocalUserById(userId, updateData);

    if (!updatedlocaluser) {
      return res.status(404).json({ success: false, message: "localuser not found" });
    }

    res.status(200).json({
      success: true,
      message: "localuser updated successfully",
      data: updatedlocaluser,
    });
  } catch (err) {
   console.log(err)
  }
};
const softDeleteLocalUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const deletedUser = await LocalUserServices.softDeleteLocalUserById(userId);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "Local user not found" });
    }

    res.status(200).json({
      success: true,
      message: "Local user soft deleted successfully",
      data: deletedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to soft delete local user" });
  }
};

// Restore
const restoreLocalUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const restoredUser = await LocalUserServices.restoreLocalUserById(userId);

    if (!restoredUser) {
      return res.status(404).json({ success: false, message: "Local user not found" });
    }

    res.status(200).json({
      success: true,
      message: "Local user restored successfully",
      data: restoredUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to restore local user" });
  }
};



const searchByRole = async (req: Request, res: Response) => {
  try {
    const { role } = req.params;
    const result = await LocalUserServices.searchByRole(role);
    res.status(200).json({ success: true, message: "Users by role", data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to search by role" });
  }
};

const searchByStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.params;
    const result = await LocalUserServices.searchByStatus(status);
    res.status(200).json({ success: true, message: "Users by status", data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to search by status" });
  }
};

const searchByIsDeleted = async (req: Request, res: Response) => {
  try {
    const { isDeleted } = req.params;
    const result = await LocalUserServices.searchByIsDeleted(isDeleted === "true");
    res.status(200).json({ success: true, message: "Users by isDeleted", data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to search by isDeleted" });
  }
};

const searchByIsBlocked = async (req: Request, res: Response) => {
  try {
    const { isBlocked } = req.params;
    const result = await LocalUserServices.searchByIsBlocked(isBlocked === "true");
    res.status(200).json({ success: true, message: "Users by isBlocked", data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to search by isBlocked" });
  }
};


const searchByContactNumber = async (req: Request, res: Response) => {
  try {
    const { contactNumber } = req.params;

    const result = await LocalUserServices.searchByContactNumber(contactNumber);

    if (!result || result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No user found with this contact number",
      });
    }

    res.status(200).json({
      success: true,
      message: "Users retrieved by contact number successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to search users by contact number",
    });
  }
};

const combinedLiveSearch = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.params;
    const result = await LocalUserServices.combinedLiveSearch(searchTerm);

    if (!result || result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found matching this search",
      });
    }

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully by live search",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to perform live search",
    });
  }
};
export const LocalUserControler={
    createLocalUser,
    getLocalUserById,
    updateLocalUser,
    softDeleteLocalUser,
    restoreLocalUser,
      searchByRole,
  searchByStatus,
  searchByIsDeleted,
  searchByIsBlocked,
  searchByContactNumber,
  combinedLiveSearch
}