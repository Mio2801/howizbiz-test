import React, { useState } from "react"
import logo from '../../img/logo.png'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import { authUser } from "../../stores/auth"
import { useLogRender } from "../../hook/useLogRender"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import 'bootstrap/dist/css/bootstrap.css';
import "./style.scss"
import styled from "styled-components"

const Navbar = styled(Link)`
    color: #757575;
    text-decoration: none;
`;


const HeaderComponent = () => {
    const user = useSelector(authUser);
    useLogRender("Layout-Header"); 
    const [show,setShow] = useState(true);

	const navbarClick = () => {
		setShow(!show);
	}
    
    return (
        <>
        <div className="head position-fixed w-100 z-2">
                <div style={{display:'flex'}}>
                    <Navbar className="head_btn" onClick={navbarClick} to={`?elementHidden=${show}`} >
                        <FontAwesomeIcon icon="fa-solid fa-bars" />
                    </Navbar>
                    <img src={logo} style={{height:'40px', paddingRight:'20px'}} alt="logo" />
                    <div style={{display:'flex', alignItems:'center', width:'100%'}}>
                        <h4 className="title_header">HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM ĐƯỢC ƯU TIÊN BẢO VỆ</h4>
                    </div>
                </div>
                <div className="user_pf d-flex">
                    <div className="user_pfp"><b> {user.name.slice(0, 1)} </b></div>
                    <div className="d-flex align-items-center">
                        <Link className="user_name" to='/logout'>{user.name}</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderComponent