import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend URL
});

// Add a request interceptor to include the token if logged in
api.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// -------- Auth APIs --------
export const registerUser = (userData) => api.post("/auth/register", userData);
export const loginUser = (userData) => api.post("/auth/login", userData);

// -------- Product APIs --------
export const getProducts = () => api.get("/products");
export const getProductById = (id) => api.get(`/products/${id}`);
export const addProduct = (productData) => api.post("/products", productData);

// -------- Order APIs --------
export const createOrder = (orderData) => api.post("/orders", orderData);
export const getMyOrders = () => api.get("/orders/myorders");

// -------- Payment API --------
export const createPayment = (totalPrice) => api.post("/orders/payment", { totalPrice });

export default api;
