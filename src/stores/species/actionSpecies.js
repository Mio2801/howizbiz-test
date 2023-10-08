import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGetAllSpecies, ApiGetSpecies, UpdateSpecies, apiGetRank, createSpecies, deleteSpecies } from "../../api/auth/auth.api";

export const getSpeciesAction = createAsyncThunk("species", async ({ page, itemsPerPage, search, kingdom_id, phylum_id, class_id, order_id, family_id, genus_id }) => {
	try {
		const response = await ApiGetAllSpecies(page, itemsPerPage, search, kingdom_id, phylum_id, class_id, order_id, family_id, genus_id);
		return response;
	} catch (error) {
		throw error;
	}
});


export const getSpeciesReduces = (builder) => {
	builder
	.addCase(getSpeciesAction.pending, (state) => {
		state.loading = true;
			state.error = null;
		})
		.addCase(getSpeciesAction.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload.list;
			state.pagination = action.payload.pagination;
			state.error = null;
		})
		.addCase(getSpeciesAction.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
	};
	
	export const info = createAsyncThunk("speciesID", async ({id}) =>{
		try {
			const response = await ApiGetSpecies(id);
			return response;
		} catch (error) {
			throw error;
		}
	});

	export const getInfoReduces = (builder) => {
		builder
		.addCase(info.pending, (state) => {
			state.loading = true;
				state.error = null;
			})
			.addCase(info.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
				state.error = null;
			})
			.addCase(info.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
		};

	
	
	export const createSpeciesAction = createAsyncThunk('species/create', async ({ data, kingdom_id, phylum_id, class_id, order_id, family_id, genus_id }) => {
		try {
		const response = createSpecies(data, kingdom_id, phylum_id, class_id, order_id, family_id, genus_id);
		return response;
	} catch (error) {
		alert("Dữ liệu không thỏa mãn hoặc đã tồn tại trong hệ thống");
		return error;
	}
});

export const createSpeciesReducer = (builder) => {
	builder
		.addCase(createSpeciesAction.pending, (state) => {
			state.loading = true;
			state.error = null;
		})
		.addCase(createSpeciesAction.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
			state.error = null;
		})
		.addCase(createSpeciesAction.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
};

export const UpdateSpeciesAction = createAsyncThunk('species/update', async ({ id, data, kingdom_id, phylum_id, class_id, order_id, family_id, genus_id }) => {
	try {
		const response = UpdateSpecies(id, data, kingdom_id, phylum_id, class_id, order_id, family_id, genus_id);
		return response;
	} catch (error) {
		alert("Cập Nhật Dữ liệu Người Dùng không thành công . Vui lòng kiểm tra lại");
		return error;
	}
});

export const updateSpeciesReduces = (builder) => {
	builder
		.addCase(UpdateSpeciesAction.pending, (state) => {
			state.loading = true;
			state.error = null;
		})
		.addCase(UpdateSpeciesAction.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
			state.error = null;
		})
		.addCase(UpdateSpeciesAction.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
}

export const deleteSpeciesAction = createAsyncThunk('species/delete', async ({ id }) => {
	try {
		const response = deleteSpecies(id);
		return response;
	} catch (error) {
		return error;
	}
});

export const deleteSpeciesReduces = (builder) => {
	builder
		.addCase(deleteSpeciesAction.pending, (state) => {
			state.loading = true;
			state.error = null;
		})
		.addCase(deleteSpeciesAction.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
			state.error = null;
		})
		.addCase(deleteSpeciesAction.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// phân loại loài
export const getRankAction = createAsyncThunk("rank", async () => {
	try {
		const response = await apiGetRank();
		return response;
	} catch (error) {
		throw error;
	}
})

export const getRankReduces = (builder) => {
	builder
		.addCase(getRankAction.pending, (state) => {
			state.loadingRank = true;
			state.error = null;
		})
		.addCase(getRankAction.fulfilled, (state, action) => {
			state.loadingRank = false;
			state.dataRank = action.payload;
			state.error = null;
		})
		.addCase(getRankAction.rejected, (state, action) => {
			state.loadingRank = false;
			state.error = action.error.message;
		});
}

// //ngành
// export const getPhylumAction = createAsyncThunk("phylum", async () => {
// 	try {
// 		const response = await apiGetPhylum();
// 		return response;
// 	} catch (error) {
// 		throw error;
// 	}
// })

// export const getPhylumReduces = (builder) => {
// 	builder
// 		.addCase(getPhylumAction.pending, (state) => {
// 			state.loadingPhylum = true;
// 			state.error = null;
// 		})
// 		.addCase(getPhylumAction.fulfilled, (state, action) => {
// 			state.loadingPhylum = false;
// 			state.dataPhylum = action.payload;
// 			state.error = null;
// 		})
// 		.addCase(getPhylumAction.rejected, (state, action) => {
// 			state.loadingPhylum = false;
// 			state.error = action.error.message;
// 		});
// }

// //lớp class
// export const getClassAction = createAsyncThunk("classType", async () => {
// 	try {
// 		const response = await apiGetClass();
// 		return response;
// 	} catch (error) {
// 		throw error;
// 	}
// })

// export const getClassReduces = (builder) => {
// 	builder
// 		.addCase(getClassAction.pending, (state) => {
// 			state.loadingClass = true;
// 			state.error = null;
// 		})
// 		.addCase(getClassAction.fulfilled, (state, action) => {
// 			state.loadingClass = false;
// 			state.dataClass = action.payload;
// 			state.error = null;
// 		})
// 		.addCase(getClassAction.rejected, (state, action) => {
// 			state.loadingClass = false;
// 			state.error = action.error.message;
// 		});
// }

// //bộ order
// export const getOrderAction = createAsyncThunk("order", async () => {
// 	try {
// 		const response = await apiGetOrder();
// 		return response;
// 	} catch (error) {
// 		throw error;
// 	}
// })

// export const getOrderReduces = (builder) => {
// 	builder
// 		.addCase(getOrderAction.pending, (state) => {
// 			state.loadingOrder = true;
// 			state.error = null;
// 		})
// 		.addCase(getOrderAction.fulfilled, (state, action) => {
// 			state.loadingOrder = false;
// 			state.dataOrder = action.payload;
// 			state.error = null;
// 		})
// 		.addCase(getOrderAction.rejected, (state, action) => {
// 			state.loadingOrder = false;
// 			state.error = action.error.message;
// 		});
// }

// //họ family
// export const getFamilyAction = createAsyncThunk("family", async () => {
// 	try {
// 		const response = await apiGetFamily();
// 		return response;
// 	} catch (error) {
// 		throw error;
// 	}
// })

// export const getFamilyReduces = (builder) => {
// 	builder
// 		.addCase(getFamilyAction.pending, (state) => {
// 			state.loadingFamily = true;
// 			state.error = null;
// 		})
// 		.addCase(getFamilyAction.fulfilled, (state, action) => {
// 			state.loadingFamily = false;
// 			state.dataFamily = action.payload;
// 			state.error = null;
// 		})
// 		.addCase(getFamilyAction.rejected, (state, action) => {
// 			state.loadingFamily = false;
// 			state.error = action.error.message;
// 		});
// }

// //chi genus
// export const getGenusAction = createAsyncThunk("genus", async () => {
// 	try {
// 		const response = await apiGetGenus();
// 		return response;
// 	} catch (error) {
// 		throw error;
// 	}
// })

// export const getGenusReduces = (builder) => {
// 	builder
// 		.addCase(getGenusAction.pending, (state) => {
// 			state.loadingGenus = true;
// 			state.error = null;
// 		})
// 		.addCase(getGenusAction.fulfilled, (state, action) => {
// 			state.loadingGenus = false;
// 			state.dataGenus = action.payload;
// 			state.error = null;
// 		})
// 		.addCase(getGenusAction.rejected, (state, action) => {
// 			state.loadingGenus = false;
// 			state.error = action.error.message;
// 		});
// }