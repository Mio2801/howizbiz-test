import { GuestOnlyRoute, PrivateRoute } from "./privateRoute";
import PageLoading from "../pages/loading";
import { useSelector } from "react-redux";

const WrapperRouteComponent = ({ auth, guest, element, ...props }) => {
  const { loadingInfo } = useSelector((state) => state.auth);
  if (loadingInfo) {
    return <PageLoading />;
  }
  if (guest) return <GuestOnlyRoute {...props} element={element} />;
  if (auth) return <PrivateRoute {...props} element={element} />;
  return element;
};

export default WrapperRouteComponent;
