import { getAllCommentsReq, putComfirmCommentReq } from '@/service/Comment.tsx';
import {
  defaultMapStateToProps,
  defaultMapDispatchToProps,
} from '@/utils/reduxUtil.tsx';
import { isErrnoEqual0, isCodeEqualOk } from '@/utils/validate';
import { message } from 'antd';
const namespace = 'comment';
const model = {
  namespace,
  state: {
    commentList: [
      {
        id: 0,
        customer: {
          id: 0,
          userName: 'string',
          name: 'string',
        },
        goodsSkuId: 0,
        type: 0,
        content: 'stringstringstringstringstringstringstring',
        state: 0,
        gmtCreate: 'string',
        gmtModified: 'string',
      },
    ],
    commentTotal: 0,
    commentPage: 1,
    commentPageSize: 10,
  },
  effects: {
    *getAllComments({ payload }, { call, put }) {
      const res = yield call(getAllCommentsReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        const { list, total } = data;
        yield put({
          type: 'save',
          payload: {
            commentList: list,
            commentTotal: total,
          },
        });
      }
    },
    *putComfirmComment({ payload }, { call, put }) {
      const res = yield call(putComfirmCommentReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('修改成功');
      }
    },
    *savePagination({ payload }, { call, put }) {
      const { page, pageSize } = payload;
      yield put({
        type: 'save',
        payload: {
          commentPage: page,
          commentPageSize: pageSize,
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
