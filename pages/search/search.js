Page({
  data: {
    tabTxt: ['性别', '年级', '酬劳','时长'],
    tab: [true, true, true,true],
    gender_id: 0,
    gender_txt: '',
    grade_id: 0,
    grade_txt: '',
    price_id: 0,
    price_txt: '',
    time_id: 0,
    time_txt: ''
  },
  release: function () {
    wx.navigateTo({
      url: "../../pages/release/release"
    })
  },
  screening: function () {
    wx.navigateTo({
      url: "../../pages/screening/screening"
    })
  },
  toExp: function () {
    wx.navigateTo({
      url: "../../pages/exp1/exp1"
    })
  },
  //刷新
  onRefresh() {
    //在当前页面显示导航条加载动画
    wx.showNavigationBarLoading();
    //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
    wx.showLoading({
      title: '刷新中...',
    })
    this.getData();
  },
  //网络请求，获取数据
  getData() {
    wx.request({
      url: '../../pages/search/search',
      //网络请求执行完后将执行的动作
      complete(res) {
        //隐藏loading 提示框
        wx.hideLoading();
        //隐藏导航条加载动画
        wx.hideNavigationBarLoading();
        //停止下拉刷新
        wx.stopPullDownRefresh();
      }
    })
  },
  filterTab: function (e) {
    var data = [true, true, true, true],
    index = e.currentTarget.dataset.index;
    data[index] = !this.data.tab[index];
    this.setData({
      tab: data
    })
  },

  //筛选项点击操作
  filter: function (e) {
    var self = this,
    id = e.currentTarget.dataset.id,
    txt = e.currentTarget.dataset.txt,
    tabTxt = this.data.tabTxt;
    switch (e.currentTarget.dataset.index) {
      case '0':
        tabTxt[0] = txt;
        self.setData({
          tab: [true, true, true, true],
          tabTxt: tabTxt,
          gender_id: id,
          gender_txt: txt
        });
        break;
      case '1':
        tabTxt[1] = txt;
        self.setData({
          tab: [true, true, true, true],
          tabTxt: tabTxt,
          grade_id: id,
          grade_txt: txt
        });
        break;
      case '2':
        tabTxt[2] = txt;
        self.setData({
          tab: [true, true, true, true],
          tabTxt: tabTxt,
          price_id: id,
          price_txt: txt
        });
        break;
      case '3':
        tabTxt[3] = txt;
        self.setData({
          tab: [true, true, true, true],
          tabTxt: tabTxt,
          time_id: id,
          time_txt: txt
        });
        break;
    }
    //数据筛选
    self.getDataList();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //调用刷新时将执行的方法
    this.onRefresh();
  },
  getDataList: function () {
    //调用数据接口，获取数据

  }

})