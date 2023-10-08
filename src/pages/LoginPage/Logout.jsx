import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useLogRender } from "../../hook/useLogRender";
import { logoutAction } from "../../stores/auth";
import { useDispatch } from "react-redux";

const Logout = () => {
  useLogRender("Logout");
  const dispatch = useDispatch();
  dispatch(logoutAction());
  return <Navigate to="/" />;
};
export default Logout;
