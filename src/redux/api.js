import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const login = (data) => API.post("/v1/api/admin/login", data);
export const register = (data) => API.post("/v1/api/admin/register", data);

export const createService = (data) => API.post("/v1/api/admin/services", data);
export const createCompany = (data) => API.post("/v1/api/admin/companys", data);
export const createCategory = (data) =>
  API.post("/v1/api/admin/category/create", data);
export const createContract = (data) =>
  API.post("/v1/api/admin/contract/create", data);

export const updateService = (data) =>
  API.patch(`/v1/api/admin/services/edit/${data.id}`, data);

export const getServices = () => API.get("/v1/api/admin/services");
export const getSingleService = (id) => API.get(`/v1/api/admin/services/${id}`);
export const getServicesByCategory = (id) =>
  API.get(`/v1/api/admin/services/${id}`);
export const getCategorys = () => API.get("/v1/api/admin/categorys");
export const getCompanys = () => API.get("/v1/api/admin/companys");
export const getContracts = () => API.get("/v1/api/admin/contracts");
export const getServicesBySearch = (searchQuery) =>
  API.get(`/v1/api/admin/search/service?s=${searchQuery}`);
