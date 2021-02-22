import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/api': {
      target: 'http://localhost:8081/',
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
