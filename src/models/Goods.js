import {
  getAllBrandReq,
  postAddBrandReq,
  putModifyBrandReq,
  deleteBrandReq,
  getAllCategoryReq,
  postAddCategoryReq,
  getSubCategoryByIdReq,
  postAddSubCategoryReq,
  putCategoryReq,
  deleteCategoryReq,
  getAllSpuReq,
  postAddSpuReq,
  putModifySpuReq,
  deleteSpuReq,
  getSpuByIdReq,
  postAddSku2SpuReq,
  deleteSkuReq,
  putModifySkuReq,
  putOnshelvesReq,
  putOffshelvesReq,
  deleteSpuFromBrandReq,
  postSpu2BrandReq,
  deleteSpuFromCategoryReq,
  postSpu2CategoryReq,
} from '@/service/Goods.tsx';
import {
  defaultMapStateToProps,
  defaultMapDispatchToProps,
} from '@/utils/reduxUtil.tsx';
import { isErrnoEqual0, isCodeEqualOk } from '@/utils/validate';
import { message } from 'antd';
const namespace = 'goods';
const model = {
  namespace,
  state: {
    // brand 部分
    brandList: [
      {
        id: 0,
        name: 'string',
        imageUrl: 'string',
        detail: 'string',
        gmtCreate: 'string',
        gmtModified: 'string',
      },
    ],
    brandTotal: 0,
    brandPage: 1,
    brandPageSize: 10,
    // category部分
    categoryList: [
      {
        id: 0,
        name: 'string',
        imageUrl: 'string',
        detail: 'string',
        gmtCreate: 'string',
        gmtModified: 'string',
      },
    ],
    categoryTotal: 0,
    categoryPage: 1,
    categoryPageSize: 10,
    // sku部分
    spuDetail: {
      id: 0,
      name: 'string',
      brand: {
        id: 0,
        name: 'string',
        imageUrl: 'string',
      },
      category: {
        id: 0,
        name: 'string',
      },
      freight: {
        id: 0,
        name: 'string',
        type: 0,
        unit: 0,
        default: true,
        gmtCreate: 'string',
        gmtModified: 'string',
      },
      shop: {
        id: 0,
        name: 'string',
      },
      goodsSn: 'string',
      detail: 'string',
      imageUrl: 'string',
      spec: {
        id: 0,
        name: 'string',
        specItems: [
          {
            id: 0,
            name: 'string',
          },
        ],
      },
      skuList: [
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
      gmtCreate: 'string',
      gmtModified: 'string',
      disable: false,
    },
    // spu部分
    spuList: [
      {
        id: 0,
        name: 'string',
        imageUrl: 'string',
        detail: 'string',
        gmtCreate: 'string',
        gmtModified: 'string',
      },
    ],
    spuTotal: 0,
    spuPage: 1,
    spuPageSize: 10,
  },
  effects: {
    // brand 部分
    *getAllBrand({ payload }, { call, put }) {
      const res = yield call(getAllBrandReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        const { list, total } = data;
        yield put({
          type: 'save',
          payload: {
            brandList: list,
            brandTotal: total,
          },
        });
      }
    },
    *postAddBrand({ payload }, { call, put }) {
      const res = yield call(getAllBrandReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('创建成功');
      }
    },
    *putModifyBrand({ payload }, { call, put }) {
      const res = yield call(getAllBrandReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('修改成功');
      }
    },
    *deleteBrand({ payload }, { call, put }) {
      const res = yield call(getAllBrandReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('删除成功');
      }
    },
    *saveBrandPagination({ payload }, { call, put }) {
      const { page, pageSize } = payload;
      yield put({
        type: 'save',
        payload: {
          brandPage: page,
          brandPageSize: pageSize,
        },
      });
    },
    // category部分
    *getAllCategory({ payload }, { call, put }) {
      const res = yield call(getSubCategoryByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        const { list, total } = data;
        yield put({
          type: 'save',
          payload: {
            brandList: list,
            brandTotal: total,
          },
        });
      }
    },
    *postAddCategory({ payload }, { call, put }) {
      const res = yield call(postAddSubCategoryReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('创建成功');
      }
    },
    *putCategory({ payload }, { call, put }) {
      const res = yield call(putCategoryReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('修改成功');
      }
    },
    *deleteCategory({ payload }, { call, put }) {
      const res = yield call(deleteCategoryReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('删除成功');
      }
    },
    *saveCategoryPagination({ payload }, { call, put }) {
      const { page, pageSize } = payload;
      yield put({
        type: 'save',
        payload: {
          brandPage: page,
          brandPageSize: pageSize,
        },
      });
    },
    // sku部分
    *getSpuById({ payload }, { call, put }) {
      const res = yield call(getSpuByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        // message.success("删除成功")
        const { data } = res;
        yield put({
          type: 'save',
          payload: {
            spuDetail: data,
          },
        });
      }
    },
    *postAddSku2Spu({ payload }, { call, put }) {
      const res = yield call(getSkuByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('创建成功');
      }
    },
    *deleteSku({ payload }, { call, put }) {
      const res = yield call(getSkuByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('删除成功');
      }
    },
    *putModifySku({ payload }, { call, put }) {
      const res = yield call(getSkuByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('修改成功');
      }
    },
    // spu部分
    *getAllSpu({ payload }, { call, put }) {
      const res = yield call(getAllSpuReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        const { list, total } = data;
        yield put({
          type: 'save',
          payload: {
            brandList: list,
            brandTotal: total,
          },
        });
      }
    },
    *postAddSpuReq({ payload }, { call, put }) {
      const res = yield call(postAddSubSpuReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('创建成功');
      }
    },
    *putModifySpu({ payload }, { call, put }) {
      const res = yield call(putSpuReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('修改成功');
      }
    },
    *deleteSpu({ payload }, { call, put }) {
      const res = yield call(deleteSpuReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('删除成功');
      }
    },
    *saveSpuPagination({ payload }, { call, put }) {
      const { page, pageSize } = payload;
      yield put({
        type: 'save',
        payload: {
          brandPage: page,
          brandPageSize: pageSize,
        },
      });
    },
    // 交叉部分
    *putOnshelves({ payload }, { call, put }) {},
    *putOffshelves({ payload }, { call, put }) {},
    *deleteSpuFromBrand({ payload }, { call, put }) {
      const res = yield call(deleteSpuFromBrandReq, call);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('删除成功');
      }
    },
    *postSpu2BrandReq({ payload }, { call, put }) {
      const res = yield call(postSpu2BrandReq, call);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('创建成功');
      }
    },
    *deleteSpuFromCategory({ payload }, { call, put }) {
      const res = yield call(deleteSpuFromCategoryReq, call);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('删除成功');
      }
    },
    *postSpu2Category({ payload }, { call, put }) {
      const res = yield call(postSpu2CategoryReq, call);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('创建成功');
      }
    },
    *savePagination({ payload }, { call, put }) {
      const { page, pageSize } = payload;
      yield put({
        type: 'save',
        payload: {},
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
