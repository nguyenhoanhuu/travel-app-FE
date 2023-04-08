import axios from 'axios';

const request = axios.create({
   baseURL: process.env.REACT_APP_BASE_URL,
});
export const get = async (path) => {
   const response = await request.get(path);
   return response.data;
};
export const post = async (path, body) => {
   const response = await request.post(path, body);
   return response.data;
};
export default request;
