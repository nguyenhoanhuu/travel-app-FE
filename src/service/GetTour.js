import * as request from '~/util/httpRequest';

export const search = async (path, q) => {
   try {
      const res = await request.get(`${path}/${q}`);
      return res;
   } catch (error) {}
};
