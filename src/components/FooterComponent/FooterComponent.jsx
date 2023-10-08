import React from "react";
import 'bootstrap/dist/css/bootstrap.css';


const FooterComponent = () => {
    return(
        <>
            <footer className="w-100 z-2"
            style={{background:'#f7f7f6', display:'flex', justifyContent:'space-between', color:'#757575', padding:'6px 16px'}}>
                <span style={{fontSize:'14px', fontWeight:'700'}}><span style={{fontSize:'9px'}}>©</span>2021</span>
                <span style={{fontSize:'14px', fontWeight:'700'}}>Phiên bản 1.0.0</span>
            </footer>
        </>
    )
}

export default FooterComponent