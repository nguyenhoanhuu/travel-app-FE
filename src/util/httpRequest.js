import axios from 'axios';

const request = axios.create({
   baseURL: process.env.REACT_APP_BASE_URL,
});
export const get = async (path, header) => {
   const response = await request.get(path, header);
   return response.data;
};
export const post = async (path, body) => {
   const response = await request.post(path, body);
   return response.data;
};
export const deleteInfor = async (path, body) => {
   const response = await request.delete(path, body);
   return response.data;
};
export const postWithHeader = async (path, body, header) => {
   const response = await request.post(path, body, header);
   console.log(response);
   return response.data;
};
export default request;
