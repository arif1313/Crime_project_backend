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


const getallLocalUser= async (req: Request, res: Response) => {

    try{

    const result = await LocalUserServices.getallLocalUserDB
    res.status(200).json({
      success: true,
      message: "localUser retrieved successfully",
      data: result,
    });
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
      message: " single user retrieved successfully",
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
const deleteLocalUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, message: "localuser ID is required" });
    }

    const deletedlocalusr = await LocalUserServices.deleteLocalUserById(userId);
    const result= await LocalUserServices.getallLocalUserDB()
    if (!deletedlocalusr) {
      return res.status(404).json({ success: false, message: "localuser not found" });
    }

    res.status(200).json({
      success: true,
      message: "localusr deleted successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to delete localuser" });
  }
};
export const LocalUserControler={
    createLocalUser,getallLocalUser,getLocalUserById,updateLocalUser,deleteLocalUser
}