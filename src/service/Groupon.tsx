import { request } from 'umi';
import { pagination } from '@/const/interface.tsx';

// 管理员查询所有团购(包括下线,删除的)
export const getAllGrouponsReq = ({
  shopId,
  ...params
}: {
  shopId: number;
  params: any;
}) => {
  return request(`/shops/${shopId}/groupons`, {
    params: params,
  });
};
interface SpuData {
  strategy: string;
  beginTime: string;
  endTime: string;
}
// 管理员对SPU新增团购活动
export const postCreateGrouponReq = ({
  shopId,
  id,
  ...data
}: {
  shopId: number;
  id: number;
  data: SpuData;
}) => {
  return request(`/shops/${shopId}/spus/${id}/groupons`, {
    method: 'post',
    data: data,
  });
};

// 管理员修改SKU预售活动
export const putModifyGrouponReq = ({
  shopId,
  id,
  ...data
}: {
  shopId: number;
  id: number;
  data: SpuData;
}) => {
  return request(`/shops/${shopId}/groupons/${id}`, {
    method: 'put',
    data: data,
  });
};

// 管理员逻辑删除SKU预售活动
export const deleteGrouponReq = ({
  shopId,
  id,
  ...data
}: {
  shopId: number;
  id: number;
  data: SpuData;
}) => {
  return request(`/shops/${shopId}/groupons/${id}`, {
    method: 'delete',
  });
};

// 管理员上线预售活动
export const putOnshelvesGrouponReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/groupons/${id}/onshelves`);
};

// 管理员下架预售活动
export const putOffshelvesGrouponReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/groupons/${id}/offshelves`);
};
