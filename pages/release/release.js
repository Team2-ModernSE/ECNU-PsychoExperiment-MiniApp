// pages/release/release.js
const db = wx.cloud.database()
const _ = db.command
const app = getApp()
var formater = require("../../utils/formatTime")

Page({
  data: {
    name: "",
    sex: ['不限', '男', '女'],
    index_sex: 0,
    expireDate: '0000-00-00',
    address: "",
    duration: 0,
    money: 0,
    contact: "",
    others: "",
    availableDate: [],
    availableDateStr: ''
  },
  onLoad: function () {
    db.collection('user').where({
        _openid: app.globalData.openid
      })
      .get({
        success: function (res) {
          if (!res.data[0].isExaminer) {
            wx.showModal({
              title: '警告',
              content: '您暂无权限，请联系管理员',
              showCancel: false,
              confirmText: '返回',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              }
            });
          }
        }
      })
  },
  onShow: function () {
    wx.getStorage({
      key: 'expDate',
      success: res => {
        for (var i in res.data) {
          res.data[i] = new Date(res.data[i])
        }
        (res.data)
        this.setData({
          availableDate: res.data
        })
        var myAvailableDateStr = ""
        for (var i in res.data) {
          if (i != res.data.length - 1)
            myAvailableDateStr += (formater.formatTime(res.data[i], "Y-M-D") + '\n')
          else
            myAvailableDateStr += formater.formatTime(res.data[i], "Y-M-D")
        }
        this.setData({
          availableDateStr: myAvailableDateStr
        })
      },
      fail: err => {
        this.setData({
          availableDateStr: '请选择实验日期'
        })
      }
    })
  },
  nameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  changeSex(e) {
    this.setData({
      index_sex: e.detail.value
    })
  },
  /*
  timeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  */
  dateChange(e) {
    this.setData({
      expireDate: e.detail.value
    })
  },
  durationInput(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  addressInput(e) {
    this.setData({
      address: e.detail.value
    })
  },
  moneyInput(e) {
    this.setData({
      money: e.detail.value
    })
  },
  contactInput(e) {
    this.setData({
      contact: e.detail.value
    })
  },
  othersInput(e) {
    this.setData({
      others: e.detail.value
    })
  },
  return: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  submitTap: function () {
    var submitName = this.data.name;
    var submitGender = this.data.sex[this.data.index_sex];
    var submitExpireDate = new Date((this.data.expireDate).replace(/-/g, "/") + ' 23:59:59')
    var submitDuration = parseInt(this.data.duration)
    var submitLocation = this.data.address;
    var submitMoney = parseInt(this.data.money);
    var submitContact = this.data.contact;
    var submitOthers = this.data.others;
    var submitAvailableDate = this.data.availableDate;

    if (submitName == "") {
      wx.showToast({
        title: '请输入合法的实验名称',
        icon: 'none',
        duration: 2000,
        mask: true
      });
    } else if (!submitAvailableDate.length || submitAvailableDate == null) {
      wx.showToast({
        title: '请输入实验日期',
        icon: 'none',
        duration: 2000,
        mask: true
      });
    } else if (submitExpireDate < new Date() || submitExpireDate.toDateString() == "Invalid Date" || submitExpireDate > submitAvailableDate[submitAvailableDate.length - 1]) {
      wx.showToast({
        title: '请输入合法的截止日期',
        icon: 'none',
        duration: 2000,
        mask: true
      });
    } else if (submitDuration.toString() == "NaN" || submitDuration == null || submitDuration == 0) {
      wx.showToast({
        title: '请输入合法的实验时长',
        icon: 'none',
        duration: 2000,
        mask: true
      });
    } else if (submitLocation == "") {
      wx.showToast({
        title: '请输入合法的实验地点',
        icon: 'none',
        duration: 2000,
        mask: true
      });
    } else if (submitMoney.toString() == "NaN" || submitMoney == null) {
      wx.showToast({
        title: '请输入合法的实验酬劳',
        icon: 'none',
        duration: 2000,
        mask: true
      });
    } else if (submitContact == "") {
      wx.showToast({
        title: '请输入合法的联系方式',
        icon: 'none',
        duration: 2000,
        mask: true
      });
    } else {
      db.collection('experiment').add({
        data: {
          name: submitName,
          sex: submitGender,
          expireDate: submitExpireDate,
          availableDate: submitAvailableDate,
          time: submitDuration,
          location: submitLocation,
          money: submitMoney,
          contact: submitContact,
          others: submitOthers,
          examinerId: app.globalData.openid,
          isActive: true
        },
        success: function (res) {
          db.collection('user').where({
              _openid: app.globalData.openid
            })
            .update({
              data: {
                createdExp: _.push(res._id)
              }
            })
          wx.showModal({ //弹出提示框
            title: '提示',
            content: '实验创建成功',
            showCancel: false,
            confirmText: '返回',
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                })
              }
              wx.removeStorage({
                key: 'expDate',
              })
            }
          });
        },
        fail: function () { //插入失败，弹出提示框
          wx.showModal({
            title: '注意',
            content: '提交失败，请重试',
            showCancel: false,
            confirmText: '重试'
          })
        }
      })
    }
  }
})