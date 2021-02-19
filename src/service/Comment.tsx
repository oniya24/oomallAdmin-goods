import { request } from 'umi';
import { pagination } from '@/const/interface.tsx';

export const getAllCommentsReq = ({
  id,
  ...params
}: {
  id: number;
  params: any;
}) => {
  return request(`/shops/${id}/comments/all`, {
    params: params,
  });
};

// 管理员审核评论
export const putComfirmCommentReq = ({
  did,
  id,
  ...data
}: {
  did: number;
  id: number;
  data: any;
}) => {
  return request(`/shops/${did}/comments/${id}/confirm`, {
    method: 'put',
    data: data,
  });
};
