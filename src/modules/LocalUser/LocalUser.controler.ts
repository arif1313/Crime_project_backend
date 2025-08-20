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

export const LocalUserControler={
    createLocalUser,
    getLocalUserById,
    updateLocalUser,
    softDeleteLocalUser,
    restoreLocalUser
}