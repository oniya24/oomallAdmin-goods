import {
  getAllGrouponsReq,
  postCreateGrouponReq,
  putModifyGrouponReq,
  deleteGrouponReq,
  putOnshelvesGrouponReq,
  putOffshelvesGrouponReq,
} from '@/service/Groupon.tsx';

import { getAllSpuReq } from '@/service/Goods.tsx';
import {
  defaultMapStateToProps,
  defaultMapDispatchToProps,
} from '@/utils/reduxUtil.tsx';
import { isErrnoEqual0, isCodeEqualOk } from '@/utils/validate';
import { message } from 'antd';
const namespace = 'groupon';
const model = {
  namespace,
  state: {
    spuList: [],
    grouponList: [
      {
        id: 0,
        name: 'string',
        beginTime: 'string',
        endTime: 'string',
      },
    ],
    grouponTotal: 0,
    grouponPage: 1,
    grouponPageSize: 10,
  },
  effects: {
    *getAllGroupons({ payload }, { call, put }) {
      const res = yield call(getAllGrouponsReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        const { list, total } = data;
        yield put({
          type: 'save',
          payload: {
            grouponTotal: total,
            grouponList: list,
          },
        });
      }
    },
    *getAllSpu({ payload }, { call, put }) {
      const res = yield call(getAllSpuReq, payload);
      const { data } = res;
      const { list } = data;
      yield put({
        type: 'save',
        payload: {
          spuList: list,
        },
      });
    },
    *postCreateGroupon({ payload }, { call, put }) {
      const res = yield call(postCreateGrouponReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('创建成功');
      }
    },
    *putModifyGroupon({ payload }, { call, put }) {
      const res = yield call(putModifyGrouponReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('修改成功');
      }
    },
    *deleteGroupon({ payload }, { call, put }) {
      const res = yield call(deleteGrouponReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('删除成功');
      }
    },
    *putOnshelvesGroupon({ payload }, { call, put }) {
      const res = yield call(putOnshelvesGrouponReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('上架成功');
      }
    },
    *putOffshelvesGroupon({ payload }, { call, put }) {
      const res = yield call(putOffshelvesGrouponReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('下架成功');
      }
    },
    *savePagination({ payload }, { call, put }) {
      const { page, pageSize } = payload;
      yield put({
        type: 'save',
        payload: {
          grouponPage: page,
          grouponPageSize: pageSize,
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
