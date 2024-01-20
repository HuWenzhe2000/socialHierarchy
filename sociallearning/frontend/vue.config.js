module.exports = {
    chainWebpack: (config) => {
        config.resolve.symlinks(false)
    }
}
// vue.config.js 添加如下配置
  configureWebpack: (config) => {
    config.module.rules.push(
      {
        test: path.resolve(__dirname, 'node_modules/leader-line/'),
        use: [{
          loader: 'skeleton-loader',
          options: {procedure: content => `${content}export default LeaderLine`}
        }]
      }
    )
  }
  chainWebpack:config => {
    config.module.rule('leaderLine')
    .test(path.resolve(__dirname,'node_modules/leader-line'))
    .use('skeleton-loader')
    .loader('skeleton-loader')
    .options({procedure:content => `${content}export default LeaderLine`})
  }