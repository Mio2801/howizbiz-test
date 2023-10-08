import { useRoutes, Outlet } from 'react-router-dom';
import WrapperRouteComponent from "./config";
import Logout from '../pages/LoginPage/Logout.jsx';
import MainPage from '../pages/MainPage/MainPage.jsx';
import DefaultLayout from '../components/DefaultComponent/DefaultLayout.jsx';
import CreateNew from '../pages/AnimalManagerPage/CreateNew.jsx';
import UpdateNew from '../pages/AnimalManagerPage/UpdateNew.jsx';

const routeList = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <MainPage />,
      },
      {
        path: "/",
        element: <WrapperRouteComponent element={<Outlet />} auth />,
        children: [
          {
            path: "",
            element: <MainPage />,
          },
          {
            path: "logout",
            element: <Logout />,
          },
          {
            path: "create",
            element: <CreateNew />,
          },
          {
            path:"update/:id",
            element: <UpdateNew />,
          },
        ],
      },
    ],
  },
];

const RenderRouter = () => {
    const element = useRoutes(routeList);
  
    return element;
  };
  
  export default RenderRouter;