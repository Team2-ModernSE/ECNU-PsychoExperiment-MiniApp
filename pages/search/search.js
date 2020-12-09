Page({
  data: {

  },
  release:function(){
    wx.navigateTo({
      url:"../../pages/release/release"
    })
  },
  screening:function(){
    wx.navigateTo({
      url:"../../pages/screening/screening"
    })
  },
  toExp:function(){
    wx.navigateTo({
      url:"../../pages/exp1/exp1"
    })
  },
  //刷新
  onRefresh(){
    //在当前页面显示导航条加载动画
    wx.showNavigationBarLoading(); 
    //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
    wx.showLoading({
      title: '刷新中...',
    })
    this.getData();
  },
//网络请求，获取数据
getData(){
  wx.request({
        url: '../../pages/search/search',
        //网络请求执行完后将执行的动作
        complete(res){
            //隐藏loading 提示框
            wx.hideLoading();
            //隐藏导航条加载动画
            wx.hideNavigationBarLoading();
            //停止下拉刷新
            wx.stopPullDownRefresh();
        }
  })   
},
/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function () {
    //调用刷新时将执行的方法
  this.onRefresh();
}
})