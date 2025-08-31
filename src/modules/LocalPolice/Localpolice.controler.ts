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



// const getallLocalPolice= async (req: Request, res: Response) => {

//     try{

//     const result = await localPoliceServices.getallLocalPoliceDB
//     res.status(200).json({
//       success: true,
//       message: "localpolices retrieved successfully",
//       data: result,
//     });
//     }catch(err){
 
//   console.log(err)
//     }
// }

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
      message: "localPolice retrieved successfully",
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
// Soft delete
const softDeleteLocalPolice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ success: false, message: "User ID required" });

    const result = await localPoliceServices.softDeleteLocalPoliceById(userId);
    if (!result) return res.status(404).json({ success: false, message: "User not found" });

   
    res.status(200).json({ success: true, message: "Soft deleted successfully", data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to soft delete" });
  }
};

// Restore
const restoreLocalPolice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const restored = await localPoliceServices.restoreLocalPoliceById(userId);
    if (!restored) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, message: "Restored successfully", data: restored });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to restore" });
  }
};


// 🔎 Search by Status
const searchByStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    if (!status) return res.status(400).json({ success: false, message: "Status is required" });

    const results = await localPoliceServices.searchByStatus(status as string);
    res.status(200).json({ success: true, data: results });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Search by status failed" });
  }
};

// 🔎 Search by Contact Number
const searchByContactNumber = async (req: Request, res: Response) => {
  try {
    const { contactNumber } = req.query;
    if (!contactNumber) return res.status(400).json({ success: false, message: "Contact number is required" });

    const results = await localPoliceServices.searchByContactNumber(contactNumber as string);
    res.status(200).json({ success: true, data: results });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Search by contact number failed" });
  }
};

// 🔎 Search by isBlocked
const searchByIsBlocked = async (req: Request, res: Response) => {
  try {
    const { isBlocked } = req.query;
    if (isBlocked === undefined) return res.status(400).json({ success: false, message: "isBlocked is required" });

    const results = await localPoliceServices.searchByIsBlocked(isBlocked === "true");
    res.status(200).json({ success: true, data: results });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Search by isBlocked failed" });
  }
};

// 🔎 Search by isDeleted
const searchByIsDeleted = async (req: Request, res: Response) => {
  try {
    const { isDeleted } = req.query;
    if (isDeleted === undefined) return res.status(400).json({ success: false, message: "isDeleted is required" });

    const results = await localPoliceServices.searchByIsDeleted(isDeleted === "true");
    res.status(200).json({ success: true, data: results });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Search by isDeleted failed" });
  }
};


const liveSearchLocalPolice = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || q.toString().trim() === "") {
      return res.status(200).json({ success: true, data: [] });
    }

    const results = await localPoliceServices.liveSearchLocalPolice(q as string);

    res.status(200).json({
      success: true,
      message: "Live search results",
      data: results,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Live search failed" });
  }
};

export const LocalPoliceControler={
    createLocalPolice,
    getLocalPoliceById,
    updateLocalPolice,
    softDeleteLocalPolice,
    restoreLocalPolice,

    searchByStatus,
  searchByContactNumber,
  searchByIsBlocked,
  searchByIsDeleted,
  liveSearchLocalPolice
}