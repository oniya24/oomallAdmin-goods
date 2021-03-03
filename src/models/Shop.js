import {
  getAllShopReq,
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
    *getAllShop({ payload }, { call, put }) {
      const res = yield call(getAllShopReq, payload);
      if (isCodeEqualOk(res) || isErrnoEqual0(res)) {
        const { data } = res;
        const { list, total } = data;
        yield put({
          type: 'save',
          payload: {
            shopList: list,
            shopTotal: total,
          },
        });
      }
    },
    *postApplyShop({ payload }, { call, put }) {
      const res = yield call(postApplyShopReq, payload);
      if (isCodeEqualOk(res) || isErrnoEqual0(res)) {
        message.success('创建成功');
      }
    },
    *putModifyShop({ payload }, { call, put }) {
      const res = yield call(putModifyShopReq, payload);
      if (isCodeEqualOk(res) || isErrnoEqual0(res)) {
        message.success('修改成功');
      }
    },
    *deleteShop({ payload }, { call, put }) {
      const res = yield call(deleteShopReq, payload);
      if (isCodeEqualOk(res) || isErrnoEqual0(res)) {
        message.success('删除成功');
      }
    },
    *putAuditShop({ payload }, { call, put }) {
      const res = yield call(putAuditShopReq, payload);
      if (isCodeEqualOk(res) || isErrnoEqual0(res)) {
        message.success('认证成功');
      }
    },
    *putOnshelves({ payload }, { call, put }) {
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
    *saveShopPagination({ payload }, { call, put }) {
      const { page, pageSize } = payload;
      yield put({
        type: 'save',
        payload: {
          shopPage: page,
          shopPageSize: pageSize,
        },
      });
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
