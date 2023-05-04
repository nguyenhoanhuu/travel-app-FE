import axios from 'axios';
import * as request from '~/util/httpRequest';

export const postWithBody = async (path, q) => {
   let config = {
      headers: {
         'Content-Type': 'application/json',
      },
   };

   try {
      const res = await request.post(`${path}`, q, config);
      return res;
   } catch (error) {}
};
export const postWithBodyAndToken = async (path, q, token) => {
   const res = await axios({
      method: 'post', //you can set what request you want to be
      url: path,
      data: q,
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
      },
   });
   return res;
};
export const postWithBodyAndHeader = async (path, q, token) => {
   // await axios({
   //    method: 'post', //you can set what request you want to be
   //    url: path,
   //    data: q,
   //    headers: {
   //       'Content-Type': 'application/json',
   //       Authorization: 'Bearer ' + token,
   //    },
   // });
   let config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
      },
   };

   try {
      const res = await request.post(`${path}`, q, config);
      return res;
   } catch (error) {}
};
