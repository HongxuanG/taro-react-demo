const path = require('path')
const childProcess = require('child_process')
const versions =
  childProcess.execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }) != 'HEAD\n'
    ? childProcess.execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' })
    : childProcess.execSync('git describe --tags --abbrev=0', { encoding: 'utf8' })
const CURRENT_GITHASH = childProcess.execSync('git rev-parse --short HEAD', { encoding: 'utf8' })
const CURRENT_VERSION = `Version: ${JSON.stringify(
  process.env.CODE_BRANCH || versions
)} ${CURRENT_GITHASH} ${new Date().toLocaleString()}`.replace(/\"|\\n/g, '')

const config = {
  projectName: 'super-weight-memo',
  date: '2022-7-28',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {
    CURRENT_VERSION: JSON.stringify(CURRENT_VERSION),
    CURRENT_GITHASH: JSON.stringify(CURRENT_GITHASH),
    CURRENT_ENV: JSON.stringify(process.env.NODE_ENV)
  },
  copy: {
    patterns: [],
    options: {}
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
