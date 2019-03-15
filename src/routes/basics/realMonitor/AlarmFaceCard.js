/**
 * Created by Jason on 2018/2/1.
 */

import React from 'react';

import styles from './realMonitor.less';

import { takeImgFromWorker } from '../../../utils/utils';
import unknows from '../../../assets/unknows.png';
import kuImg from '../../../assets/ku.png';
import { Tooltip } from 'antd';
const AlarmFaceCard = ({ dataSource, onClick, allGroups, active }) => {
  let leftImg = '';
  let rightImg = '';
  let name = '';
  let identityCard = '';
  let group = '';
  let precent = '';
  let cameraSrc = '';
  let date = '';
  let kuIcon = kuImg;
  function renderGroup(groupId) {
    let group = '';
    allGroups.map(value => {
      if (groupId === value.id) {
        group = value.name;
      }
    });
    return group;
  }

  function initData(dataSource) {
    if (dataSource) {
      leftImg = dataSource.imgs[0];
      rightImg = takeImgFromWorker(dataSource);
      name = dataSource.judgePerson ? dataSource.judgePerson.name : '';
      identityCard = dataSource.judgePerson ? dataSource.judgePerson.identityCard : '';
      cameraSrc = dataSource.srcName ? dataSource.srcName : '';
      date = dataSource.captureTime;
      precent = <span>相似度{dataSource.percent ? (dataSource.percent * 100).toFixed(2) : ''}%</span>;
      switch (dataSource.alarmReason) {
        case 0:
          group = dataSource.poiOrg ? dataSource.poiOrg.name : '';
          break;
        case 1:
          group = <span style={{ color: 'red' }}>{dataSource.poiOrg ? dataSource.poiOrg.name : ''}</span>;
          break;
        case 2:
          name = <span style={{ color: 'red' }}>未知</span>;
          identityCard = '';
          rightImg = unknows;
          group = <span style={{ color: 'red' }}>其他人员</span>;
          precent = '';
          kuIcon = '';
          break;
        case 3:
          group = dataSource.poiOrg ? dataSource.poiOrg.name : '';
          break;
        case 4:
          group = <span style={{ color: 'red' }}>{dataSource.alarmInfo ? renderGroup(dataSource.alarmInfo.groupId) : '未分组'}</span>;
          break;
      }
    }
  }


  initData(dataSource);
  let judge = dataSource.judgePerson ? dataSource.judgePerson : '';
  let bgColor, bgName;
  if (judge) {
    showLabel = (dataSource.percent * 100) - judge.alarmThreshold;
    judge.groupList.map(v => {
      if (!v.isDefault == 1) {
        bgColor = v.labelColor;
        bgName = v.labelName;
      }
    })
  }
  const alarmLabel = judge && showLabel > 0 ? { labelColor: bgColor, labelName: bgName } : { labelColor: '#b56ecf', labelName: '其他人员' }
  return (
    <div className={`${styles.cardContainer} ${active || ''}`} onClick={onClick}>
      <span className={styles.alarmState} style={{ background: `${alarmLabel.labelColor}` }}>{alarmLabel.labelName}</span>
      <div className={styles.imgContain}>
        <img src={leftImg} alt="" />
      </div>
      <div className={styles.cardTextWapper}>
        <span className={styles.cardText}>{showLabel > 0 ? name : ''}</span>
      </div>
      <div className={styles.cardTextWapper}>
        <Tooltip placement="topLeft" title={cameraSrc}>
          <span className={styles.cardText}>{cameraSrc}</span>
        </Tooltip>
      </div>

      <div className={styles.cardTextWapper}>
        <span className={`${styles.cardText} ${styles.date}`}>{date}</span>
        <span
          className={`${styles.cardText} ${styles.date}`}
          style={{ marginLeft: '5px', float: 'left' }} />
      </div>
    </div>);
};

export default AlarmFaceCard;

