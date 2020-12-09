// pages/release/release.js
let f = length => Array.from({length}).map((v,k) => k);
Page({
  data: {
    name:"",
    sex:['不限','男','女'],
    index_sex:0,
    grade:['不限','16级','17级','18级','19级','20级'],
    index_grade:0,
    age:['不限','0-16岁','17-18岁','19-20岁','20-24岁','24岁以上'],
    index_age:0,
    date:'0000-00-00',
    time:"00:00",
    address:"",
    duration:f(300),
    index_dur:0,
    money:f(200),
    index_mon:0,
    type_array:[["线上","线下"],["问卷"]],
    type_index:[0,0],
    contact:"",
    others:""
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
  changeAge(e){
    this.setData({
      index_age:e.detail.value
    })
  },
  timeChange(e){
    this.setData({
      time:e.detail.value
    })
  },
  dateChange(e){
    this.setData({
      date:e.detail.value
    })
  },
  durationChange(e){
    this.setData({
      index_dur:e.detail.value
    })
  },
  addressInput(e){
    this.setData({
      address:e.detail.value
    })
  },
  moneyChange(e){
    this.setData({
      index_mon:e.detail.value
    })
  },
  typeChange(e){
    this.setData({
      type_index: e.detail.value
    })
  },
  typeColumnChange(e){
    var data = {
      type_array: this.data.type_array,
      type_index: this.data.type_index
    };
    data.type_index[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.type_index[0]) {
          case 0:
            data.type_array[1]=["问卷"];
            break;
          case 1:
            data.type_array[1]=["需要配戴脑电仪器","无需配戴脑电仪器"];
            break;
        }
        data.type_index[1] = 0;
        break;
    }
    this.setData(data)
  },
  contactInput(e){
    this.setData({
      contact: e.detail.value
    })
  },
  othersInput(e){
    this.setData({
      others: e.detail.value
    })
  },
  return:function(){
    wx.navigateBack({
      delta:1
    })
  }
})