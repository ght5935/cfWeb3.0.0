/**
 * Created by Jason on 2018/3/23.
 */
import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import MayLayout from '../../../components/common/Layout/MayLayout';
import { Input, Button, Upload, Icon, message, Card, Progress, Spin } from 'antd';
import styles from './ImgRetrieve.less';
import { API_PREFIX } from '../../../utils/config';

class PersonMap extends React.Component {
  constructor(props) {
    super(props);
    let longtitude;
    let lantitude;
    let markers = [];


    if (this.props.expand.faceToPoi.matchFaceList && this.props.expand.faceToPoi.matchFaceList.length > 0) {
      markers = this.props.expand.faceToPoi.matchFaceList;
      const point = this.props.expand.faceToPoi.matchFaceList[0];
      if (point.coordinate)
        point.coordinate = point.coordinate.replace('，', ',');
      const crd = point.coordinate ? point.coordinate.split(',') : [116.404, 39.915];
      longtitude = crd[0];
      lantitude = crd[1];
    }
    this.state = {
      markers,
      longtitude: longtitude || 116.404,
      lantitude: lantitude || 39.915
    };
  }
  componentDidMount() {
    // const x = 121.522058;
    // const y = 31.305645;
    const BMap = new window.BMap.Map('allMap');

    const x = this.state.longtitude;
    const y = this.state.lantitude;
    const ggPoint = new window.BMap.Point(x, y);
    BMap.centerAndZoom(ggPoint, 15);
    // const markergg = new window.BMap.Marker(ggPoint);// 循环生成坐标点
    const infoWindow = new window.BMap.InfoWindow('<div>22222</div>');// TODO

    // 初始化地图，设置中心点坐标和地图级别
    BMap.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放
    // BMap.addOverlay(markergg); // 添加GPS marker
    // markergg.setAnimation(BMAP_ANIMATION_BOUNCE);
    // markergg.addEventListener('mouseover', function () {
    //   this.openInfoWindow(infoWindow);
    //
    //   infoWindow.redraw();   // 防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部
    // });
    // markergg.addEventListener('mouseout', function () {
    //   this.closeInfoWindow(infoWindow);
    //
    //   infoWindow.redraw();   // 防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部
    // });

    // 116.404, 39.915


    const makers = this.state.markers;
    console.log(makers)
    makers.map((value, i) => {
      this.addMaker(BMap, value);
      if (i > 0) {
        let polyline = new window.BMap.Polyline([new window.BMap.Point('116.404', '39.915'), 
        new window.BMap.Point('116.404', '39.915')],
          { strokeColor: "blue", strokeWeight: 3, strokeOpacity: 0.7 });
        BMap.addOverlay(polyline);
        this.addArrow(polyline, 10, Math.PI / 7, BMap);
      }
    });
  }
  addArrow = (polyline, length, angleValue, map) => {
    var linePoint = polyline.getPath();//线的坐标串
    var arrowCount = linePoint.length;
    for (var i = 1; i < arrowCount; i++) { //在拐点处绘制箭头
      var pixelStart = map.pointToPixel(linePoint[i - 1]);
      var pixelEnd = map.pointToPixel(linePoint[i]);
      var angle = angleValue;//箭头和主线的夹角
      var r = length; // r/Math.sin(angle)代表箭头长度
      var delta = 0; //主线斜率，垂直时无斜率
      var param = 0; //代码简洁考虑
      var pixelTemX, pixelTemY;//临时点坐标
      var pixelX, pixelY, pixelX1, pixelY1;//箭头两个点
      if (pixelEnd.x - pixelStart.x == 0) { //斜率不存在是时
        pixelTemX = pixelEnd.x;
        if (pixelEnd.y > pixelStart.y) {
          pixelTemY = pixelEnd.y - r;
        }
        else {
          pixelTemY = pixelEnd.y + r;
        }
        //已知直角三角形两个点坐标及其中一个角，求另外一个点坐标算法
        pixelX = pixelTemX - r * Math.tan(angle);
        pixelX1 = pixelTemX + r * Math.tan(angle);
        pixelY = pixelY1 = pixelTemY;
      }
      else  //斜率存在时
      {
        delta = (pixelEnd.y - pixelStart.y) / (pixelEnd.x - pixelStart.x);
        param = Math.sqrt(delta * delta + 1);

        if ((pixelEnd.x - pixelStart.x) < 0) //第二、三象限
        {
          pixelTemX = pixelEnd.x + r / param;
          pixelTemY = pixelEnd.y + delta * r / param;
        }
        else//第一、四象限
        {
          pixelTemX = pixelEnd.x - r / param;
          pixelTemY = pixelEnd.y - delta * r / param;
        }
        //已知直角三角形两个点坐标及其中一个角，求另外一个点坐标算法
        pixelX = pixelTemX + Math.tan(angle) * r * delta / param;
        pixelY = pixelTemY - Math.tan(angle) * r / param;

        pixelX1 = pixelTemX - Math.tan(angle) * r * delta / param;
        pixelY1 = pixelTemY + Math.tan(angle) * r / param;
      }

      var pointArrow = map.pixelToPoint(new BMap.Pixel(pixelX, pixelY));
      var pointArrow1 = map.pixelToPoint(new BMap.Pixel(pixelX1, pixelY1));
      var Arrow = new BMap.Polyline([
        pointArrow,
        linePoint[i],
        pointArrow1
      ], { strokeColor: "blue", strokeWeight: 3, strokeOpacity: 0.5 });
      map.addOverlay(Arrow);
      return Arrow;
    }
  }
  addMaker = (map, maker) => {
    // if (maker && maker.coordinate) {
    if (maker) {

      // const crd = maker.coordinate.split(',');

      // const point = new window.BMap.Point(crd[0], crd[1]);[116.404, 39.915]
      const point = new window.BMap.Point('116.404', '39.915');


      const marker = new window.BMap.Marker(point);  // 创建标注
      console.log(marker)
      const $that = this;
      marker.addEventListener('onmouseover', function () {
        const infoWindow = new window.BMap.InfoWindow($that.infoWindowMsg(maker));
        this.openInfoWindow(infoWindow);
      });
      marker.addEventListener('onmouseout', function () {
        const infoWindow = new window.BMap.InfoWindow($that.infoWindowMsg(maker));
        this.closeInfoWindow(infoWindow);
      });
      map.addOverlay(marker);// 将标注添加到地图中
      marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
    }
  };
  infoWindowMsg = maker => {
    const infoMsg = `${'<div style="height:247px;width:400px;font-size:16px;font-family:微软雅黑">' +
      '<span style="color:#c30909">摄像头</span>' +
      '<span style="color:#c30909">'}${maker.srcName}</span>` +
      '<span style="color:#c30909;margin-left:80px">日期: </span>' +
      `<span style="color:#c30909">${maker.captureTime}</span>` +
      `<img style="margin-top:10px" src=${maker.snapImg} />` +
      '</div>';
    return infoMsg;
  };

  render() {
    return (
      <MayLayout location={this.props.location}>
        <div id="allMap" style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
      </MayLayout>
    );
  }

}

function mapStateToProps({ expand, loading }) {
  return { expand, loading };
}

export default connect(mapStateToProps)(PersonMap);
