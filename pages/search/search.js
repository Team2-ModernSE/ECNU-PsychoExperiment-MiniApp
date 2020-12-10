const app = getApp()
Page({
  data: {
    tabTxt: ['性别','酬劳','时长'],
    tab: [true,true,true],
    gender_id: 0,
    gender_txt: '',
    price_id: 0,
    price_txt: '',
    time_id: 0,
    time_txt: '',
    time_min:0,
    time_max:1000,
    price_min:0,
    price_max:1000,
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
      url: "../../pages/expInfo1/expInfo1"
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
    var data = [true, true, true],
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
          tab: [true, true, true],
          tabTxt: tabTxt,
          gender_id: id,
          gender_txt: txt
        });
        break;
      case '1':
        tabTxt[1] = txt;
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          price_id: id,
          price_txt: txt
        });
        break;
      case '2':
        tabTxt[2] = txt;
        self.setData({
          tab: [true, true, true],
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
    const db = wx.cloud.database();
    const _ = db.command;
    //var price_min;
    //var price_max;
    //var time_min;
    //var time_max;
    var sex_tag;
    if(this.data.gender_id==='0'){
      sex_tag = '不限';
    }
    else if(this.data.gender_id==='1'){
      sex_tag = '男';
    }
    else if(this.data.gender_id==='2'){
      sex_tag = '女';
    }
    else
    //价钱的上下限，从id转换
    if(this.data.price_id==='0'){
      this.data.price_min = 0;
      this.data.price_max = 1000;
    }
    else if(this.data.price_id==='1'){
      this.data.price_min = 0;
      this.data.price_max = 30;
    }
    else if(this.data.price_id==='2'){
      this.data.price_min = 31;
      this.data.price_max = 60;
    }
    else if(this.data.price_id==='3'){
      this.data.price_min = 61;
      this.data.price_max = 90;
    }
    else if(this.data.price_id==='4'){
      this.data.price_min = 91;
      this.data.price_max = 1000;
    }
    else{
      this.data.price_min = 0;
      this.data.price_max = 1000;
    }
    //设定时间上下限
    if(this.data.time_id==='0'){
      this.data.price_min = 0;
      this.data.price_max = 1000;
    }
    else if(this.data.time_id==='1'){
      this.data.time_min = 0;
      this.data.time_max = 30;
    }
    else if(this.data.time_id==='2'){
      this.data.time_min = 31;
      this.data.time_max = 60;
    }
    else if(this.data.time_id==='3'){
      this.data.time_min = 61;
      this.data.time_max = 90;
    }
    else if(this.data.time_id==='4'){
      this.data.time_min = 91;
      this.data.time_max = 1000;
    }
    else{
      this.data.time_min = 0;
      this.data.time_max = 1000;
    }
    if(this.data.gender_id==='0'){
      db.collection('experiment').where({
        //sex: sex_tag,
        //money:_.gte(90).and(_.lte(1000))
        money: _.gte(this.data.price_min).and(_.lte(this.data.price_max)),
        time: _.gte(this.data.time_min).and(_.lte(this.data.time_max))
      })
      .get({
        success: function(res) {
          // res.data 是包含以上定义的两条记录的数组
          console.log(res.data)
        }
      })
    }
    else{
    db.collection('experiment').where({
      sex: sex_tag,
      //money:_.gte(90).and(_.lte(1000))
      money: _.gte(this.data.price_min).and(_.lte(this.data.price_max)),
      time: _.gte(this.data.time_min).and(_.lte(this.data.time_max))
    })
    .get({
      success: function(res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data)
      }
    })
  }
  }

})