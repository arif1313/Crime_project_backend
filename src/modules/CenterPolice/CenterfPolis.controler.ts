import { Request, Response } from "express";
import { centerPoliceServices } from "./Centerpolice.service";

const createCenterPolice= async(req:Request, res:Response)=>{

   try{
     const centerPoliceData=req.body.centerPolice
    const result= await centerPoliceServices.createcenterPoliceDB(centerPoliceData)
    res.status(200).json({
        success:true,
        massege:'centerPolice Create succesfully',
        data:result
    })
   }catch(err){
    console.log(err)

   }
}

const getallCenterPolice= async (req: Request, res: Response) => {

    try{

    const result = await centerPoliceServices.getalcenterPoliceDB
    res.status(200).json({
      success: true,
      message: "center police retrieved successfully",
      data: result,
    });
    }catch(err){
 
  console.log(err)
    }
}

    const getCenterPoliceById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    let result;
    if (userId) {
      result = await centerPoliceServices.findByCenterPoliceId(userId as string);
    } else {
      result = await centerPoliceServices.getalcenterPoliceDB
    }

    res.status(200).json({
      success: true,
      message: " single centerPolice retrieved successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
   
  }
};

const updateCenterPolice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "Center police ID is required" });
    }

    const updatedCenterPolice = await centerPoliceServices.updateCenterpoliceById(userId, updateData);

    if (!updatedCenterPolice) {
      return res.status(404).json({ success: false, message: "Center police not found" });
    }

    res.status(200).json({
      success: true,
      message: "Center Police updated successfully",
      data: updatedCenterPolice,
    });
  } catch (err) {
   console.log(err)
  }
};
const deleteLocalPolice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, message: "center police ID is required" });
    }

    const deletedCenterpolice = await centerPoliceServices.deletecenterPoliceById(userId);
    const result= await centerPoliceServices.getalcenterPoliceDB
    if (!deletedCenterpolice) {
      return res.status(404).json({ success: false, message: "center police not found" });
    }

    res.status(200).json({
      success: true,
      message: "center police deleted successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to delete center police" });
  }
};
export const centerPoliceControler={
    createCenterPolice,
    updateCenterPolice,deleteLocalPolice,getCenterPoliceById,getallCenterPolice
}