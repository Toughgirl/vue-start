// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var base_url="http://192.168.0.211:83/";
//var base_url="http://192.168.0.55:83/";
//var base_url="http://192.168.0.163:9014/";
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    proxyTable: {
      '/jingycfOperator': {
        target: base_url,
        changeOrigin: true,
        pathRewrite: {
          '^/jingycfOperator': '/jingycf-operator'
        }
      },

    //proxyTable: {
    //  '/oserving': {
    //    target: "http://os.jingycf.com/",
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/oserving': '/oserving'
    //    }
    //  },

    //  '/loginparam': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/loginparam': '/login'
    //    }
    //  },
    //  '/company': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/company': '/system/company'
    //    }
    //  },
    //
    //  //找回忘记密码功能-获取验证码，接口名称：/system/custUser/coding
    //  //找回密码功能-确认，接口名称：/system/custUser/check
    //  //修改密码功能入口，接口名称：/system/custUser/passWord
    //  //修改密码功能保存，接口名称：/system/custUser/savePassWord
    //  '/forgetPasswordCoding': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/forgetPasswordCoding': '/system/custUser/coding'
    //    }
    //  },
    //  '/check': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/check': '/system/custUser/check'
    //    }
    //  },
    //  '/passWord': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/passWord': '/system/custUser/passWord'
    //    }
    //  },
    //  '/savePassWord': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/savePassWord': '/system/custUser/savePassWord'
    //    }
    //  },
    //  //退货
    //  '/goodsReturnOrder': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/goodsReturnOrder': '/system/goodsReturnOrder/page'
    //    }
    //  },
    //  '/detailReturnOrder': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/detailReturnOrder': '/system/goodsReturnOrder/detail'
    //    }
    //  },
    //  '/pageAReturnOrder': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/pageAReturnOrder': '/system/goodsReturnOrder/detail_page'
    //    }
    //  },
    //  '/sumgoodsReturnOrder': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/sumgoodsReturnOrder': '/system/goodsReturnOrder/sum'
    //    }
    //  },
    //  //采购
    //  '/customerOrder': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/customerOrder': '/system/store/customerOrder/selectDataByPage'
    //    }
    //  },
    //  '/sumcustomerOrder': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/sumcustomerOrder': '/system/store/sum'
    //    }
    //  },
    //  //采购详情1
    //'/detailCustomerOrder': {
    //  target: base_url,
    //  changeOrigin: true,
    //    pathRewrite: {
    //      '^/detailCustomerOrder': '/system/store/details'
    //    }
    //  },
    //  //采购详情2
    //  '/ByPageCustomerOrderDetail': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/ByPageCustomerOrderDetail': '/system/store/customerOrder/findOrderItemByPage'
    //    }
    //  },
    //  '/saveCompany': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/saveCompany': '/system/saveCompany'
    //    }
    //  },
    //  //门店管理
    //  '/storeList': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/storeList': '/system/store/page'
    //    }
    //  },
    //  //门店详情1
    //  '/_storeDetail': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/_storeDetail': '/system/store/edit'
    //    }
    //  },
    //  //门店详情2
    //  '/serviceInfo': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/serviceInfo': '/system/store/serviceInfo'
    //    }
    //  },
    //  //  全车件/parts/partsOrder/page
    //  //全车件报价详情非表格展示，接口名称：/parts/partsOrder/pdbjList
    //  //全车件详情表格信息组，接口名称：/parts/partsOrder/pages
    //  '/partsOrderList': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/partsOrderList': '/parts/partsOrder/page'
    //    }
    //  },
    //  '/pdbjList': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/pdbjList': '/parts/partsOrder/pdbjList'
    //    }
    //  },
    //  '/partsOrderPages': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/partsOrderPages': '/parts/partsOrder/pages'
    //    }
    //  },
    ////  结算单列表展示/system/companySettlement/page
    ////  结算单详情页的非表格信息组/system/companySettlement/detail
    ////  结算单详情页的表格信息组/system/companySettlement/pages
    ////  交易明细展示/system/store/transactionDetail
    ////  交易明细详情页非表格信息/system/store/detail
    ////  交易明细详情页表格信息/system/store/detailPage
    //
    //  '/SettlementList': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/SettlementList': '/system/companySettlement/page'
    //    }
    //  },
    //  '/SettlementDetail': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/SettlementDetail': '/system/companySettlement/detail'
    //    }
    //  },
    //  '/Settlementpages': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/Settlementpages': '/system/companySettlement/pages'
    //    }
    //  },
    //  '/transactionList': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/transactionList': '/system/store/transactionDetail'
    //    }
    //  },
    //  '/transactionDetail': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/transactionDetail': '/system/store/detail'
    //    }
    //  },
    //  '/transactionDetailPage': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/transactionDetailPage': '/system/store/detailPage'
    //    }
    //  },
    ////  修改资料功能入口，接口名称：/system/custUser/user
    //  '/personalShow': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/personalShow': '/system/custUser/user'
    //    }
    //  },
    //  //修改资料功能保存操作，接口名称：/system/custUser/saveUser
    //  '/personalSave': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/personalSave': '/system/custUser/saveUser'
    //    }
    //  },
    //  '/ImageUpload': {
    //    target: "http://192.168.0.163:1702",
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/ImageUpload': '/ImageUpload'
    //    }
    //  },
    //  //门店保存
    //  '/storeSave': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/storeSave': '/system/store/save'
    //    }
    //  },
    //
    //
    ////  消息列表展示，接口名称：/system/hintMessage/page
    ////  消息中心标记为已读，接口名称：/system/hintMessage/updateStatus
    ////  消息中心删除文章，接口名称：/system/hintMessage/removeStatus
    ////  消息中心批量已读，接口名称：/system/hintMessage/updateStatuss
    ////  消息中心批量删除，接口名称：/system/hintMessage/removeStatuss
    //  '/MessagePage': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/MessagePage': '/system/hintMessage/page'
    //    }
    //  },
    //  '/removeStatus': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/removeStatus': '/system/hintMessage/removeStatus'
    //    }
    //  },
    //  '/updateStatus': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/updateStatus': '/system/hintMessage/updateStatus'
    //    }
    //  },
    //  '/updateStatuss': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/updateStatuss': '/system/hintMessage/updateStatuss'
    //    }
    //  },
    //  '/removeStatuss': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/removeStatuss': '/system/hintMessage/removeStatuss'
    //    }
    //  },
    //  //全车件的适用车型的选择品牌接口，接口名称：/parts/partsOrder/carBrand
    //  //全车件的适用车型的选择车系接口，接口名称：/parts/partsOrder/series
    //  //全车件的适用车型的选择年款接口，接口名称：/parts/partsOrder/model
    //  '/carBrand': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/carBrand': '/parts/partsOrder/carBrand'
    //    }
    //  },
    //  '/carSeries': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/carSeries': '/parts/partsOrder/series'
    //    }
    //  },
    //  '/carModel': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/carModel': '/parts/partsOrder/model'
    //    }
    //  },
    //
    ////  首页/total
    //  '/total': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/total': '/total'
    //    }
    //  },
    ////  获取服务器时间
    //  '/servnowTime': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/servnowTime': '/nowTime'
    //    }
    //  },
    //  ///code
    //  '/getCode': {
    //    target: base_url,
    //    changeOrigin: true,
    //    pathRewrite: {
    //      '^/getCode': '/code'
    //    }
    //  },



    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}

