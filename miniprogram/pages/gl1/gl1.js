import * as echarts from '../../components/ec-canvas/echarts';
let chart = null;
var option = {
  backgroundColor: "#ffffff",
  series: [{
    label: {
      normal: {
        fontSize: 10
      }
    },
    type: 'pie',
    center: ['50%', '50%'],
    radius: ['20%', '40%'],
    data: [{
      value: '',
      name: ''
    },{
      value: '',
      name: ''
    }]
  }]
};

// chart.setOption(option);
// return chart;
//图表
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  const db = wx.cloud.database({});

   // 计算现在时间
  var myDate = new Date(); //现在时间
    var xs = myDate.getHours(); //现在时间获取小时
    //console.log(xs)
    var fz = myDate.getMinutes();
    //console.log(fz)
    var nowDate = xs * 60 + fz; //现在时间分钟数
    var now = 0;
   // var nowDate = 45;
    console.log(nowDate)
    // sjxx: [["7:50-9:30"], ["9:30-11:30"], ["11:30-15:40"], ["15:40-17:40"], ["17:40-21:00"]],
    if (nowDate < 570) { //["7:50-9:30"] 0
      now = 0;
    } else if (nowDate < 690) { //["9:30-11:30"] 1
      now = 1;
    } else if (nowDate < 940) { //["11:30-15:40"] 2
      now = 2;
    } else if (nowDate < 1060) { //["15:40-17:40"] 3 
      now = 3;
    } else if (nowDate < 1260) { // ["17:40-21:00"] 4
      now = 4;
    } 
     // 计算现在时间
     var len=0;
     const con = db.collection('tsgzw').where({
      lc0:String("一楼图书室2")
    });
     con.get({
      success(res) {
        console.log(res.data) 
        len=res.data.length;
        // len为所有数据
        console.log(len) 
      
    
  const cont = db.collection('tsgzw').where({
    ['sj.' + now + '.0']: 0,
    lc0:String("一楼图书室2")
  });
  cont.get({
    success(res) {
      console.log(res.data) 
      const name2='空闲';
      const num2=res.data.length;
      const name1='占用';
      const num1=len-num2;
      // for(var i=0;i<res.data.length;i++){
        
      // }
      
      option.series[0].data[0].name=name1;
      option.series[0].data[0].value=num1;
      option.series[0].data[1].name=name2;
      option.series[0].data[1].value=num2;
      console.log( option.series[0]);
      console.log( option.series[0].data[1].name);
      chart.setOption(option);
      return chart;
    }
  })
}
})
}




Page({

  _handgl:function(res){
    wx.navigateTo({
      url: '../../pages/zwgll/zwgll',
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      // console.log(chart)
    }, 2000);
  }
});
