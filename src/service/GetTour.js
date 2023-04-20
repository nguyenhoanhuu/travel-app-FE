import * as request from '~/util/httpRequest';

export const search = async (path, q) => {
   try {
      const res = await request.get(`${path}/${q}`);
      return res;
   } catch (error) {}
};
export const searchParamUrl = async (path, q) => {
   try {
      const res = await request.get(`${path}?${q}`);
      return res;
   } catch (error) {}
};
export const searchTourMultiplyParam = async (
   path,
   departure,
   destination,
   startPrice,
   endPrice,
   type,
   pageNo,
   pageSize,
   sortBy,
   numberDays,
   checkPromotion,
   checkSubcriber,
) => {
   try {
      const res = await request.get(
         `${path}?departure=${departure}&destination=${destination}&startPrice=${startPrice}&endPrice=${endPrice}&type=${type}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&numberDays=${numberDays}&checkPromotion=${checkPromotion}&checkSubcriber=${checkSubcriber}`,
      );
      return res;
   } catch (error) {}
};
