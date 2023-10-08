import React, { useEffect, useState, useRef } from "react"
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent"
import 'bootstrap/dist/css/bootstrap.css';
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './AnimalManagerStyle.scss'
import PageLoading from '../loading';
import { useDispatch, useSelector } from 'react-redux';
import RenderTable from "./RenderTable";
import { getSpeciesAction } from "../../stores/species/actionSpecies";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Layout } from 'antd';
const { Sider } = Layout;

const AnimalManagerPage = () => {
    const { loading, pagination } = useSelector(state => state.species);
	const [searchInput, setsearchInput] = useState('');
	const dispatch = useDispatch();
	const [show,setShow] = useState(false);
	const location = useLocation();
	const main = useRef(null);


	useEffect(() => {
		dispatch(getSpeciesAction({
			page: 1,
			itemsPerPage: 10,
			search: "",
		}))
	}, [dispatch])
	
	const handleSearchChange = (event) => {
		setsearchInput(event.target.value);
		dispatch(getSpeciesAction({
			page: 1,
			itemsPerPage: pagination.itemsPerPage,
			search: event.target.value,
		}));
	}

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const elementHidden = searchParams.get('elementHidden');
		if (elementHidden === 'true') {
			setShow(true); 
		} else {
			setShow(false); 
		}
	  }, [location.search]);

    return(
        <>
			<div style={{height:'60px',}}>
				<HeaderComponent />
			</div>
            <div className="middle_page d-flex">
				<Layout>
					<Sider trigger={null} collapsible collapsed={show} style={{background:'#fff', boxShadow: '0px 0px 5px 3px lightgray'}}>
						<NavbarComponent />
					</Sider>
				</Layout>
                <div ref={main} className="form_species" style={{ width: '100%', transition: 'margin-left 0.2s ease-in-out'}}>
					<div className=''>
						<div className='d-flex align-items-center w-100 pb-4'>
							<div className='icon_animal'>
                                <FontAwesomeIcon icon="fa-solid fa-otter" style={{color: "rgb(218,42,28)",}} />
                            </div>
							<div style={{paddingLeft:'8px', fontSize:'20px'}}><b>Loài nguy cấp quý hiếm</b></div>
						</div>
                        <div className="d-flex justify-content-between" style={{maxWidth:'100%'}}>
                            <div className="search_bar">
                                <FontAwesomeIcon className="pt-1" icon="fa-solid fa-magnifying-glass" style={{color: "#494d55", marginTop:'9px', position:'absolute', marginLeft:'12px'}} />
                                <input 
									type="search" 
									placeholder="Tìm kiếm theo tên" 
									id="search_bar" 
									onChange={handleSearchChange}
									value={searchInput}
								/>
                            </div>
                            <Link className="add_btn bg-danger" style={{minWidth:'18px'}} to='/create'>+ Thêm mới</Link>
                        </div>
                        <div className='tableCustom2'>
							<div className='table_render table-responsive'>
								{loading && <PageLoading />}
								<table className="table table-hover">
									<thead>
										<tr>
											<th className='text-start'>Tên</th>
											<th className='text-start'>Tên khoa học</th>
											<th className='text-start'>Giới</th>
											<th className='text-start'>Ngành</th>
											<th className='text-start'>Lớp</th>
											<th className='text-start'>Bộ</th>
											<th className='text-start'>Họ</th>
											<th className='text-start'>Chi</th>
											<th className='text-center' style={{fontSize :'10px', minWidth:'100px'}}>Hành động</th>
										</tr>
									</thead>
									<RenderTable />
								</table>
							</div>
						</div>
						<Pagination searchInput={searchInput} />
					</div>
                </div>
            </div>
			<div className="w-100 z-3 position-fixed" style={{height:'33px'}}>
				<FooterComponent />
			</div>
        </>
    )
}

export default AnimalManagerPage
