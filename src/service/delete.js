import * as request from '~/util/httpRequest';

export const deleteWithId = async (path, q) => {
   try {
      const res = await request.deleteInfor(`${path}/${q}`);
      return res;
   } catch (error) {}
};
