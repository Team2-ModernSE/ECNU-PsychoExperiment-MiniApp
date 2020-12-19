// pages/exp1/exp1.js
const db = wx.cloud.database()
const _ = db.command
const app=getApp()
var formater=require("../../utils/formatTime")

Page({
  data: {
    id: null,
    name: '',
    gender: '',
    expireDate: '',
    availableDate: [],
    availableDateStr: '',
    duration: '',
    location: '',
    money: '',
    contact: '',
    others: '',
    examineeContact: "",
    examineeOthers: '',
    examineeSelectedDate: null,
    examineeSelectedDateStr: '',
    examinerId: ''
  },
  onLaunch: function(){
    
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    db.collection('experiment').where({
        _id: this.data.id
      })
      .get({
        success: res => {
          this.setData({
            name: res.data[0].name,
            gender: res.data[0].sex,
            availableDate: res.data[0].availableDate,
            expireDate: formater.formatTime(res.data[0].expireDate,"Y-M-D"),
            duration: res.data[0].time+"分钟",
            location: res.data[0].location,
            money: res.data[0].money + "元",
            contact: res.data[0].contact,
            others: res.data[0].others,
            examinerId: res.data[0].examinerId
          })
          var myAvailableDateStr = ""
          for (var i in this.data.availableDate) {
            if (i != (this.data.availableDate).length - 1)
              myAvailableDateStr += (formater.formatTime(this.data.availableDate[i], "Y-M-D")+'\n')
            else
              myAvailableDateStr += formater.formatTime(this.data.availableDate[i], "Y-M-D")
          }
          this.setData({
            availableDateStr: myAvailableDateStr
          })
          wx.setStorage({
            data: this.data.availableDate,
            key: 'examineeAvailableDate'
          })
        }
      })
  },
  onShow: function () {
    wx.getStorage({
      key: 'examineeSelectedDate',
      success: res=>{
        res.data=new Date(res.data)
        this.setData({
          examineeSelectedDate: res.data,
          examineeSelectedDateStr: formater.formatTime(res.data,'Y-M-D')
        })
      },
      fail: err=>{
        this.setData({
          examineeSelectedDateStr: "点击选择可用日期"
        })
      }
    })
  },
  examineeContactInput: function(e){
    this.setData({
      examineeContact: e.detail.value
    })
  },
  examineeOthersInput: function(e){
    this.setData({
      examineeOthers: e.detail.value
    })
  },
  submitTap: function(){
    if(this.data.examineeContact==''){
      wx.showToast({
        title: '请输入联系方式',
        icon: 'none',
        duration: 2000,
        mask: true
      });
    }
    else if(this.data.examineeSelectedDate==null){
      wx.showToast({
        title: '请选择日期',
        icon: 'none',
        duration: 2000,
        mask: true
      });
    }
    else{
      db.collection('order').where({
        expId: this.data.id,
        examineeId: app.globalData.openid
      }).get({
        success: res=>{
          if(res.data.length){
            wx.showToast({
              title: '您已经申请过该实验，请勿重复申请',
              icon: 'none',
              duration: 2000,
              mask: true
            });
          }
          else{
            db.collection('order').add({
              data:{
                expId: this.data.id,
                examineeId: app.globalData.openid,
                isAccepted: '0',
                examineeSelectedDate: this.data.examineeSelectedDate,
                comment: '',
                contact: this.data.examineeContact,
                others: this.data.examineeOthers,
                examinerId: this.data.examinerId
              }
            })
            db.collection('user').where({
              _openid: app.globalData.openid
            })
            .update({
              data:{
                joinedExp: _.push(this.data.id)
              },
              success: res=>{
                wx.removeStorage({
                  key: 'examineeAvailableDate',
                })
                wx.removeStorage({
                  key: 'examineeSelectedDate',
                })
                wx.showModal({ //弹出提示框
                  title: '提示',
                  content: '申请提交成功',
                  showCancel: false,
                  confirmText: '返回',
                  success: res=> {
                    if (res.confirm) {
                      wx.navigateBack({
                        delta: 1
                      })
                    }
                  }
                });
              },
              fail: res=>{
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
    }
  },
  return: function () {
    wx.navigateBack({
      delta: 1
    });
  }
})