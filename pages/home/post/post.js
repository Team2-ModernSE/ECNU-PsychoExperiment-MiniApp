const app = getApp();
Page({
	data: {
    id: '',
		isLoading: true,					// 判断是否尚在加载中
		article: {}						// 内容数据
	},
	onLoad: function () {
    wx.getStorage({
      key: 'postInfo',
      success: res=>{
        wx.cloud.downloadFile({
          fileID: res.data.content,
          success: res => {
            // 返回临时文件路径
            wx.getFileSystemManager().readFile({  //读取文件
              filePath: res.tempFilePath,
              encoding: 'utf-8',
              success: res => {
                let result = app.towxml(res.data,'markdown');
                this.setData({
                  article:result,
                  isLoading: false
                });
              },
              fail: console.error
            })
          }
        })
      }
    })
  }
})
    