import express from "express"
import { centerPoliceControler } from "./CenterfPolis.controler"
const router= express.Router()
router.post('/create-centerPolice',centerPoliceControler.createCenterPolice)
// router.get('/',centerPoliceControler.getCenterPoliceById)
router.put("/update/:userId", centerPoliceControler.updateCenterPolice);
router.delete('/delete/:userId', centerPoliceControler.softDeleteCenterPolice);
router.patch("/restore/:userId", centerPoliceControler.restoreCenterPolice);
router.get("/search", centerPoliceControler.liveSearchCenterPolice);

router.get("/search/status", centerPoliceControler.searchByStatus);
// router.get("/search/contact", centerPoliceControler.searchByContactNumber);
router.get("/search/isBlocked", centerPoliceControler.searchByIsBlocked);
router.get("/search/isDeleted", centerPoliceControler.searchByIsDeleted);
export const centerPoliceRoutes=router
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
