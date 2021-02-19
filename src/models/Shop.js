import {
  postApplyShopReq,
  putModifyShopReq,
  deleteShopReq,
  putAuditShopReq,
  putOnshelvesReq,
  putOffshelvesReq,
} from '@/service/Shop.tsx';
import {
  defaultMapStateToProps,
  defaultMapDispatchToProps,
} from '@/utils/reduxUtil.tsx';
import { isErrnoEqual0, isCodeEqualOk } from '@/utils/validate';
import { message } from 'antd';
const namespace = 'shop';
const model = {
  namespace,
  state: {
    shopList: [],
    shopTotal: 0,
    shopPage: 1,
    shopPageSize: 10,
  },
  effects: {
    *postApplyShopReq({ payload }, { call, put }) {
      const res = yield call(postApplyShopReq, payload);
      if (isCodeEqualOk(res) || isErrnoEqual0(res)) {
        message.success('创建成功');
      }
    },
    *putModifyShopReq({ payload }, { call, put }) {
      const res = yield call(putModifyShopReq, payload);
      if (isCodeEqualOk(res) || isErrnoEqual0(res)) {
        message.success('修改成功');
      }
    },
    *deleteShopReq({ payload }, { call, put }) {
      const res = yield call(deleteShopReq, payload);
      if (isCodeEqualOk(res) || isErrnoEqual0(res)) {
        message.success('删除成功');
      }
    },
    *putAuditShopReq({ payload }, { call, put }) {
      const res = yield call(putAuditShopReq, payload);
      if (isCodeEqualOk(res) || isErrnoEqual0(res)) {
        message.success('认证成功');
      }
    },
    *putOnshelvesReq({ payload }, { call, put }) {
      const res = yield call(putOnshelvesReq, payload);
      if (isCodeEqualOk(res) || isErrnoEqual0(res)) {
        message.success('上架店铺成功');
      }
    },
    *putOffshelvesReq({ payload }, { call, put }) {
      const res = yield call(putOffshelvesReq, payload);
      if (isCodeEqualOk(res) || isErrnoEqual0(res)) {
        message.success('下架店铺成功');
      }
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export const mapStateToProps = defaultMapStateToProps(model);
export const mapDispatchToProps = defaultMapDispatchToProps(model);
export default model;
