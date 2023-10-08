import { Outlet } from "react-router-dom";
import { memo } from "react";
//import HeaderComponent from "../HeaderComponent/HeaderComponent";
const DefaultLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default memo(DefaultLayout);




// import React from "react"

// const SearchPage = () => {
//     return(
//         <div>
//             ggthyjjgjjguzvsdg
//         </div>
//     )
// }

// export default SearchPage