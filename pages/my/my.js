// pages/my/my.js
const app = getApp()
const db = wx.cloud.database()
Page({  
  data: {
    userinfo: null,
    name:"",
    sex:'',
    stuNumber: "",
    isExaminer: true,
  },
  onShow(){
    wx.getUserInfo({
      success: res=>{
        this.setData({
          userinfo: res.userInfo
        })
      }
    })
    db.collection('user').where({
      _openid: app.globalData.openid
    })
    .get({
      success: res=>{
        this.setData({
          name: res.data[0].name,
          sex: res.data[0].gender,
          stuNumber: res.data[0].stuNumber,
          isExaminer: res.data[0].isExaminer
        })
      }
    })
  },
  /*
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
  * 弹出框蒙层截断touchmove事件
  */
 /*
  preventTouchMove: function () {
  },
  /** 
  * 隐藏模态对话框
  */
  /*
  hideModal: function () {
  this.setData({
  showModal: false
  });
  },
  /**
  * 对话框取消按钮点击事件
  */
 /*
  onCancel: function () {
  this.hideModal();
  },
  /**
  * 对话框确认按钮点击事件
  */
  /*
   onConfirm: function () {
    wx.showToast({
   title: '提交成功',
   icon: 'success',
   duration: 2000
   })
   this.hideModal();
   },
   nameInput(e){
    this.setData({
      name:e.detail.value
    })
  },
  changeSex(e){
    this.setData({
      index_sex:e.detail.value
    })
  },
  changeGrade(e){
    this.setData({
      index_grade:e.detail.value
    })
  },
  ageInput(e){
    this.setData({
      age:e.detail.value
    })
  }
  */
})