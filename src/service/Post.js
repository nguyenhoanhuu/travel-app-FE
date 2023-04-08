import * as request from '~/util/httpRequest';

export const postWithBody = async (path, q) => {
   try {
      const res = await request.post(`${path}`, q, {
         headers: {
            'Content-Type': 'application/json',
         },
      });
      return res;
   } catch (error) {}
};
