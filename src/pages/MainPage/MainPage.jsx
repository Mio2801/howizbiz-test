import React, { memo } from "react"
import { useSelector } from "react-redux"
import { authUser } from "../../stores/auth"
import { useLogRender } from "../../hook/useLogRender"
import AnimalManagerPage from "../AnimalManagerPage/AnimalManagerPage"
import 'bootstrap/dist/css/bootstrap.css';
import Login from '../LoginPage/LoginPage.jsx';

const MainPage = memo(() => {

    const user = useSelector(authUser);
    useLogRender("Layout-Header");  
    let content = null;
    if (user && user.id) {
      content = (
        <>
          <AnimalManagerPage />
        </>
      );
    } else {
      content = (
        <>
          <Login />
        </>
      );
    }


    return (
        <>
        {content}
        </>
    )
})

export default MainPage