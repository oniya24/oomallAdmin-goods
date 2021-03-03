import { request } from 'umi';
import { pagination } from '@/const/interface.tsx';

export const getAllShopReq = (params: pagination) => {
  return request(`/shops`, {
    params: params,
  });
};
interface shopData {
  name: string;
}
export const postApplyShopReq = ({ ...data }: { data: shopData }) => {
  return request(`/shops`, {
    method: 'post',
    data: data,
  });
};

export const putModifyShopReq = ({
  id,
  ...data
}: {
  id: number;
  data: shopData;
}) => {
  return request(`/shops/${id}`, {
    method: 'put',
    data: data,
  });
};

export const deleteShopReq = ({
  id,
  ...data
}: {
  id: number;
  data: shopData;
}) => {
  return request(`/shops/${id}`, {
    method: 'delete',
    data: data,
  });
};

// 平台管理员审核店铺信息
export const putAuditShopReq = ({
  shopId,
  id,
  ...data
}: {
  shopId: number;
  id: number;
  data: any;
}) => {
  return request(`/shops/${shopId}/newshops/${id}/audit`, {
    method: 'put',
    data: data,
  });
};

// 管理员上线店铺
export const putOnshelvesReq = ({ id }: { id: number }) => {
  return request(`/shops/${id}/onshelves`);
};

// 管理员下架店铺
export const putOffshelvesReq = ({ id }: { id: number }) => {
  return request(`/shops/${id}/offshelves`);
};
