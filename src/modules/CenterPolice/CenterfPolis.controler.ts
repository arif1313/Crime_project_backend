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



    const getCenterPoliceById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    let result;
    if (userId) {
      result = await centerPoliceServices.findByCenterPoliceId(userId as string);
    } else {
      result = await centerPoliceServices.getalcenterPoliceDB()
    }

    res.status(200).json({
      success: true,
      message: "centerPolice retrieved successfully",
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
const softDeleteCenterPolice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const deletedUser = await centerPoliceServices.softdeletecenterPoliceById(userId);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "centerPolice not found" });
    }

    res.status(200).json({
      success: true,
      message: "centerPolice soft deleted successfully",
      data: deletedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to soft delete centerPolice" });
  }
};

// Restore
const restoreCenterPolice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const restoredUser = await centerPoliceServices.restorecenterPoliceById(userId);

    if (!restoredUser) {
      return res.status(404).json({ success: false, message: "centerPolice not found" });
    }

    res.status(200).json({
      success: true,
      message: "centerPolice restored successfully",
      data: restoredUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to restore centerPolice" });
  }
};

const liveSearchCenterPolice = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || q.toString().trim() === "") {
      return res.status(200).json({ success: true, data: [] });
    }

    const results = await centerPoliceServices.liveSearchCenterPolice(q as string);

    res.status(200).json({
      success: true,
      message: "Search results",
      data: results,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Search failed" });
  }
};

// 🔹 Search by Status
const searchByStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }

    const results = await centerPoliceServices.searchByStatus(status as string);
    res.status(200).json({ success: true, data: results });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Search by status failed" });
  }
};

// 🔹 Search by Contact Number
const searchByContactNumber = async (req: Request, res: Response) => {
  try {
    const { contactNumber } = req.query;
    if (!contactNumber) {
      return res.status(400).json({ success: false, message: "Contact number is required" });
    }

    const results = await centerPoliceServices.searchByContactNumber(contactNumber as string);
    res.status(200).json({ success: true, data: results });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Search by contact number failed" });
  }
};

// 🔹 Search by isBlocked
const searchByIsBlocked = async (req: Request, res: Response) => {
  try {
    const { isBlocked } = req.query;
    if (isBlocked === undefined) {
      return res.status(400).json({ success: false, message: "isBlocked is required" });
    }

    const results = await centerPoliceServices.searchByIsBlocked(isBlocked === "true");
    res.status(200).json({ success: true, data: results });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Search by isBlocked failed" });
  }
};

// 🔹 Search by isDeleted
const searchByIsDeleted = async (req: Request, res: Response) => {
  try {
    const { isDeleted } = req.query;
    if (isDeleted === undefined) {
      return res.status(400).json({ success: false, message: "isDeleted is required" });
    }

    const results = await centerPoliceServices.searchByIsDeleted(isDeleted === "true");
    res.status(200).json({ success: true, data: results });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Search by isDeleted failed" });
  }
};

export const centerPoliceControler={
    createCenterPolice,
    updateCenterPolice,
    softDeleteCenterPolice,
    getCenterPoliceById,
    restoreCenterPolice,
    liveSearchCenterPolice,
    searchByIsDeleted,
    searchByIsBlocked,
    searchByContactNumber,
    searchByStatus
}