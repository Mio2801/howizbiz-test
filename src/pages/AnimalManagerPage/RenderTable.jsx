import React from 'react'
import { useSelector } from 'react-redux';
import DeleteSpecies from './Delete.jsx';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import Update from './UpdateNew.jsx';

export default function RenderTable(searchInput) {
	const { data } = useSelector((state) => state.species);
	const url = 'https://wlp.howizbiz.com';
	const navigate = useNavigate();
	
	return (
		<tbody className='tableSpecies'>
			{data && data.map((item) => ( 
				<tr key={item.id} id={item.id}>
					<td><div className='d-flex'>{item.attachments && item.attachments.length > 0 ? ( 
                    <img className='img_species' src={`${url}${item.attachments[0].path}`} alt="" /> 
                ) : ( 
                    <img className='img_species' src='https://gwdkids.com/cdn/shop/products/new-small-animals-01_1200x1200.jpg?v=1614685837' alt="" />
                )}<div className='d-flex align-items-center'>{item.ten}</div></div></td>
					<td>{item.ten_khoa_hoc}</td>
					<td>{item.kingdom.ten}</td>
					<td>{item.phylumn.ten}</td>
					<td>
						{item.class.ten === null || item.family.ten === "" ? item.class.ten_khoa_hoc : item.class.ten}
					</td>
					<td>
						{item.order.ten === null || item.order.ten === "" ? item.order.ten_khoa_hoc : item.order.ten}
					</td>
					<td>
						{item.family.ten === null || item.family.ten === "" ? item.family.ten_khoa_hoc : item.family.ten}
					</td>				
					<td>
						{item.genus.ten === null || item.genus.ten === "" ? item.genus.ten_khoa_hoc : item.genus.ten}
					</td>
					<td>
						<div className="selectButton">
							<i className="fa-solid fa-clock-rotate-left"></i>						
								<FontAwesomeIcon className='table_icon' icon="fa-solid fa-pen" 
									style={{color: "#000000", padding:'0 20px'}} 
									onClick={() => { navigate(`update/${item.id}`); }}
								/>
							<DeleteSpecies
								item={item}
								searchInput={searchInput} />
						</div>
					</td>
				</tr>
			))}
		</tbody>
	)
}
