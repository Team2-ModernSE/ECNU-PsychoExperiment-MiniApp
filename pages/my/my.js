// pages/my/my.js
const app = getApp()
Page({  
  data: {
    userinfo: null,
    name:"",
    sex:['男','女'],
    index_sex:0,
    grade:['16级','17级','18级','19级','20级'],
    index_grade:0,
    age:0
  },
  onShow(){
    const userInfo = app.globalData.userInfo 
    this.setData({userinfo:userInfo}) 
  },
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
  * 弹出框蒙层截断touchmove事件
  */
  preventTouchMove: function () {
  },
  /** 
  * 隐藏模态对话框
  */
  hideModal: function () {
  this.setData({
  showModal: false
  });
  },
  /**
  * 对话框取消按钮点击事件
  */
  onCancel: function () {
  this.hideModal();
  },
  /**
  * 对话框确认按钮点击事件
  */
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
})