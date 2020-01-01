const port = 7070;
const title = "vue项目";

const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: "/best",
  devServer: {
    port
  },
  configureWebpack: {
    name: title
  },
  chainWebpack(config) {
    // 查看规则  vue inspect --rules
    //          vue inspect --rule xx

    // 为src/icons中的svg添加webpack规则
    config.module.rule('svg')
        .exclude.add(resolve('src/icons'))
    config.module.rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/icons'))
            .end()
        .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({symbolId:'icon-[name]'})
            .end()
  }
};
