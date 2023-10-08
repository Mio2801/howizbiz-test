import { getToken } from "./helper";
import { instance } from "../sdk";
import queryString from "query-string";

export const apiLogin = (data) =>
  instance
    .post(`api/web-authenticate`, {
      username: data.username,
      password: data.password,
    })
    .then((res) => res.data);

export const apiLogout = () =>
  instance
    .post("api/logout",{},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((res) => res.data);

    export const apiGetMe = () =>
      instance
        .get("api/me", {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        .then((res) => res.data.user);
    // .then((res) => {const token =  res.data;//.access_token;
    //   localStorage.setItem('token', token)   
    //   return Navigate('/')
    // });

    

    export const ApiGetAllSpecies = async (page, itemsPerPage, search, kingdom_id, phylum_id, class_id, order_id, family_id, genus_id) => {
      const queryParams = queryString.stringify({
        with: 'roles,createdBy',
      },{
          encode: false,
      })

      const queryParams2 = queryString.stringify({
        paginate: true,
        page: page,
        perpage: itemsPerPage,
        kingdom_id: kingdom_id,
        phylum_id: phylum_id,
        class_id: class_id,
        order_id: order_id,
        family_id: family_id,
        genus_id: genus_id,
      }, {
        encode: false,
      }
      );

      const searchInput = queryString.stringify({search: search,})
      
      const fullQueryString = queryParams2 + '&' + queryParams + '&' + searchInput;
        try {
          const res = await instance
            .get(`api/species?${fullQueryString}`, {
              headers: {
                Authorization: `Bearer ${getToken()}`,
              },
            });
          if (res.data === undefined) {
            throw new Error("Kiểm tra dữ liệu trả về có tìm thấy không");
          }
          return res.data;
          
        } catch (error) {
          console.error("Lỗi khi gọi API", error);
          throw error;
        }
      };

      export const createSpecies = (data, kingdom_id, phylum_id, class_id, order_id, family_id, genus_id) => {
        const postData = {
          ten: data.ten,
          ten_khoa_hoc: data.ten_khoa_hoc,
          ten_tac_gia: data.ten_tac_gia,
          ten_dia_phuong: data.ten_dia_phuong,
          nguon_du_lieu: data.nguon_du_lieu,
          image: data.image,
          kingdom_id: kingdom_id,
          phylum_id: phylum_id,
          class_id: class_id,
          order_id: order_id,
          family_id: family_id,
          genus_id: genus_id,
          toa_dos:[],
        };
        instance
          .post('api/species', postData, { headers: { Authorization: `Bearer ${getToken()}` } })
          .then(response => response.data)
          .catch(error => {
            return error
          });
      }

      export const deleteSpecies = (id) => {
        instance
          .delete(`api/species/${id}`, { 
            headers: { Authorization: `Bearer ${getToken()}` } 
          })
          .then(response => response.data)
          .catch(error => {
            return error
          });
      }

      export const ApiGetSpecies = async (id) => {
        try {
          const response = await instance.get(`api/species/${id}`, { headers: { Authorization: `Bearer ${getToken()}` } });
        return response.data;
        } catch (error) {
            return error;
        }
      }
        
      

      export const UpdateSpecies = (id, data, kingdom_id, phylum_id, class_id, order_id, family_id, genus_id) => {
        const updateData = {
          id: id,
          ten: data.ten,
          ten_khoa_hoc: data.ten_khoa_hoc,
          ten_tac_gia: data.ten_tac_gia,
          ten_dia_phuong: data.ten_dia_phuong,
          nguon_du_lieu: data.nguon_du_lieu,
          kingdom_id: kingdom_id,
          phylum_id: phylum_id,
          class_id: class_id,
          order_id: order_id,
          family_id: family_id,
          genus_id: genus_id,
          toa_dos:[],
        };
        instance
          .put(`api/species/${id}`, updateData, { 
            headers: { Authorization: `Bearer ${getToken()}` } 
          })
          .then(response => response.data)
          .catch(error => {
            return error
          });
      }

/////////////////////////////////////////////////////////////////////////////////

      export const apiGetRank = () =>
      instance
      .get("api/phanloaihoc?ranks[]=Kingdom&ranks[]=Phylum&ranks[]=Class&ranks[]=Order&ranks[]=Family&ranks[]=Genus", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        console.error("Error fetching data:", error);
        throw error;
      });


      // export const apiGetPhylum = () =>
      // instance
      // .get("api/phanloaihoc?ranks[]=Phylum", {
      //   headers: {
      //     Authorization: `Bearer ${getToken()}`,
      //   },
      // })
      // .then((res) => res.data)
      // .catch((error) => {
      //   console.error("Error fetching phylum data:", error);
      //   throw error;
      // });


      // export const apiGetClass = () =>
      // instance
      // .get("api/phanloaihoc?ranks[]=Class", {
      //   headers: {
      //     Authorization: `Bearer ${getToken()}`,
      //   },
      // })
      // .then((res) => res.data)
      // .catch((error) => {
      //   console.error("Error fetching class data:", error);
      //   throw error;
      // });


      // export const apiGetOrder = () =>
      // instance
      // .get("api/phanloaihoc?ranks[]=Order", {
      //   headers: {
      //     Authorization: `Bearer ${getToken()}`,
      //   },
      // })
      // .then((res) => res.data)
      // .catch((error) => {
      //   console.error("Error fetching order data:", error);
      //   throw error;
      // });


      // export const apiGetFamily = () =>
      // instance
      // .get("api/phanloaihoc?ranks[]=Family", {
      //   headers: {
      //     Authorization: `Bearer ${getToken()}`,
      //   },
      // })
      // .then((res) => res.data)
      // .catch((error) => {
      //   console.error("Error fetching family data:", error);
      //   throw error;
      // });


      // export const apiGetGenus = () =>
      // instance
      // .get("api/phanloaihoc?ranks[]=Genus", {
      //   headers: {
      //     Authorization: `Bearer ${getToken()}`,
      //   },
      // })
      // .then((res) => res.data)
      // .catch((error) => {
      //   console.error("Error fetching genus data:", error);
      //   throw error;
      // });


