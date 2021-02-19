import { request } from 'umi';
import { pagination } from '@/const/interface.tsx';

/** 感觉没用的 */
// 查询sku
export const getAllSkuReq = ({ params }: { params: any }) => {
  return request(`/skus`, {
    params: params,
  });
};

export const getSkuByIdReq = (id: number) => {
  return request(`/skus/${id}`);
};
// 管理员新增商品价格浮动
export const postAddSkuFloatPieceReq = ({
  id,
  shopId,
  ...data
}: {
  id: number;
  shopId: number;
  data: any;
}) => {
  return request(`/shops/${shopId}/skus/${id}/floatPrices`, {
    method: 'post',
    data: data,
  });
};

// 管理员失效商品价格浮动
export const deleteSkuFloatPieceReq = ({
  id,
  shopId,
}: {
  id: number;
  shopId: number;
}) => {
  return request(`/shops/${shopId}/floatPrices/${id}`, {
    method: 'delete',
  });
};

// sku上传图片
export const postUploadSkuImgReq = ({
  shopId,
  id,
  img,
}: {
  shopId: number;
  id: number;
  img: any;
}) => {
  return request(`/shops/${shopId}/skus/${id}/uploadImg`);
};

// 上传图片
export const postUploadBrandImgReq = ({
  shopId,
  id,
  img,
}: {
  shopId: number;
  id: number;
  img: any;
}) => {
  return request(`/shops/${shopId}/brands/${id}/uploadImg`, {
    method: 'post',
  });
};

/** 写完的  */
// 管理员修改品牌
export const putModifyBrandReq = ({
  id,
  shopId,
  ...data
}: {
  id: number;
  shopId: number;
  data: brandInfo;
}) => {
  return request(`/shops/${shopId}/brands/${id}`, {
    method: 'post',
    data: data,
  });
};

// 管理员修改品牌
export const deleteBrandReq = ({
  id,
  shopId,
}: {
  id: number;
  shopId: number;
}) => {
  return request(`/shops/${shopId}/brands/${id}`, {
    method: 'delete',
  });
};

// 查看所有品牌
export const getAllBrandReq = ({ params }: { params: pagination }) => {
  return request(`/brands`);
};

// 管理员新增品牌
interface brandInfo {
  name: string;
  detail: string;
}
export const postAddBrandReq = ({
  id,
  ...data
}: {
  id: number;
  data: brandInfo;
}) => {
  return request(`/shops/${id}/brands`, {
    method: 'post',
    data: data,
  });
};

// 查询商品分类关系
export const getSubCategoryByIdReq = (id: number) => {
  return request(`/categories/${id}/subcategories`);
};
// 管理员新增商品类目
export const postAddSubCategoryReq = ({
  shopId,
  id,
  ...data
}: {
  shopId: number;
  id: number;
  data: any;
}) => {
  return request(`/shops/${shopId}/categories/${id}/subcategories`, {
    method: 'post',
    data: data,
  });
};

// 管理员修改商品类目信息
export const putCategoryReq = ({
  shopId,
  id,
  ...data
}: {
  shopId: number;
  id: number;
  data: any;
}) => {
  return request(`/shops/${shopId}/categories/${id}`, {
    method: 'put',
    data: data,
  });
};
// 管理员删除商品类目信息
export const deleteCategoryReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/categories/${id}`, {
    method: 'delete',
  });
};

// ？？？ 这里是部分是应该查所有的SPU
// 查看一条商品SPU的详细信息
export const getAllSpuReq = ({ id }: { id: number }) => {
  return request(`/spus/{id}`);
};

// 店家新建商品SPU
export const postAddSpuReq = ({ id, ...data }: { id: number; data: any }) => {
  return request(`/shops/${id}/spus`, {
    method: 'post',
    data: data,
  });
};

// 店家修改商品SPU
export const putModifySpuReq = ({
  id,
  shopId,
  ...data
}: {
  id: number;
  shopId: number;
  data: any;
}) => {
  return request(`/shops/${shopId}/spus/${id}`, {
    method: 'post',
    data: data,
  });
};

// 店家删除商品SPU
export const deleteSpuReq = ({
  id,
  shopId,
}: {
  id: number;
  shopId: number;
}) => {
  return request(`/shops/${shopId}/spus/${id}`, {
    method: 'delete',
  });
};

// 获得spu的详细信息
export const getSpuByIdReq = ({ id }: { id: number }) => {
  return request(`/spus/${id}`);
};

// 管理员添加新的SKU到SPU里
export const postAddSku2SpuReq = ({
  shopId,
  id,
  ...data
}: {
  shopId: number;
  id: number;
  data: any;
}) => {
  return request(`/shops/${shopId}/spus/${id}/skus`, {
    method: 'post',
    data: data,
  });
};

// 管理员或店家逻辑删除SKU
export const deleteSkuReq = ({
  id,
  shopId,
}: {
  id: number;
  shopId: number;
}) => {
  return request(`/shops/${shopId}/skus/${id}`, {
    method: 'delete',
  });
};
// 管理员或店家修改SKU信息
export const putModifySkuReq = ({
  id,
  shopId,
  ...data
}: {
  id: number;
  shopId: number;
  data: any;
}) => {
  return request(`/shops/${shopId}/skus/${id}`, {
    method: 'put',
    data: data,
  });
};

// 店家商品上架
export const putOnshelvesReq = ({
  id,
  shopId,
}: {
  id: number;
  shopId: number;
}) => {
  return request(`/shops/${shopId}/skus/${id}/onshelves`, {
    method: 'put',
  });
};

// 店家商品下架
export const putOffshelvesReq = ({
  id,
  shopId,
}: {
  id: number;
  shopId: number;
}) => {
  return request(`/shops/${shopId}/skus/${id}/offshelves`, {
    method: 'put',
  });
};

// 将SPU加入分类
export const postSpu2CategoryReq = ({
  shopId,
  spuId,
  id,
}: {
  shopId: number;
  spuId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/spus/${spuId}/categories/${id}`, {
    method: 'post',
  });
};

// 如果该SPU变成无分类商品
export const deleteSpuFromCategoryReq = ({
  shopId,
  spuId,
  id,
}: {
  shopId: number;
  spuId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/spus/${spuId}/categories/${id}`, {
    method: 'delete',
  });
};

// 将SPU加入品牌
export const postSpu2BrandReq = ({
  shopId,
  spuId,
  id,
}: {
  shopId: number;
  spuId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/spus/${spuId}/brands/${id}`, {
    method: 'post',
  });
};

// 将SPU移出品牌
export const deleteSpuFromBrandReq = ({
  shopId,
  spuId,
  id,
}: {
  shopId: number;
  spuId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/spus/${spuId}/brands/${id}`, {
    method: 'delete',
  });
};
