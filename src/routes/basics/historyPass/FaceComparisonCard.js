/**
 * Created by Ethan on 2018/1/15.
 */
import React from 'react';
import { Progress, Tooltip } from 'antd';
import styles from './historyPass.less';

function renderfaceTrackImg(matchData) {
  if (matchData && matchData.uploadImgs) {
    return (
      <div>
        <img src={matchData.uploadImgs[0]} alt="" />
        <div className={styles.ku_icon} />
      </div>
    );
  } else if (matchData && matchData.imgs.length > 0) {
    return (
      <div>
        <img src={matchData.imgs[0]} alt="" />
        <div className={styles.ku_icon} />
      </div>
    );
  }
  return (
    <div className={styles.unknows} />
  );
}

const FaceComparisonCard = ({ data, matchData, onClick }) => {
  let groupName = '';
  try {
    if (matchData) {
      if (matchData.poigroupData.length == 1) {
        groupName = matchData.poigroupData[0].groupName;
      } else {
        matchData.poigroupData.map(v => {
          if (!v.default) {
            groupName = v.groupName
          }
        })
      }
    }
  } catch (err) {

  }
  return (
    <div className={styles.listItem}>
      <div className={styles.card} onClick={onClick}>
        <img src={data.imgs[0]} alt="" />
        <div className={styles.textGroup}>
          <Tooltip placement="topLeft" title={data.srcName} >
            <p>{data.srcName}</p>
          </Tooltip>
          <Tooltip placement="topLeft" title={data.captureTime} >
            <p>{data.captureTime}</p>
          </Tooltip>
          <Tooltip placement="topLeft" title={matchData && matchData.name ? matchData.name : '无姓名'} >
            <p>{matchData && matchData.name ? matchData.name : '无姓名'}</p>
          </Tooltip>
          <Tooltip placement="topLeft" title={matchData && matchData.identityCard ? matchData.identityCard : '无身份证'} >
            <p>{matchData && matchData.identityCard ? matchData.identityCard : '无身份证'}</p>
          </Tooltip>
          <Tooltip placement="topLeft" title={matchData && matchData.poigroupData ? groupName : '无分组'} >
            <p>{matchData && matchData.poigroupData ? groupName : '无分组'}</p>
          </Tooltip>
          <p>
            <span>{data.gender}</span>
            <span>{data.age < 20 ? '/少年' : data.age < 30 ? '/青年' : data.age < 50 ? '/中年' : '/老年'}</span>
            <span>{data.isglasses === 1 ? '/有眼镜' : data.isglasses === 2 ? '' : ''}</span>
            <span>{data.ismoustache === 1 ? '/有胡子' : data.ismoustache === 2 ? '' : ''}</span>
            <span>{data.ishat === 1 ? '/有帽子' : data.ishat === 2 ? '' : ''}</span>
          </p>

        </div>
        <div className={styles.faceTrack}>
          {renderfaceTrackImg(matchData)}
        </div>
        <Progress percent={matchData ? parseFloat((matchData.score * 100).toFixed(2)) : 0} size="small" strokeWidth={4} styles={{ marginTop: '50px' }} />
      </div>
    </div>
  )
};

export default FaceComparisonCard;
