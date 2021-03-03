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
  postUploadBrandImgReq,
  postUploadSkuImgReq,
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
    mainCategory: [],
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
      const res = yield call(postAddBrandReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('创建成功');
      }
    },
    *putModifyBrand({ payload }, { call, put }) {
      const res = yield call(putModifyBrandReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('修改成功');
      }
    },
    *deleteBrand({ payload }, { call, put }) {
      const res = yield call(deleteBrandReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('删除成功');
      }
    },
    *postUploadBrandImg({ payload }, { call, put }) {
      const res = yield call(postUploadBrandImgReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('上传成功');
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
    *getAllMainCategory({ payload }, { call, put }) {
      const res = yield call(getSubCategoryByIdReq, { cId: 0 });
      console.log('cid');
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        yield put({
          type: 'save',
          payload: {
            mainCategory: data,
          },
        });
      }
    },
    *getAllCategory({ payload }, { call, put }) {
      const res = yield call(getSubCategoryByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        // const { list, total } = data;
        yield put({
          type: 'save',
          payload: {
            categoryList: data,
            categoryTotal: 10,
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
    *putModifyCategory({ payload }, { call, put }) {
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
    *postUploadSkuImg({ payload }, { call, put }) {
      const res = yield call(postUploadSkuImgReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('上传成功');
      }
    },
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
      const res = yield call(postAddSku2SpuReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('创建成功');
      }
    },
    *deleteSku({ payload }, { call, put }) {
      const res = yield call(deleteSkuReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('删除成功');
      }
    },
    *putModifySku({ payload }, { call, put }) {
      const res = yield call(putModifySkuReq, payload);
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
            spuList: list,
            spuTotal: total,
          },
        });
      }
    },
    *postAddSpu({ payload }, { call, put }) {
      const res = yield call(postAddSpuReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('创建成功');
      }
    },
    *putModifySpu({ payload }, { call, put }) {
      const res = yield call(putModifySpuReq, payload);
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
    *putOnshelves({ payload }, { call, put }) {
      const res = yield call(putOnshelvesReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('上架成功');
      }
    },
    *putOffshelves({ payload }, { call, put }) {
      const res = yield call(putOffshelvesReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('下架成功');
      }
    },
    *deleteSpuFromBrand({ payload }, { call, put }) {
      const res = yield call(deleteSpuFromBrandReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('删除成功');
      }
    },
    *postSpu2Brand({ payload }, { call, put }) {
      const res = yield call(postSpu2BrandReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('创建成功');
      }
    },
    *deleteSpuFromCategory({ payload }, { call, put }) {
      const res = yield call(deleteSpuFromCategoryReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('删除成功');
      }
    },
    *postSpu2Category({ payload }, { call, put }) {
      const res = yield call(postSpu2CategoryReq, payload);
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
