/**
 * Created by Ethan on 2018/1/15.
 */
import React from 'react';
import { connect } from 'dva';
import { Progress, Row, Col } from 'antd';
import styles from './historyPolice.less';
import testImg from '../../../assets/gyc.jpg';
import CaptureImgCard from './CaptureImgCard';
import ComparisonImgCard from './ComparisonImgCard';

const FaceCardContent = ({onClickCapt, historyPoliceValue, onSuperior,onClickComp, faceTrackData, matchData, alarmParson,index}) => {

  let alarmPersonList = [];
  if (faceTrackData.judgePerson && faceTrackData.matchPoiList) {
    if (faceTrackData.matchPoiList.indexOf(faceTrackData.judgePerson) === -1) {
      faceTrackData.matchPoiList.unshift(faceTrackData.judgePerson);
    }
    alarmPersonList = faceTrackData.matchPoiList;
  } else if (faceTrackData.judgePerson) {
    alarmPersonList[0] = faceTrackData.judgePerson;
  } else if (faceTrackData.matchPoiList) {
    alarmPersonList = faceTrackData.matchPoiList;
  }
  return (
    <div style={{ display: 'flex' }}>
      <div style={{width: '227px'}}>
        <CaptureImgCard
          faceTrackData={faceTrackData}
          onClick={onClickCapt}
      />
      </div>
      <div style={{width: '87%' }}>
        <ComparisonImgCard
          faceTrackData={faceTrackData}
          alarmPersonList={alarmPersonList}
          onClick={onClickComp}
          index={index}
          historyPoliceValue={historyPoliceValue}
      />
      </div>
    </div>);
};


export default FaceCardContent;
