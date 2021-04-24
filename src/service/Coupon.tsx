import { request } from 'umi';
import { pagination } from '@/const/interface.tsx';

// 管理员查看，仅可查看己方下线的优惠活动并获取简要信息
export const getAllInvalidCouponActivityReq = ({
  shopId,
  ...params
}: {
  shopId: number;
  params: pagination;
}) => {
  return request(`/shops/${shopId}/couponactivities/invalid`, {
    method: 'get',
    params: params,
  });
};
// 查看上线的优惠活动列表
export const getAllValidCouponActivityReq = (params: any) => {
  return request(`/couponactivities`, {
    method: 'get',
    params: params,
  });
};
// 管理员新建己方优惠活动
interface couponActivityData {
  name: string;
  quantity: number;
  quantityType: number;
  validTerm: number;
  couponTime: string;
  beginTime: string;
  endTime: string;
  strategy: string;
}
export const postCreateCouponActivityReq = ({
  shopId,
  ...data
}: {
  shopId: number;
  data: couponActivityData;
}) => {
  return request(`/shops/${shopId}/couponactivities`, {
    method: 'post',
    data: data,
  });
};

// 上传优惠活动图片
export const postUploadCouponActivityImgReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/couponactivities/${id}/uploadImg`, {
    method: 'post',
  });
};

// 查看优惠活动详情
export const getCouponActivityByIdReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/couponactivities/${id}`);
};

// 修改优惠活动
export const putCouponActivityByIdReq = ({
  shopId,
  id,
  ...data
}: {
  shopId: number;
  id: number;
  data: any;
}) => {
  return request(`/shops/${shopId}/couponactivities/${id}`, {
    method: 'put',
    data: data,
  });
};

// 删除优惠活动详情
export const deleteCouponActivityByIdReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/couponactivities/${id}`, {
    method: 'delete',
  });
};

// 查看优惠活动中的商品
export const getCouponActivitySkusByIdReq = ({
  id,
  ...params
}: {
  id: number;
  params: pagination;
}) => {
  return request(`/couponactivities/${id}/skus`, {
    params: params,
  });
};

// 管理员为己方某优惠券活动新增限定范围
export const postModifyActivityRegionReq = ({
  shopId,
  id,
  ...data
}: {
  shopId: number;
  id: number;
  data: any;
}) => {
  return request(`/shops/${shopId}/couponactivities/${id}/skus`, {
    method: 'post',
    params: data,
  });
};

export const getAllSpuReq = (params: any) => {
  return request(`/shops/spus`, {
    params: params,
  });
};

// 店家删除己方某优惠券活动的某限定范围
export const deleteCouponSkusRegionReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/couponskus/${id}`, {
    method: 'delete',
  });
};

// 上线优惠活动
export const putOnshelvesActivityReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/couponactivities/${id}/onshelves`, {
    method: 'put',
  });
};

// 下线优惠活动
export const putOffshelvesActivityReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/couponactivities/${id}/offshelves`, {
    method: 'put',
  });
};
