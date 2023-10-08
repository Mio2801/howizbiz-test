import React from "react"
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent"
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { UpdateSpeciesAction, getRankAction, getSpeciesAction } from "../../stores/species/actionSpecies";
import validateForm from '../../hook/validateForm';
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import { ApiGetSpecies } from "../../api/auth/auth.api";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { Select, Space, message, Layout } from 'antd';
const { Sider } = Layout;


const Update = (searchInput) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();    
    const { pagination } = useSelector(state => state.species);
    const [show,setShow] = useState(false);
    const location = useLocation();
    
    const [dataUpdate, setDataUpdate] = useState(null);
    const [errors, setErrors] = useState({});
    const { id } = useParams();    
    const updating = id;
    // const filteredItems = list.filter(item => item.id === updating);         
    
    const {dataRank, loadingRank} = useSelector((state) => state.rank); //rank
    
    const [allKingdom, setKingdom] = useState(dataUpdate?.kingdom_id);
    
    const clearDataKingdom = () => {
		setKingdom();
	}

    const [allPhylum, setPhylum] = useState(dataUpdate?.phylum_id);
    
    const clearDataPhylum = () => {
		setPhylum();
        }
        
    const [allClass, setClass] = useState(dataUpdate?.class_id);
 
    const clearDataClass = () => {
		setClass();
	}
    
    const [allOrder, setOrder] = useState(dataUpdate?.order_id);
 
    const clearDataOrder = () => {
		setOrder();
	}
    
    const [allFamily, setFamily] = useState(dataUpdate?.family_id);
 
    const clearDataFamily = () => {
		setFamily();
	}
    
    const [allGenus, setGenus] = useState(dataUpdate?.genus_id);
 
    const clearDataGenus = () => {
		setGenus();
	}

    const alertNoti=(
        <Space className='alertNotify'>
            Cập nhật dữ liệu thành công
        </Space>
        );

    useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const elementHidden = searchParams.get('elementHidden');
		if (elementHidden === 'true') {
			setShow(true); 
		} else {
			setShow(false); 
		}
	  }, [location.search]);

    useEffect(()=>{
        const callAPI = async ()=>{
            const data = await ApiGetSpecies(updating);
            console.log('data',data);
            
            setDataUpdate({
                ten: data.ten,
                ten_khoa_hoc: data.ten_khoa_hoc,
                ten_tac_gia: data.ten_tac_gia,
                ten_dia_phuong: data.ten_dia_phuong,
                nguon_du_lieu: data.nguon_du_lieu,
                kingdom_id: data.kingdom_id,
                phylum_id: data.phylum_id,
                class_id: data.class_id,
                order_id: data.order_id,
                family_id: data.family_id,
                genus_id: data.genus_id,
                img: data.attachments[0],
            }) 
        }
        setKingdom(dataUpdate?.kingdom_id);
        setPhylum(dataUpdate?.phylum_id);
        setClass(dataUpdate?.class_id);
        setOrder(dataUpdate?.order_id);
        setFamily(dataUpdate?.family_id);
        setGenus(dataUpdate?.genus_id);
        if(dataUpdate === null){
            callAPI();
        }
},[dataUpdate, updating])  

    useEffect(()=>{
        dispatch(getRankAction())
    },[dispatch, allKingdom, allPhylum, allClass, allOrder, allFamily, allGenus])
    
    const handelupdate = (event) => {
		let { id, value } = event.target;
		setDataUpdate({ ...dataUpdate, [id]: value });
	};

	const handelupdateSpecies = async () => {
		const validationErrors = validateForm(dataUpdate);
		if (validationErrors &&
            allKingdom !== undefined && 
            allPhylum !== undefined && 
            allClass !== undefined && 
            allOrder !== undefined && 
            allFamily !== undefined &&
            allGenus !== undefined) {
			setErrors({});
			dispatch(UpdateSpeciesAction({ id: updating, data: dataUpdate, kingdom_id: allKingdom, phylum_id: allPhylum, class_id: allClass, order_id: allOrder, family_id: allFamily, genus_id: allGenus }))
            .then(() => {
                dispatch(getSpeciesAction({ page: pagination.page, itemsPerPage: pagination.itemsPerPage, search: searchInput, kingdom_id: allKingdom, phylum_id: allPhylum, class_id: allClass, order_id: allOrder, family_id: allFamily, genus_id: allGenus}));
            })
            message.success({
                content: alertNoti,
                duration: 3, // Thời gian hiển thị (giây)
            });
            navigate("/")
		} else {
            message.error({
                content: "Cập nhật dữ liệu thất bại",
                duration: 3, // Thời gian hiển thị (giây)
              });
			setErrors(validationErrors);
		}
	}

    return(
        <>
        <div style={{height:'60px',}}>
        <HeaderComponent />
        </div>
        <div className="d-flex middle_page"  >
            <Layout>
				<Sider trigger={null} collapsible collapsed={show} style={{background:'#fff', boxShadow: '0px 0px 5px 3px lightgray', position:'fixed', height:'100%'}}>
					<NavbarComponent />
				</Sider>
			</Layout>
                <div className="form_species" style={{marginLeft: show ? '80px':'200px' , width: '100%', transition: 'margin-left 0.1s ease-in-out'}}>
                    <div className="d-flex pb-3">
                        <Link to='/'><FontAwesomeIcon className="back_up" icon="fa-solid fa-arrow-left" /></Link>
                        <h5 className="d-flex align-items-center m-0 ps-4"><b>THÔNG TIN VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM CẦN ĐƯỢC ƯU TIÊN BẢO VỆ</b></h5>
                    </div>
                    <div style={{width:'1000px'}}>  {/* thông tin chung về loài */}
                        <h6>I.Thông tin chung về loài</h6>
                        <div className="form_info w-100">
                            <label htmlFor="">Tên <span className="required">*</span></label><br />
                            <input className="input_form" type="text" id='ten' placeholder="Tên" value={dataUpdate?.ten} onChange={handelupdate} required />
                            {errors.name !== "" && (<span className="error">{errors.name}</span>)}
                        </div>
                        <div className="d-flex w-80">
                            <div className="form_info w-50">
                                <label htmlFor="">Tên khoa học <span className="required">*</span></label><br />
                                <input className="input_form" type="text" id='ten_khoa_hoc' placeholder="Tên khoa học" value={dataUpdate?.ten_khoa_hoc} onChange={handelupdate} required />
                                {errors.science_name !== "" && (<span className="error">{errors.science_name}</span>)}
                            </div>
                            <div className="form_info w-50">
                                <label htmlFor="">Tên tác giả</label><br />
                                <input className="input_form" type="text" id='ten_tac_gia' placeholder="Tên tác giả" value={dataUpdate?.ten_tac_gia} onChange={handelupdate} />
                            </div>
                        </div>
                        <div className="form_info w-100">
                            <label htmlFor="">Tên địa phương</label><br />
                            <input className="input_form" type="text" id='ten_dia_phuong' placeholder="Tên địa phương" value={dataUpdate?.ten_dia_phuong} onChange={handelupdate} />
                        </div>
                        <div className="form_info w-100">
                            <label htmlFor="">Nguồn dữ liệu</label><br />
                            <input className="input_form" type="text" id='nguon_du_lieu' placeholder="Nguồn dữ liệu" value={dataUpdate?.nguon_du_lieu} onChange={handelupdate} />
                        </div>
                    </div>
                    <div className="w-100 pt-3">    {/* phân loại loài */}
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
                            <div className="form_info w-50">
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
                            width:'100%',height:'41px'
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
                                style={{color: "#e51515", }} 
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
                                    return (
                                        <option className='dataType' key={item.id} value={item.uuid}>{item.ten_khoa_hoc} - {item.ten}</option>
                                    )
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
                            onChange={(e) =>{
                                setClass(e)
                                setOrder()
                                setFamily()
                                setGenus()
                            }} required
                        >
                            {dataRank && dataRank.map((item) => {
                                if (item.rank==='Class' && item.parent_id===allPhylum) {
                                    return (
                                        <option className='dataType' key={item.id} value={item.uuid}>{item.ten_khoa_hoc} - {item.ten}</option>
                                    )
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
                            onChange={(e) =>{
                                setOrder(e)
                                setFamily()
                                setGenus()
                            }} required
                        >
                            {dataRank && dataRank.map((item) => {
                                if (item.rank==='Order' && item.parent_id===allClass) {
                                    return (
                                        <option className='dataType' key={item.id} value={item.uuid}>{item.ten_khoa_hoc} - {item.ten}</option>
                                    )
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
                            onChange={(e) =>{
                                setFamily(e)
                                setGenus()
                            }} required
                        >
                            {dataRank && dataRank.map((item) => {
                                if (item.rank==='Family' && item.parent_id===allOrder) {
                                    return (
                                        <option className='dataType' key={item.id} value={item.uuid}>{item.ten_khoa_hoc} - {item.ten}</option>
                                    )
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
                            onChange={(e) =>{
                                setGenus(e)
                            }} required
                        >
                            {dataRank && dataRank.map((item) => {
                                if (item.rank==='Genus' && item.parent_id===allFamily) {
                                    return (
                                        <option className='dataType' key={item.id} value={item.uuid}>{item.ten_khoa_hoc} - {item.ten}</option>
                                    )
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
                                <div className="d-flex">
                                    <label for='upload' className="img_layout mt-4">
                                        <FontAwesomeIcon icon="fa-solid fa-plus" style={{color: "#757575",}} />
                                        <input id="upload" type="file" hidden='hidden' />
                                    </label>
                                    <div className="mt-4 ms-4">
                                        <img className='img_' src={`https://wlp.howizbiz.com${dataUpdate?.img?.path}`} alt="" />
                                    </div>
                                </div>
                        </div>
                    </div>
                    </div>   
                    <button className='submit_btn' onClick={()=>handelupdateSpecies()}>Cập nhật</button>
                </div>
            
    </div>
    <div className="z-2 position-fixed w-100" style={{height:'33px'}}>
        <FooterComponent />
    </div>
    </>
    )
}

export default Update
