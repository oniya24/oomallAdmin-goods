import { history, RequestConfig } from 'umi';
import { addAuth2Header } from './utilReq/requestInterceptor';
import { handleErrorMsg } from './utilReq/responseInterceptor';
import { message } from 'antd';
import { errorHandler } from './utilReq/errorHandler';
// import 'antd/dist/antd.css';
import { BASEURL } from '@/consts/router.js';

export function render(oldRender) {
  if (
    !process.env.NODE_ENV == 'production' &&
    !sessionStorage.getItem('adminInfo')
  ) {
    sessionStorage.setItem(
      'adminInfo',
      JSON.stringify({
        depart_id: 0,
        userName: 'test',
        mobile: '16679794646',
      }),
    );
  }
  oldRender();
  // if (false) {
  //   oldRender();
  // } else {
  //   history.push('/login');
  //   oldRender();
  // }
  // oldRender()
}

export const request = {
  timeout: 5000,
  mode: 'cors',
  prefix: BASEURL,
  errorHandler,
  errorConfig: {
    adaptor: (resData) => {
      return {
        ...resData,
        success: resData.ok,
        errorMessage: resData.message,
      };
    },
  },
  requestInterceptors: [
    // addBaseUrl,
    addAuth2Header,
  ],
  responseInterceptors: [handleErrorMsg],
};

export const qiankun = {
  // 应用加载之前
  async bootstrap(props) {
    console.log('app1 bootstrap', props);
  },
  // 应用 render 之前触发
  async mount(props) {
    console.log('app1 mount', props);
  },
  // 应用卸载之后触发
  async unmount(props) {
    console.log('app1 unmount', props);
  },
};
