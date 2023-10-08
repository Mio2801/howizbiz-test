import React, { useState } from 'react'
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { getSpeciesAction } from '../../stores/species/actionSpecies';
import './AnimalManagerStyle.scss';

export default function Pagination({ searchInput }) {
	const { pagination } = useSelector((state) => state.species);
	const [selectedOptionValue, setSelectedOptionValue] = useState(10);
	const dispatch = useDispatch();

	const handlePageClick = (data) => {
		dispatch(getSpeciesAction({
			page: data.selected + 1,
			itemsPerPage: pagination.itemsPerPage,
			search: searchInput,
		}));
	};

	let pageCount = 0;
	if (!isNaN(pagination.total) && !isNaN(pagination.itemsPerPage) && pagination.itemsPerPage !== 0) {
		pageCount = Math.ceil(pagination.total / pagination.itemsPerPage);
	}

	let start = (pagination.page - 1) * pagination.itemsPerPage + 1;
	let end = pagination.page * pagination.itemsPerPage;
	if (end >= pagination.total) {
		end = pagination.total;
	}

	const handleSelectChange = (e) => {
		setSelectedOptionValue(e.target.value);
		dispatch(getSpeciesAction({
			page: 1,
			itemsPerPage: e.target.value,
			input: searchInput,
		}));
	};

	return (
		<div className='d-flex align-items-center paginate'>
			<div className='left-pagination left_pagination'>
				<p>{start + " - " + end + " / " + pagination.total}</p>
			</div>
			<div className='center-pagination'>
				<ReactPaginate
					previousLabel={`<`}
					nextLabel={`>`}
					breakLabel={`...`}
					pageCount={pageCount}
					onPageChange={handlePageClick}
					containerClassName='pagination'
					pageClassName='page-item me-2 ms-2 page-normal'
					pageLinkClassName='page-link'
					previousClassName='page-item'
					previousLinkClassName='page-link me-2 ms-2 text-dark'
					nextClassName='page-item'
					nextLinkClassName='page-link me-2 ms-2 text-dark'
					activeClassName='active'
				/>
			</div>
			<div className='right-pagination'>
				<select name="listPage-pagination" id="listPage-pagination" defaultValue={selectedOptionValue}
					onChange={handleSelectChange}>
					<option value="5">5 / trang</option>
					<option value="10">10 / trang</option>
					<option value="15">15 / trang</option>
					<option value="20">20 / trang</option>
					<option value="25">25 / trang</option>
					<option value="50">50 / trang</option>
				</select>
			</div>
		</div>
	)
}
