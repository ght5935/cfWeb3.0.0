/**
 * Created by Ethan on 2018/2/28.
 */

import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ReactEcharts from 'echarts-for-react';
import { Table } from 'antd';
import MayLayout from '../../../components/common/Layout/MayLayout';

import styles from './Statistics.less';

const { Column } = Table;
class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnClick: '0',
      faceCount: 0,
      alarmCount: 0
    };
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'expand/getCaptureData'
    });

    this.props.dispatch({
      type: 'expand/getCameraData'
    });

    this.props.dispatch({
      type: 'expand/getTimeTypeCaptureData',
      payload: {
        type: 0
      }
    });
  };
  componentDidMount() {
    setTimeout(() => {
      const data = this.props.expand.staticData.alarmTypeData;
      let faceCount = 0;
      let alarmCount = 0;
      data.map(v => {
        if (v.id == 5) {
          alarmCount = v.value;
        }
        faceCount += v.value
      });
      this.setState({
        faceCount,
        alarmCount
      })
    }, 300)
  }
  onBtnClick = v => {
    this.setState({
      btnClick: v
    });
    this.props.dispatch({
      type: 'expand/getTimeTypeCaptureData',
      payload: {
        type: v - 0
      }
    });
  };
  onEchartsClick = v => {
    // const alarmReason = v.data.alarmReason;
    // const staticData = this.props.expand.staticData;
    // this.props.dispatch({
    //   type: 'expand/success',
    //   payload: {
    //     staticData: {
    //       ...staticData,
    //       alarmList: []
    //     }
    //   }
    // });
    // this.props.dispatch(routerRedux.push(`/statistics/alarmHistory/${v.data.alarmReason}`));
    const arr = this.props.expand.staticData.alarmTypeData
    const staticData = this.props.expand.staticData;
    this.props.dispatch({
      type: 'expand/success',
      payload: {
        staticData: {
          ...staticData,
          alarmList: []
        }
      }
    });
    const i = v.dataIndex;
    this.props.dispatch(routerRedux.push(`/statistics/alarmHistory/${arr[i].id}`));
  }
  pieOption = () => ({
    tooltip: {
      trigger: 'item'
    },
    color: ['#993333', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
    legend: {
      type: 'scroll',
      orient: 'vertical',
      itemWidth: 15,
      itemHeight: 15,
      itemGap: 10,
      top: 5,
      left: 10,
      data: this.props.expand.staticData.alarmTypeData,
      textStyle: {
        color: '#989CA0',
        fontSize: 14,
      },
      pageTextStyle: {
        color: '#fff',
      },
      animation: 'true',
      formatter: function (name) {
        return name
      },

    },
    series: [{
      type: 'pie',
      radius: '60%',
      center: ['70%', '50%'],
      selectedMode: 'single',
      label: {
        normal: {
          show: false
        }
      },
      data: this.props.expand.staticData.alarmTypeData,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  });
  barOption = () => ({
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: this.props.expand.staticData.cultData.map(v => v.camerName),
        axisTick: {
          alignWithLabel: true
        },
        splitLine: {
          lineStyle: {
            color: 'red'
          }
        },
        axisLabel: {
          color: '#b5b5b5'
        },
        axisLine: {
          lineStyle: {
            color: '#b5b5b5'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            color: '#b5b5b5'
          }
        },
        axisLabel: {
          color: '#b5b5b5'
        },
        axisLine: {
          lineStyle: {
            color: '#b5b5b5'
          }
        }
      }
    ],
    series: [
      {
        name: '抓拍人次',
        type: 'bar',
        barWidth: '25%',
        data: this.props.expand.staticData.cultData.map(v => v.count)
      }
    ]
  });
  lineOption = () => ({
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: this.props.expand.staticData.monthTypeData.alarm_1.map(v => v.date),
      axisLabel: {
        color: '#b5b5b5'
      },
      axisLine: {
        lineStyle: {
          color: '#b5b5b5'
        }
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: '#b5b5b5'
        }
      },
      axisLabel: {
        color: '#b5b5b5'
      },
      axisLine: {
        lineStyle: {
          color: '#b5b5b5'
        }
      }
    },
    series: [
      {
        name: this.props.expand.staticData.monthTypeData.alarm_1[0] ? this.props.expand.staticData.monthTypeData.alarm_1[0].groupName : '',
        type: 'line',
        stack: '其他人员',
        data: this.props.expand.staticData.monthTypeData.alarm_1.map(v => v.count)
      },
      {
        name: this.props.expand.staticData.monthTypeData.alarm_2[0] ? this.props.expand.staticData.monthTypeData.alarm_2[0].groupName : '',
        type: 'line',
        stack: '业主',
        data: this.props.expand.staticData.monthTypeData.alarm_2.map(v => v.count)
      },
      {
        name: this.props.expand.staticData.monthTypeData.alarm_3[0] ? this.props.expand.staticData.monthTypeData.alarm_3[0].groupName : '',
        type: 'line',
        stack: '工作人员',
        data: this.props.expand.staticData.monthTypeData.alarm_3.map(v => v.count)
      },
      {
        name: this.props.expand.staticData.monthTypeData.alarm_4[0] ? this.props.expand.staticData.monthTypeData.alarm_4[0].groupName : '',
        type: 'line',
        stack: '访客',
        data: this.props.expand.staticData.monthTypeData.alarm_4.map(v => v.count)
      },
      {
        name: this.props.expand.staticData.monthTypeData.alarm_5[0] ? this.props.expand.staticData.monthTypeData.alarm_5[0].groupName : '',
        type: 'line',
        stack: '黑名单',
        data: this.props.expand.staticData.monthTypeData.alarm_5.map(v => v.count)
      },
      {
        name: this.props.expand.staticData.monthTypeData.alarm_6[0] ? this.props.expand.staticData.monthTypeData.alarm_6[0].groupName : '',
        type: 'line',
        stack: '默认分组',
        data: this.props.expand.staticData.monthTypeData.alarm_6.map(v => v.count)
      }
    ]
  })
  btnClass = v => {
    if (v === this.state.btnClick) {
      return styles.btnActive;
    }
    return '';
  }
  renderDate = (v, i) => v[i].date
  render() {
    const onEvents = {
      'click': this.onEchartsClick,
      'legendselectchanged': this.onChartLegendselectchanged
    };
    return (
      <MayLayout location={this.props.location}>
        <div className={styles.contain}>
          <div className={styles.title}>
            <span>累计抓拍人次：<i>{this.state.faceCount}</i>，报警人次：<i>{this.state.alarmCount}</i></span>
          </div>
          <div className={styles.section}>
            <div className={styles.top}>
              <div className={styles.left}>
                <div className={styles.pieCharts}>
                  <ReactEcharts
                    onEvents={onEvents}
                    option={this.pieOption()}
                    style={{ width: '100%', height: '100%' }}
                    notMerge
                    lazyUpdate
                  />
                </div>
                <div className={styles.pieTable}>
                  {/* <div className={styles.pieLegend}>
                    <p>
                      <span><i className={styles.colorBox} style={{ background: '#2F4554'}} />业主</span>
                      <span><i className={styles.colorBox} style={{background: '#D48265' }} />访客</span>
                      <span><i className={styles.colorBox} style={{background: '#9fdbbf' }} />工作人员</span>
                    </p>
                    <p>
                      <span><i className={styles.colorBox} style={{ background: '#C23531' }} />其他</span>
                      <span><i className={styles.colorBox} style={{ background: '#749f83' }} />黑名单</span>
                      <span><i className={styles.colorBox} style={{ background: '#6AB0B8'}} />默认分组</span>
                    </p>
                  </div> */}
                  <div className={styles.table}>
                    <Table
                      dataSource={this.props.expand.staticData.alarmTypeData}
                      pagination={false}
                      bordered
                    >
                      <Column
                        title="人员类型"
                        dataIndex="name"
                        key="name"
                      />
                      <Column
                        title="抓拍人次"
                        dataIndex="value"
                        key="value"
                      />
                    </Table>
                  </div>

                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.barCharts}>
                  <ReactEcharts
                    option={this.barOption()}
                    style={{ width: '100%', height: '100%' }}
                    notMerge
                    lazyUpdate
                  />
                </div>
                <div className={styles.barTable}>
                  <Table
                    dataSource={this.props.expand.staticData.cultData}
                    pagination={false}
                    bordered
                  >
                    <Column
                      title="社区入口"
                      dataIndex="camerName"
                      key="camerName"
                    />
                    <Column
                      title="抓拍人次"
                      dataIndex="count"
                      key="count"
                    />
                  </Table>
                </div>
              </div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.lineTitle}>
                <div className={styles.btnItems}>
                  <span className={this.btnClass('0')} onClick={this.onBtnClick.bind(this, '0')}>本月</span>
                  <span className={this.btnClass('1')} onClick={this.onBtnClick.bind(this, '1')}>近三月</span>
                  <span className={this.btnClass('2')} onClick={this.onBtnClick.bind(this, '2')}>近半年</span>
                  <span className={this.btnClass('3')} onClick={this.onBtnClick.bind(this, '3')}>近一年</span>
                </div>
                <span className={styles.lineTitleBox}>不同时期的抓拍人次统计</span>
              </div>
              <div className={styles.lineContain}>
                <div className={styles.lineCharts}>
                  <ReactEcharts
                    option={this.lineOption()}
                    style={{ width: '100%', height: '100%' }}
                    notMerge
                    lazyUpdate
                  />
                </div>
                <div className={styles.lineTable}>
                  <Table
                    dataSource={this.props.expand.staticData.monthTypeTable}
                    pagination={false}
                    bordered

                  >
                    <Column
                      title="人员类型"
                      dataIndex="name"
                      key="name"
                    />
                    {this.props.expand.staticData.monthTypeTable[0].data &&
                      this.props.expand.staticData.monthTypeTable[0].data.length > 0 ?
                      this.props.expand.staticData.monthTypeTable[0].data.map((v, i) => (
                        <Column
                          title={this.renderDate(this.props.expand.staticData.monthTypeTable[0].data, i)}
                          dataIndex={`data[${i}].count`}
                          key={`data[${i}].date`}
                        />
                      )
                      ) : ''}
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MayLayout>
    );
  };
}

function mapStateToProps({ expand, bussiness }) {
  return { expand, bussiness };
}

export default connect(mapStateToProps)(Statistics);
