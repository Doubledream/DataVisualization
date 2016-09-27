// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

//补零
function PrefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}
//大数值加逗号
function separator(value){
    if(value > 1000000){
        return parseInt(value / 1000000) + ',' + parseInt(value / 1000) + ',' + PrefixInteger(value % 1000, 3);
    }else if(value > 1000){
        return parseInt(value / 1000) + ',' + PrefixInteger(value % 1000, 3);
    }else{
        return value;
    } 
}

var dataTooltip = document.getElementById('data-tooltip');
var dataBtn = document.getElementById('data-click-btn');
dataBtn.onclick = function(){
    dataTooltip.style.display = 'block';
    dataTooltip.style.position = 'absolute';
    var left = document.getElementById('data-select').offsetLeft;
    var top = document.getElementById('data-select').offsetTop;
    dataTooltip.style.left = left + 50 + 'px';
    dataTooltip.style.top = top + 25 + 'px';
    var list = document.getElementsByTagName('li');
    list[3].onclick = function(){
        var option = {
            xAxis: {
                axisLabel: {
                    interval: 0
                },                
                data: ['2016年33周','2016年34周','2016年35周','2016年36周','2016年37周']
            },
            yAxis: [
            {
                min: 0,
                max: 4400000,
                interval: 1100000,
                axisLabel: {
                    formatter: function(value,index){
                        if(!index){
                            return value;
                        }else{
                            return value / 1000000 + 'M';
                        }                    
                    }
                }
            },
            {
                min: 0,
                max: 960,
                interval: 240,
            }],
            series: [
            {
                data: [1223495, 2649725, 2895110, 2681695, 2748365]
            },
            {
                data: [1446690, 3646975, 3518665, 3526950, 3488750]
            },
            {
                data: [11127, 25239, 26015, 24361, 28049]
            },
            {
                data: [14857, 33513, 31224, 25118, 34128]
            },
            {
                data: [329.32, 737.01, 781.19, 773.25, 691.01]
            },
            {
                data: [292.62, 759.79, 793.3, 707.13, 718.52]
            },
            ]       
        };
        myChart.setOption(option);
        setTimeout(function(){
            document.getElementById('data-info').innerHTML = '日期（按周）';
            dataTooltip.style.display = 'none';
        },100);
    }
}
// 指定图表的配置项和数据
var option = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis',
        backgroundColor: '#FFF',
        borderColor: '#f1f3f5',
        borderWidth: 1,
        padding: [15, 20],
        axisPointer: {
            type: 'line',
            lineStyle: {
                color: '#FFF'
            }
        },
        position: function(p){
            return [p[0] - 300, p[1] - 50];
        },
        formatter: function(params){
            var b = params[0].name;
//            console.log(params.length);
            var a = [];
            var c = [];
            var html = '';
            for(var i = 0; i < params.length; i++){
                a[i] = params[i].seriesName;
                c[i] = params[i].value;
                c[i] = separator(c[i]);
                switch(a[i]){
                    case 'iOS充值金额':
                        html += '<div class="tooltip indent" style="color:#5484E1;">' + a[i] + ':  ' + c[i] + '</div>';
                        break;
                    case 'Android充值金额': 
                        html += '<div class="tooltip" style="color:#FEAE22;">' + a[i] + ':  ' + c[i] + '</div>';
                        break;
                    case 'iOS充值人数':
                        html += '<div class="tooltip indent" style="color:#008B40;">' + a[i] + ':  ' + c[i] + '</div>';
                        break;
                    case 'Android充值人数':
                        html += '<div class="tooltip" style="color:#FC4900;">' + a[i] + ':  ' + c[i] + '</div>';
                        break;
                    case 'iOS人均充值':
                        html += '<div class="tooltip indent" style="color:#83C86E;">' + a[i] + ':  ' + c[i] + '</div>';
                        break;
                    case 'Android人均充值':
                        html += '<div class="tooltip" style="color:#65AEED;">' + a[i] + ':  ' + c[i] + '</div>';
                        break;
                    default:
                        break; 
                }
            }
            var html0 = '<div style="color:#666;text-align:center">' + b + '</div>';
            return html0 + html;
        },
        textStyle: {
            fontFamily: '微软雅黑',
            fontSize: 16,
            color: '#000',
            fontWeight: 'bold'
        }
    },
    legend: {
        orient: 'vertical',
        right: '2%',
        top: '20%',
        textStyle: {
            color: '#666',
            fontSize: 16,
            fontFamily: '微软雅黑'
        },
        formatter: function(name){
            return echarts.format.truncateText(name, 100, '14px 微软雅黑','...');
        },
        tooltip: {
            show: false
        },
        data:[{
            name: 'iOS充值金额',
            icon: 'circle'
        },
        {
            name: 'Android充值金额',
            icon: 'circle',
        },
        {
            name: 'iOS充值人数',
            icon: 'circle'
        },
        {
            name: 'Android充值人数',
            icon: 'circle'
        },
        {
            name: 'iOS人均充值',
            icon: 'line'
        },
        {
            name:'Android人均充值',
            icon: 'line'
        }]
    },
    grid: {
        left: '10%',
        right: '24%'
    },
    xAxis: {
        type: 'category',
        axisLine: {
            lineStyle: {
                color: '#B3B3B3',
                width: 3
            }
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            interval: function (index) {
                if(index%7 == 3){
                    return true;
                }else{
                    return false;
                }
            },
            margin: 15,
            textStyle: {
                color: '#666',
                fontSize: 16
            }
        },
        data: ['2016年8月19日','2016年8月20日','2016年8月21日','2016年8月22日','2016年9月23日','2016年8月24日','2016年8月25日',
               '2016年8月26日','2016年8月27日','2016年8月28日','2016年8月29日','2016年8月30日','2016年8月31日','2016年9月1日',
               '2016年9月2日','2016年9月3日','2016年9月4日','2016年9月5日','2016年9月6日','2016年9月7日','2016年9月8日',
               '2016年9月9日','2016年9月10日','2016年9月11日','2016年9月12日','2016年9月13日','2016年9月14日','2016年9月15日',
               '2016年9月16日','2016年9月17日','2016年9月18日']
    },
    yAxis: [
        {
            type: 'value',
            name: 'iOS充值金额',
            nameLocation: 'middle',
            nameTextStyle: {
                color: '#888',
                fontSize: 18
            },
            nameGap: 80,
            min: 0,
            max: 680000,
            interval: 170000,
            axisLabel: {
                margin: 15,
                textStyle: {
                    color: '#666',
                    fontSize: 16
                },
                formatter: function(value,index){
                    if(!index){
                        return value;
                    }else{
                        return value / 1000 + 'K';
                    }                    
                }
            },
            axisLine:{
                show: false
            },
            splitLine:{
                show: false
            },
            axisTick: {
                show: false
            }
        },
        {
            type: 'value',
            name: 'iOS人均充值',
            nameLocation: 'middle',
            nameTextStyle: {
                color: '#888',
                fontSize: 18
            },
            nameRotate: -90,
            nameGap: 80,
            min: 0,
            max: 160,
            interval: 40,
            axisLabel: {
                margin: 15,
                textStyle: {
                    color: '#666',
                    fontSize: 16
                }
            },
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        }
    ],
    series: [
        {
            name: 'iOS充值金额',
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter: function(params){
                        console.log(params.dataIndex);
                        return separator(params.value);
                    },
                    textStyle: {
                        color: '#666',
                        fontWeight: 'bolder',
                        fontSize: 16
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#5484E1'
                }
            },
            data: [436225, 432050, 355220, 353880, 422535, 362530, 407530, 350305, 394560, 358385, 
                   414680, 414735, 440630, 410385, 390265, 416975, 407440, 384420, 363140, 392385, 
                   437440, 379015, 355175, 370120, 395625, 405170, 425060, 391505, 375115, 395625,  
                   360265]
        },
        {
            name: 'Android充值金额',
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter: function(params){
                        return separator(params.value);
                    },
                    textStyle: {
                        color: '#666',
                        fontWeight: 'bolder',
                        fontSize: 16
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#FEAE22'
                }
            },
            data: [489955, 482960, 473775, 512535, 536270, 532750, 542975, 480695, 537360, 504390,
                   505310, 485395, 516050, 547180, 517040, 477370, 470320, 510925, 514205, 531405,
                   465715, 517110, 507045, 480545, 516360, 511825, 496860, 474480, 475750, 494375,
                   519100]
        },
        {
            name: 'iOS充值人数',
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter: function(params){
                        return separator(params.value);
                    },
                    textStyle: {
                        color: '#666',
                        fontWeight: 'bolder',
                        fontSize: 16
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#008B40'
                }
            },
            data: [3945, 3805, 3377, 3463, 3412, 3965, 3898, 3450, 3580, 3471,
                   3679, 3456, 3553, 3963, 3599, 4000, 3765, 3397, 3465, 3319,
                   3407, 3342, 3753, 3678, 4035, 3953, 3695, 3965, 3728, 3993,
                   4680]
        },
        {
            name: 'Android充值人数',
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter: function(params){
                        return separator(params.value);
                    },
                    textStyle: {
                        color: '#666',
                        fontWeight: 'bolder',
                        fontSize: 16
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#FC4900'
                }
            },
            data: [5264, 4723, 4870, 4009, 5215, 4890, 4258, 5360, 4947, 4834,
                   5183, 4044, 4112, 4582, 4279, 4532, 4492, 4319, 5127, 4993,
                   5271, 4851, 5225, 5332, 4618, 4725, 5455, 5050, 4954, 4580,
                   4746]
        },
        {
            name: 'iOS人均充值',
            type: 'line',
            yAxisIndex: 1,
            symbol: 'none',
            itemStyle: {
                normal: {
                    color: '#83C86E'
                }
            },
            lineStyle: {
                normal: {
                    width: 3
                }
            },
            data: [110.58, 113.55, 105.19, 102.19, 123.84, 91.43, 104.55, 101.54, 110.21, 103.25,
                   112.72, 120.00, 124.02, 103.55, 108.44, 104.24, 108.22, 113.16, 104.80, 118.22,
                   128.39, 113.41, 94.64, 100.63, 98.05, 102.50, 115.04, 98.74, 100.62, 99.08,
                   76.98]
        },
        {
            name: 'Android人均充值',
            type: 'line',
            yAxisIndex: 1,
            symbol: 'none',
            itemStyle: {
                normal: {
                    color: '#65AEED'
                }
            },
            lineStyle: {
                normal: {
                    width: 4
                }
            },
            data: [93.08, 102.26, 97.28, 127.85, 102.83, 108.95, 127.52, 89.68, 108.62, 104.34,
                   97.49, 120.03, 125.50, 119.42, 120.83, 105.33, 104.70, 118.30, 100.29, 106.43,
                   88.35, 106.60, 97.04, 90.12, 111.81, 108.32, 91.08, 93.96, 96.03, 107.94,
                   109.38]
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);