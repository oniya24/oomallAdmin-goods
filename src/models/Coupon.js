import {
  getAllInvalidCouponActivityReq,
  getAllValidCouponActivityReq,
  postCreateCouponActivityReq,
  postUploadCouponActivityImgReq,
  getCouponActivityByIdReq,
  putCouponActivityByIdReq,
  deleteCouponActivityByIdReq,
  getCouponActivitySkusByIdReq,
  postModifyActivityRegionReq,
  deleteCouponSkusRegionReq,
  putOnshelvesActivityReq,
  putOffshelvesActivityReq,
} from '@/service/Coupon.tsx';
import {
  defaultMapStateToProps,
  defaultMapDispatchToProps,
} from '@/utils/reduxUtil.tsx';
import { isErrnoEqual0, isCodeEqualOk } from '@/utils/validate';
import { message } from 'antd';
const namespace = 'coupon';
const model = {
  namespace,
  state: {
    validCouponList: [
      {
        id: 0,
        name: 'string',
        imageUrl: 'string',
        beginTime: 'string',
        endTime: 'string',
        quantity: 0,
        couponTime: 'string',
      },
    ],
    validCouponTotal: 0,
    validCouponPage: 1,
    validCouponPageSize: 10,
    couponDetail: {},
    couponSkusList: [
      {
        id: 0,
        name: 'string',
        skuSn: 'string',
        imageUrl: 'string',
        inventory: 0,
        originalPrice: 0,
        price: 0,
        disable: false,
      },
    ],
    couponSkusTotal: 0,
    couponSkusPage: 1,
    couponSkusPageSize: 10,
    invalidCouponList: [],
    invalidCouponTotal: 0,
    invalidCouponPage: 1,
    invalidCouponPageSize: 10,
  },
  effects: {
    *getAllInvalidCouponActivity({ payload }, { call, put }) {
      const res = yield call(getAllInvalidCouponActivityReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        // message.success("己方下线的优惠活动")
        const { data } = res;
        const { list, total } = data;
        yield put({
          type: 'save',
          payload: {
            inValidCouponList: list,
            inValidCouponTotal: total,
          },
        });
      }
    },
    *getAllValidCouponActivity({ payload }, { call, put }) {
      console.log('payload', payload);
      const res = yield call(getAllValidCouponActivityReq, payload);
      console.log('res', res);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        console.log('?????');
        const { data } = res;
        const { list, total } = data;
        yield put({
          type: 'save',
          payload: {
            validCouponList: list,
            validCouponTotal: total,
          },
        });
      }
    },
    *postCreateCouponActivity({ payload }, { call, put }) {
      const res = yield call(postCreateCouponActivityReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('管理员新建己方优惠活动');
      }
    },
    *postUploadCouponActivityImg({ payload }, { call, put }) {
      const res = yield call(postUploadCouponActivityImgReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('上传优惠活动图片');
      }
    },
    *getCouponActivityById({ payload }, { call, put }) {
      const res = yield call(getCouponActivityByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('查看优惠活动详情');
        const { data } = res;
        yield put({
          type: 'save',
          payload: {
            couponDetail: data,
          },
        });
      }
    },
    *putCouponActivityById({ payload }, { call, put }) {
      const res = yield call(putCouponActivityByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('修改优惠活动');
      }
    },
    *deleteCouponActivityById({ payload }, { call, put }) {
      const res = yield call(deleteCouponActivityByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('删除优惠活动详情');
      }
    },
    *getCouponActivitySkusById({ payload }, { call, put }) {
      const res = yield call(getCouponActivitySkusByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('查看优惠活动中的商品');
        const { data } = res;
        const { list, total } = data;
        yield put({
          type: 'save',
          payload: {
            couponSkusList: list,
            couponSkusTotal: total,
          },
        });
      }
    },
    *postModifyActivityRegion({ payload }, { call, put }) {
      const res = yield call(postModifyActivityRegionReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('新增限定范围');
      }
    },
    *deleteCouponSkusRegion({ payload }, { call, put }) {
      const res = yield call(deleteCouponSkusRegionReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('删除己方某优惠券活动的某限定范围');
      }
    },
    *putOnshelvesActivity({ payload }, { call, put }) {
      const res = yield call(putOnshelvesActivityReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('上架成功');
      }
    },
    *putOffshelvesActivity({ payload }, { call, put }) {
      const res = yield call(putOffshelvesActivityReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('下架成功');
      }
    },
    *saveValidPagination({ payload }, { call, put }) {
      const { page, pageSize } = payload;
      yield put({
        type: 'save',
        payload: {
          validCouponPage: page,
          validCouponPageSize: pageSize,
        },
      });
    },
    *saveInvalidPagination({ payload }, { call, put }) {
      const { page, pageSize } = payload;
      yield put({
        type: 'save',
        payload: {
          invalidCouponPage: page,
          invalidCouponPageSize: pageSize,
        },
      });
    },
    *saveCouponSkusPagination({ payload }, { call, put }) {
      const { page, pageSize } = payload;
      yield put({
        type: 'save',
        payload: {
          couponSkusPage: page,
          couponSkusPageSize: pageSize,
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
