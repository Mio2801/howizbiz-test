import { styled } from "styled-components";

export const MenuNavbar = styled.div`
    display: flex;
    cursor: pointer;
    padding: 12px;
    box-shadow: '0 5px 10px lightgray';
    &:active{
        background-color: #f2f6f9;
    }
`

export const MenuNavbarTitle = styled.h2`
    margin: 5px 0 0 0;
    font-size: 13px;
    padding: 0 23px; 
    color: #757575;  
`
