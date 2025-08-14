import { Request, Response } from "express";
import { localPoliceServices } from "./LocalPolice.service";


const createLocalPolice= async(req:Request, res:Response)=>{

   try{
     const LocalPoliceData=req.body.localpolice
    const result= await localPoliceServices.createLocalPoliceDB(LocalPoliceData)
    res.status(200).json({
        success:true,
        massege:'LocalPolice Create succesfully',
        data:result
    })
   }catch(err){
    console.log(err)

   }
}



const getallLocalPolice= async (req: Request, res: Response) => {

    try{

    const result = await localPoliceServices.getallLocalPoliceDB
    res.status(200).json({
      success: true,
      message: "localUser retrieved successfully",
      data: result,
    });
    }catch(err){
 
  console.log(err)
    }
}

    const getLocalPoliceById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    let result;
    if (userId) {
      result = await localPoliceServices.findByLocalPoliceId(userId as string);
    } else {
      result = await localPoliceServices.getallLocalPoliceDB();
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

const updateLocalPolice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "localPolice ID is required" });
    }

    const updatedlocalPolice = await localPoliceServices.updateLocalpoliceById(userId, updateData);

    if (!updatedlocalPolice) {
      return res.status(404).json({ success: false, message: "localPolice not found" });
    }

    res.status(200).json({
      success: true,
      message: "localuser updated successfully",
      data: updatedlocalPolice,
    });
  } catch (err) {
   console.log(err)
  }
};
const deleteLocalPolice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, message: "localpolice ID is required" });
    }

    const deletedlocalusr = await localPoliceServices.deleteLocalPoliceById(userId);
    const result= await localPoliceServices.getallLocalPoliceDB()
    if (!deletedlocalusr) {
      return res.status(404).json({ success: false, message: "localuser not found" });
    }

    res.status(200).json({
      success: true,
      message: "localpolice deleted successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to delete localpolice" });
  }
};
export const LocalPoliceControler={
    createLocalPolice,getallLocalPolice,getLocalPoliceById,updateLocalPolice,deleteLocalPolice
}