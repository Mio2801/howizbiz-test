import React from "react"
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent"
import FooterComponent from "../../components/FooterComponent/FooterComponent"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { getRankAction, getSpeciesAction, createSpeciesAction } from "../../stores/species/actionSpecies"
import { useState } from "react"
import PageLoading from "../loading"
import validateForm from '../../hook/validateForm';
import 'bootstrap/dist/css/bootstrap.css';
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent"
import { useLocation } from 'react-router-dom';
import { Select, Space,  message, Layout } from 'antd';
const { Sider } = Layout;
    
    const CreateNew = (searchInput, kingdom_id, phylum_id, class_id, order_id, family_id, genus_id) => { 
        
        const dispatch = useDispatch();
        const [dataCreateSpecies, setDataCreateSpecies] = useState({});
        const [errors, setErrors] = useState({});
        const { pagination} = useSelector(state => state.species);
        const [show,setShow] = useState(false);
        const navigate = useNavigate();
        const location = useLocation();
        
        
        const {dataRank, loadingRank} = useSelector((state) => state.rank); //rank

        const [allKingdom, setKingdom] = useState();

        const [allPhylum, setPhylum] = useState();
        
        const [allClass, setClass] = useState();
        
        const [allOrder, setOrder] = useState();
        
        const [allFamily, setFamily] = useState();
        
        const [allGenus, setGenus] = useState();
    
    useEffect(()=>{
        dispatch(getRankAction())
    },[dispatch, allKingdom, allPhylum, allClass, allOrder, allFamily, allGenus])

    useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const elementHidden = searchParams.get('elementHidden');
		if (elementHidden === 'true') {
			setShow(true); 
		} else {
			setShow(false); 
		}
	  }, [location.search]);

    const clearDataKingdom = () => {
		setKingdom();
		dispatch(getSpeciesAction({
			page: pagination.page,
			itemsPerPage: pagination.perpage,
			search: searchInput,
            kingdom_id: kingdom_id,
            phylum_id: phylum_id,
            class_id: class_id,
            order_id: order_id,
            family_id: family_id,
            genus_id: genus_id,
		}));
	}
    
    const clearDataPhylum = () => {
		setPhylum();
		dispatch(getSpeciesAction({
			page: pagination.page,
			itemsPerPage: pagination.perpage,
			search: searchInput,
            kingdom_id: kingdom_id,
            phylum_id: phylum_id,
            class_id: class_id,
            order_id: order_id,
            family_id: family_id,
            genus_id: genus_id,
		}));
	}

    const clearDataClass = () => {
		setClass();
		dispatch(getSpeciesAction({
			page: pagination.page,
			itemsPerPage: pagination.perpage,
			search: searchInput,
		}));
	}

    const clearDataOrder = () => {
		setOrder();
		dispatch(getSpeciesAction({
			page: pagination.page,
			itemsPerPage: pagination.perpage,
			search: searchInput,
            kingdom_id: kingdom_id,
            phylum_id: phylum_id,
            class_id: class_id,
            order_id: order_id,
            family_id: family_id,
            genus_id: genus_id,
		}));
	}

    const clearDataFamily = () => {
		setFamily();
		dispatch(getSpeciesAction({
			page: pagination.page,
			itemsPerPage: pagination.perpage,
			search: searchInput,
            kingdom_id: kingdom_id,
            phylum_id: phylum_id,
            class_id: class_id,
            order_id: order_id,
            family_id: family_id,
            genus_id: genus_id,
		}));
	}
    
    const clearDataGenus = () => {
		setGenus();
		dispatch(getSpeciesAction({
			page: pagination.page,
			itemsPerPage: pagination.perpage,
			search: searchInput,
            kingdom_id: kingdom_id,
            phylum_id: phylum_id,
            class_id: class_id,
            order_id: order_id,
            family_id: family_id,
            genus_id: genus_id,
		}));
	}
    const alertNoti=(
        <Space className='alertNotify'>
            Thêm mới dữ liệu thành công
        </Space>
        );

    //tạo mới
    const handleCreateSpecies = (event) => {
		let { id, value } = event.target;
		setDataCreateSpecies((pre) => ({ ...pre, [id]: value, }));
    }

    const handelCreateNewSpecies = async () => {
		const validationErrors = validateForm(dataCreateSpecies);
		if (validationErrors && 
            allKingdom !== undefined && 
            allPhylum !== undefined && 
            allClass !== undefined && 
            allOrder !== undefined && 
            allFamily !== undefined &&
            allGenus !== undefined) {
                dispatch(createSpeciesAction({ data: dataCreateSpecies, kingdom_id: allKingdom, phylum_id: allPhylum, class_id: allClass, order_id: allOrder, family_id: allFamily, genus_id: allGenus}))
                message.success({
                    content: alertNoti,
                    duration: 3, // Thời gian hiển thị (giây)
                });
                setErrors({});
            navigate("/")
		} 
        else {
            message.error({
                content: "thêm dữ liệu thất bại",
                duration: 3, // Thời gian hiển thị (giây)
              });
			setErrors(validationErrors);
		}
	} 

    const options = [{}];
    const options2 = [{}];
    const options3 = [{}];
    const options4 = [{}];
    const options5 = [{}];
       

    return(
        <>
        <div style={{height:'60px',}}>
            <HeaderComponent />
        </div>
        <div className="d-flex h-100 middle_page" >
            <Layout style={{width:'80px'}}>
                <Sider trigger={null} collapsible collapsed={show} style={{background:'#fff', boxShadow: '0px 0px 5px 3px lightgray', position:'fixed', height:'100%'}}>
                    <NavbarComponent />
                </Sider>
			</Layout>
            <div className="form_species" style={{ marginLeft: show ? '10px':'140px' ,width: '100%', transition: 'margin-left 0.1s ease-in-out'}}>
                <div className="d-flex pb-3">
                    <Link to='/'><FontAwesomeIcon className="back_up" icon="fa-solid fa-arrow-left" /></Link>
                    <h5 className="d-flex align-items-center m-0 ps-4"><b>THÔNG TIN VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM CẦN ĐƯỢC ƯU TIÊN BẢO VỆ</b></h5>
                </div>
                <div style={{width:'1000px'}}>
                    <h6>I.Thông tin chung về loài</h6>
                    <div className="form_info w-100">
                        <label htmlFor="">Tên <span className="required">*</span></label><br />
                        <input className="input_form" type="text" id='ten' placeholder="Tên" onChange={handleCreateSpecies} />
                        {errors.name !== "" && (<span className="error">{errors.name}</span>)}
                    </div>
                    <div className="d-flex w-80">
                        <div className="form_info w-50">
                            <label htmlFor="">Tên khoa học <span className="required">*</span></label><br />
                            <input className="input_form" type="text" id='ten_khoa_hoc' placeholder="Tên khoa học" onChange={handleCreateSpecies} />
                            {errors.science_name !== "" && (<span className="error">{errors.science_name}</span>)}
                        </div>
                        <div className="form_info w-50">
                            <label htmlFor="">Tên tác giả</label><br />
                            <input className="input_form" type="text" id='ten_tac_gia' placeholder="Tên tác giả" onChange={handleCreateSpecies} />
                        </div>
                    </div>
                    <div className="form_info w-100">
                        <label htmlFor="">Tên địa phương</label><br />
                        <input className="input_form" type="text" id='ten_dia_phuong' placeholder="Tên địa phương" onChange={handleCreateSpecies} />
                    </div>
                    <div className="form_info w-100">
                        <label htmlFor="">Nguồn dữ liệu</label><br />
                        <input className="input_form" type="text" id='nguon_du_lieu' placeholder="Nguồn dữ liệu" onChange={handleCreateSpecies} />
                    </div>
                </div>
                <div className="w-100 pt-3">

                    <div className="d-flex">
                        <h6>II.Phân loại học</h6>
                        <FontAwesomeIcon icon="fa-solid fa-plus" style={{
                            color: "#ffffff", 
                            background:'#f44336', 
                            marginLeft:'12px', 
                            width:'20px', 
                            height:'20px',
                            borderRadius:'50%',
                            padding:'8px',
                            fontSize:'18px'
                        }} />
                    </div>
                    <div className="d-flex">
                        <div className="form_info w-50 mb-4">
                            <div className="d-flex justify-content-between">
                                    <label htmlFor="">Giới <span className="required">*</span></label>
                                    <FontAwesomeIcon 
                                    icon="fa-solid fa-xmark" 
                                    className="clearDataSelected" 
                                    style={{color: "#e51515", }} 
                                    onClick={clearDataKingdom} 
                                    />
                                </div><br />
                            <Select
                                id="kingdom"
                                showSearch
                                style={{
                                width:'100%', height:'41px'
                                }}
                                placeholder="Giới"
                                value={allKingdom} 
                                optionFilterProp={Select.Option}
                                onChange={(e) =>{
                                    setKingdom(e)
                                    setPhylum()
                                    setClass()
                                    setOrder()
                                    setFamily()
                                    setGenus()
                                }} required
                            >
                                {dataRank && dataRank.map((item) => {
                                    if (item.rank==='Kingdom') {
                                        return (
                                            <option className='dataType' key={item.id} value={item.uuid}>{item.ten_khoa_hoc} - {item.ten}</option>
                                        )
                                    }                                
                                })}
                            </Select>
                            {errors.gioi !== undefined && (<span className="error">{errors.gioi}</span>)}
                        </div>

                        <div className="form_info w-50">
                            <div className="d-flex justify-content-between">
                                    <label htmlFor="">Ngành <span className="required">*</span></label>
                                    <FontAwesomeIcon 
                                    icon="fa-solid fa-xmark" 
                                    className="clearDataSelected" 
                                    style={{color: "#e51515",}} 
                                    onClick={clearDataPhylum} 
                                    />
                                </div><br />
                            <Select
                                id="phylum"
                                showSearch
                                style={{
                                width:'100%',height:'41px'
                                }}
                                placeholder="Ngành"
                                value={allPhylum} 
                                optionFilterProp={Select.Option}
                                options={options}
                                filterOption={(input, option) => (option?.label?? '').includes(input)}
                                onChange={(e) =>{
                                    setPhylum(e)
                                    setClass()
                                    setOrder()
                                    setFamily()
                                    setGenus()
                                }} required
                            >
                                {dataRank && dataRank.map((item) => {
                                    if (item.rank==='Phylum' && item.parent_id===allKingdom) {
                                        // return (
                                        //     <option className='dataType' value={item.uuid}>{item.ten_khoa_hoc} - {item.ten}</option>
                                        // )
                                        options.push({
                                            value: item.uuid,
                                            label: item.ten_khoa_hoc+' - '+item.ten,
                                            key: item.id,
                                        })
                                    }                                
                                })}
                            </Select>
                            {errors.nganh !== undefined && (<span className="error">{errors.nganh}</span>)}
                        </div>

                        <div className="form_info w-50">
                            <div className="d-flex justify-content-between">
                                    <label htmlFor="">Lớp <span className="required">*</span></label>
                                    <FontAwesomeIcon 
                                    icon="fa-solid fa-xmark" 
                                    className="clearDataSelected" 
                                    style={{color: "#e51515", }} 
                                    onClick={clearDataClass} 
                                    />
                                </div><br />
                            <Select
                                id="class"
                                showSearch
                                style={{
                                width:'100%',height:'41px'
                                }}
                                placeholder="Lớp"
                                value={allClass} 
                                optionFilterProp={Select.Option}
                                options={options2}
                                filterOption={(input, option) => (option?.label?? '').includes(input)}
                                onChange={(e) => {
                                    setClass(e)
                                    setOrder()
                                    setFamily()
                                    setGenus()
                                }} required
                            >
                                {dataRank && dataRank.map((item) => {
                                    if (item.rank==='Class' && item.parent_id===allPhylum) {
                                        options2.push({
                                            value: item.uuid,
                                            label: item.ten_khoa_hoc+' - '+item.ten,
                                            key: item.id,
                                        })
                                    }                                
                                })}
                            </Select>
                            {errors.lop !== undefined && (<span className="error">{errors.lop}</span>)}
                        </div>
                    </div>
                    <div className="d-flex">

                        <div className="form_info w-50">
                            <div className="d-flex justify-content-between">
                                    <label htmlFor="">Bộ <span className="required">*</span></label>
                                    <FontAwesomeIcon 
                                    icon="fa-solid fa-xmark" 
                                    className="clearDataSelected" 
                                    style={{color: "#e51515", }} 
                                    onClick={clearDataOrder} 
                                    />
                                </div><br />
                            <Select
                                id="order"
                                showSearch
                                style={{
                                width:'100%',height:'41px'
                                }}
                                placeholder="Bộ"
                                value={allOrder} 
                                optionFilterProp={Select.Option}
                                options={options3}
                                filterOption={(input, option) => (option?.label?? '').includes(input)}
                                onChange={(e) => {
                                    setOrder(e)
                                    setFamily()
                                    setGenus()
                                }} required
                            >
                                {dataRank && dataRank.map((item) => {
                                    if (item.rank==='Order' && item.parent_id===allClass) {
                                        options3.push({
                                            value: item.uuid,
                                            label: item.ten_khoa_hoc+' - '+item.ten,
                                            key: item.id,
                                        })
                                    }                                
                                })}
                            </Select>
                            {errors.bo !== undefined && (<span className="error">{errors.bo}</span>)}
                        </div>

                        <div className="form_info w-50">
                            <div className="d-flex justify-content-between">
                                    <label htmlFor="">Họ <span className="required">*</span></label>
                                    <FontAwesomeIcon 
                                    icon="fa-solid fa-xmark" 
                                    className="clearDataSelected" 
                                    style={{color: "#e51515", }} 
                                    onClick={clearDataFamily} 
                                    />
                                </div><br />
                            <Select
                                id="family"
                                showSearch
                                style={{
                                width:'100%',height:'41px'
                                }}
                                placeholder="Họ"
                                value={allFamily} 
                                optionFilterProp={Select.Option}
                                options={options4}
                                filterOption={(input, option) => (option?.label?? '').includes(input)}
                                onChange={(e) => {
                                    setFamily(e)
                                    setGenus()
                                }} required
                            >
                                {dataRank && dataRank.map((item) => {
                                    if (item.rank==='Family' && item.parent_id===allOrder) {
                                        options4.push({
                                            value: item.uuid,
                                            label: item.ten_khoa_hoc+' - '+item.ten,
                                            key: item.id,
                                        })
                                    }                                
                                })}
                            </Select>
                            {errors.ho !== undefined && (<span className="error">{errors.ho}</span>)}
                        </div>

                        <div className="form_info w-50">
                            <div className="d-flex justify-content-between">
                                    <label htmlFor="">Chi <span className="required">*</span></label>
                                    <FontAwesomeIcon 
                                    icon="fa-solid fa-xmark" 
                                    className="clearDataSelected" 
                                    style={{color: "#e51515", }} 
                                    onClick={clearDataGenus} 
                                    />
                                </div><br />
                            <Select
                                id="genus"
                                showSearch
                                style={{
                                width:'100%',height:'41px'
                                }}
                                placeholder="Chi"
                                value={allGenus} 
                                optionFilterProp={Select.Option}
                                options={options5}
                                filterOption={(input, option) => (option?.label?? '').includes(input)}
                                onChange={(e) => setGenus(e)} required
                            >
                                {dataRank && dataRank.map((item) => {
                                    if (item.rank==='Genus' && item.parent_id===allFamily) {
                                        options5.push({
                                            value: item.uuid,
                                            label: item.ten_khoa_hoc+' - '+item.ten,
                                            key: item.id,
                                        })
                                    }                                
                                })}
                            </Select>
                            {errors.chi !== undefined && (<span className="error">{errors.chi}</span>)}
                        </div>
                    </div>
                    <div className="pt-4">
                        <h6>III.Đặc điểm nhận dạng</h6>
                        <div>
                            <h6>Hình ảnh minh họa</h6>
                                <label for='upload' className="img_layout mt-4">
                                    <FontAwesomeIcon icon="fa-solid fa-plus" style={{color: "#757575",}} />
                                    <input id="upload" type="file" hidden='hidden' />
                                </label>
                        </div>
                    </div>
                </div>
                <button className='submit_btn' onClick={handelCreateNewSpecies}>Thêm mới</button>
            </div>
        </div>
        <div className="z-2 position-fixed w-100" style={{height:'33px'}}>
            <FooterComponent />
        </div>
        </>
    )
}

export default CreateNew