import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/api': {
      target: 'http://47.96.155.159:8081',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  devServer: {
    port: 8002,
  },
  qiankun: {
    slave: {},
  },
  fastRefresh: {},
});
