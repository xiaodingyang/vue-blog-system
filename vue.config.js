module.exports = {
  chainWebpack: (config) => {
    //   全局引入scss
    const oneOfsMap = config.module.rule('scss').oneOfs.store;
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // 要公用的scss的路径
          resources: './src/assets/css/index.scss',
        })
        .end();
    });
  },
  productionSourceMap: false,
};
