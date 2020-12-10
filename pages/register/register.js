// pages/register/register.js
const app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: { //初始化数据
    genderArray: ['男', '女'],
    genderIndex: 0,
    examinerArray: ['否', '是'],
    examinerIndex: 0,
    name: '',
    stuNumber: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  nameInput: function (e) { //获取姓名输入
    this.setData({
      name: e.detail.value
    })
  },

  stuNumberInput: function (e) {
    this.setData({
      stuNumber: e.detail.value
    })
  },

  bindGenderChange: function (e) { //监听年级选择
    this.setData({
      genderIndex: e.detail.value
    })
  },

  bindExaminerChange: function (e) { //监听身份选择
    this.setData({
      examinerIndex: e.detail.value
    })
  },

  submitTap: function () {
    var submitName = this.data.name;
    var submitStuNumber = this.data.stuNumber;
    var submitGender = this.data.genderArray[this.data.genderIndex];
    var submitIsExaminer = this.data.handIndex == 0 ? false : true
    if (submitName == '') { //检测输入是否合法
      wx.showToast({
        title: '请输入真实姓名',
        icon: 'none',
        duration: 2000,
        mask: true
      });
    } else if (submitStuNumber == "") {
      wx.showToast({
        title: '请输入学号',
        icon: 'none',
        duration: 2000,
        mask: true
      });
    } else {
      db.collection('user').add({ //向数据库中插入数据
        data: {
          name: submitName,
          stuNumber: submitStuNumber,
          gender: submitGender,
          isExaminer: submitIsExaminer,
          createdExp: [],
          joinedExp: []
        },
        success: function (res) { //插入成功
          console.log(res)
          wx.showModal({ //弹出提示框
            title: '提示',
            content: '个人信息完善成功',
            showCancel: false,
            confirmText: '回到首页',
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../../pages/home/home',
                })
              }
            }
          });
        },
        fail: function (res) { //插入失败，弹出提示框
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