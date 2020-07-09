/* eslint-disable */
import axios from 'axios'

let checkAJB = {
  ready(callback) {
    if (window.AlipayJSBridge) {
      callback && callback()
    } else {
      // 如果没有注入则监听注入的事件
      document.addEventListener('AlipayJSBridgeReady', callback, false)
    }
  },
  toast(content, type, duration, func) {
    this.ready(() => {
      AlipayJSBridge.call(
        'toast',
        {
          content,
          type,
          duration: duration || 2000
        },
        function() {
          func && func()
        }
      )
    })
  },
  // 本地持久化存储
  setLocalData(key, val) {
    let value = JSON.stringify(val);
    this.ready(() => {
      AlipayJSBridge.call('setItem', {
        key,
        value
      })
    })
  },
  // 获取本地持久化存储信息
  getLocalData(key) {
    return new Promise((resolve, reject) => {
      this.ready(() => {
        AlipayJSBridge.call(
          'getItem',
          {
            key: key
          },
          result => {
            if (result.error === 0) {
              resolve(result)
            } else {
              resolve(result)
            }
          }
        )
      })
    })
  },
  // 移除本地存储信息
  removeLocalData(key) {
    this.ready(() => {
      AlipayJSBridge.call('deleteItem', {
        key: key
      })
    })
  },
  // 从利用url从原生获取图片信息
  fetchBase64FromNative(urlObj) {
    return new Promise((resolve, reject) => {
      // resolve("data:image/png;base64,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")
      this.ready(() => {
        AlipayJSBridge.call('getPicFromUrl', urlObj, result => {
          if (result && result.pic) {
            resolve(result)
          } else {
            reject(result)
          }
        })
      })
    })
  },
  // 监听原生返回
  goBack() {
    document.addEventListener(
      'back',
      function(e) {
        e.preventDefault()
        AlipayJSBridge.call('popWindow')
      },
      false
    )
  },
  openNewWindow(args) {
    this.ready(() => {
      AlipayJSBridge.call('pushWindow', args)
    })
  },
  getIOSParams(args) {
    this.ready(() => {
      AlipayJSBridge.call(
        'getStartupParams',
        {
          key: [args] // 可选，根据 key 值过滤返回结果，不填返回全部
        },
        function(result) {
          console.log(result)
        }
      )
    })
  },
  openH5Window(args) {
    this.ready(() => {
      AlipayJSBridge.call('openH5Window', args)
    })
  },
  getH5Params(args) {
    this.ready(() => {
      AlipayJSBridge.call('getH5Params', args)
    })
  },
  closeH5Window(args) {
    this.ready(() => {
      AlipayJSBridge.call('closeH5Window', args)
    })
  },
  closeNewWindow(args) {
    this.ready(() => {
      AlipayJSBridge.call('popWindow', args)
    })
  },
  // openH5Window(args) {
  //   this.ready(() => {
  //     AlipayJSBridge.call('openH5Window', args)
  //   })
  // },
  setTitle(title) {
    this.ready(() => {
      AlipayJSBridge.call('setTitle', {
        title: title
      })
    })
  },
  showLoading(text) {
    this.ready(() => {
      AlipayJSBridge.call('showLoading', {
        text: text
      })
    })
  },
  hideLoading() {
    this.ready(() => {
      AlipayJSBridge.call('hideLoading')
    })
  },
  // httpRequest(reqConfig) {
  //   console.log(reqConfig, 'requconfig')
  //   return new Promise((resolve, reject) => {
  //     axios(reqConfig).then(res => {
  //       resolve(res.data)
  //       console.log(res, 'halou response')
  //     })
  //   })
  // },
  httpRequest(reqConfig) {
    return new Promise((resolve, reject) => {
      console.log('i am in app', reqConfig)
      this.ready(() => {
        AlipayJSBridge.call('xyrequest', reqConfig, result => {
          console.log(result, 'hhuihu')
          if (result.code == 0) {
            let respData = JSON.parse(result.data)
            if (respData.resCode == 'SGAU0002') {
              //超时
              this.userLogin().then(res => {
                resolve(res)
              })
            } else {
              resolve(JSON.parse(result.data))
            }
          } else {
            console.log(result.msg)
            reject(result.msg)
          }
        })
      })
    })
  },
  userLogin() {
    return new Promise(resolve => {
      this.ready(() => {
        AlipayJSBridge.call('userLogin', {}, result => {
          resolve(result)
        })
      })
    })
  },
  // getUserInfo() {
  //   return new Promise(resolve => {
  //     let result = {
  //       sgasession: '12778568c63145bcb17c5eeb92d8ae51',
  //       userInfo: {
  //         agentCertKey: '',
  //         entName: '襄阳测试企业一',
  //         agentAddr: '',
  //         agentEmail: '',
  //         legalCard: '420601196301060037',
  //         activeState: '0',
  //         dn: '',
  //         type: 'ent',
  //         entPhone: '',
  //         legalName: '刘汉生',
  //         customerType: '2',
  //         entZipCode: '',
  //         password: '',
  //         entProperty: '',
  //         agentPosition: '',
  //         entUrl: '',
  //         id: 'd81d0a8087460ac83dd795ef3ab7a384',
  //         legalMobile: '',
  //         identLevel: '2',
  //         legalCertKey: '',
  //         agentCard: '',
  //         legalMobileKey: '',
  //         entAuthTime: '',
  //         legalCertnoBeginFate: '',
  //         mobilePhoneShow: '',
  //         agentName: '',
  //         entCertLevel: '2',
  //         entAddress: '',
  //         entUnitCode: '123456123456123456',
  //         regTime: '2018-11-07 19:20:00',
  //         mobilePhone: '18671078865',
  //         success: 'true',
  //         entFix: '',
  //         localArea: '',
  //         legalCertType: '',
  //         agentFix: '',
  //         agentPhone: '',
  //         entEmail: '',
  //         regCapital: null,
  //         certKey: '',
  //         regAuthority: '',
  //         authNum: '',
  //         entNature: '',
  //         range: '',
  //         industry: '',
  //         authTime: '2018-11-07 19:20:00',
  //         entLevel: '2',
  //         legalSex: '',
  //         cropKey: '',
  //         entType: '1',
  //         bz13: '',
  //         bz11: '',
  //         bz12: '',
  //         bz1: '',
  //         bz10: '',
  //         bz3: '1',
  //         licenseNumber: '',
  //         bz2: '',
  //         bz5: '',
  //         bz4: '',
  //         regAddress: '',
  //         bz7: '',
  //         bz6: '',
  //         cryptogram: '',
  //         entScope: '',
  //         bz9: '',
  //         bz8: '',
  //         gjEnttype: '',
  //         entTypeStr: 'Enterprise',
  //         userName: '123456123456123456',
  //         legalCertnoEndFate: '',
  //         userId: '132322960233005082',
  //         agentMobile: '',
  //         paidCapital: null,
  //         createTime: 1541589600000,
  //         legalNation: '',
  //         corpStatus: '',
  //         bandzsTime: '2018-11-07 19:20:00'
  //       }
  //     }
  //     resolve(result)
  //   })
  // },
  getUserInfo() {
    return new Promise(resolve => {
      checkAJB.ready(() => {
        AlipayJSBridge.call('getXYUserInfo', {}, result => {
          console.log(result, 'jyu')
          if (
            !result ||
            result == '' ||
            result.sgasession === '' ||
            result.userInfo === ''
          ) {
            // this.userLogin().then(res => {
            //   resolve(res)
            // })
            resolve(result)
          } else {
            resolve(result)
          }
        })
      })
    })
  },

  judgeClientType() {
    var userAgentInfo = navigator.userAgent
    var Agents = [
      'Android',
      'iPhone',
      'SymbianOS',
      'Windows Phone',
      'iPad',
      'iPod'
    ]
    var flag = true
    let clientType = ''
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false
        break
      }
    }
    if (flag) {
      clientType = 'pc'
    } else {
      var u = navigator.userAgent
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      if (isAndroid) {
        // 这个是安卓操作系统
        clientType = 'android'
      }
      if (isIOS) {
        // 这个是ios操作系统
        clientType = 'ios'
      }
      if (u.indexOf('iPad') > -1) {
        clientType = 'ipad'
      }
    }
    return clientType
  }
}

export default checkAJB
