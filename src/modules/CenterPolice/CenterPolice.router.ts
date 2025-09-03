// src/modules/CenterPolice/CenterPolice.routes.ts
import { Router } from "express";
import { CenterPoliceControllers } from "./CenterfPolis.controler";


const router = Router();
router.get("/search/live", CenterPoliceControllers.liveSearchCenterPoliceController);
router.get("/search/deleted", CenterPoliceControllers.searchCenterPoliceByDeletedController); // ✅
router.get("/search/blocked", CenterPoliceControllers.searchCenterPoliceByBlockedController); // ✅
router.post("/create", CenterPoliceControllers.createCenterPoliceController);
router.get("/search", CenterPoliceControllers.getAllCenterPoliceController);
router.get("/search/:id", CenterPoliceControllers.getCenterPoliceController);
router.put("/update/:id", CenterPoliceControllers.updateCenterPoliceController);
router.delete("/delete/:id", CenterPoliceControllers.softDeleteCenterPoliceController);
router.patch("/restore/:id", CenterPoliceControllers.restoreCenterPoliceController);
router.patch("/block/:id", CenterPoliceControllers.blockCenterPoliceController);
router.patch("/unblock/:id", CenterPoliceControllers.unblockCenterPoliceController);

export const CenterPoliceRoutes = router;

// fonted
// import { useState } from "react";

// function LiveSearch() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);

//   const handleSearch = async (value: string) => {
//     setQuery(value);

//     if (value.trim() === "") {
//       setResults([]);
//       return;
//     }

//     const res = await fetch(`/api/centerPolice/search?q=${value}`);
//     const data = await res.json();
//     setResults(data.data);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => handleSearch(e.target.value)}
//         placeholder="Search center police..."
//       />

//       <ul>
//         {results.map((item: any) => (
//           <li key={item._id}>
//             {item.centerStationName} - {item.centerStationAddress}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default LiveSearch;
