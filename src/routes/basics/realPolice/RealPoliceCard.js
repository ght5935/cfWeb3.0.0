/**
 * Created by Ethan on 2018/2/5.
 */
import React from 'react';
import { Progress, Tooltip } from 'antd';
import styles from './realPolice.less';
import { takeImgFromWorker } from '../../../utils/utils';
import unknows from '../../../assets/unknows.png';

function detailAge(data) {
  if (data.age < 20) {
    return '/少年';
  } else if (data.age < 30) {
    return '/青年';
  } else if (data.age < 50) {
    return '/中年';
  }
  return '/老年';
}


const RealPoliceCard = ({ data }) => {
  let judgePerson = data.judgePerson ? data.judgePerson : '';
  let groupName = '';
  let bgColor, bgName;
  if (judgePerson) {
    judgePerson.groupList.map(v => {
      if (!v.isDefault == 1) {
        bgColor = v.labelColor;
        bgName = v.labelName;
      }
    })
  }

  try {
    if (judgePerson.groupList.length == 1) {
      groupName = judgePerson.groupList[0].name;
    } else {
      judgePerson.groupList.map(v => {
        if (!v.isDefault == 1) {
          groupName = v.name
        }
      })
    }
  } catch (err) {

  }

  return (
    <div className={styles.listItem}>
      <div className={styles.card}>
        <span className={styles.alarmState} style={{ background: `${judgePerson ? bgColor : '#b56ecf'}` }}>{judgePerson ? bgName : '其他人员'}</span>
        <div className={styles.left}>
          <img src={data.imgs[0]} alt="" className={styles.camera} />
          <div className={styles.textGroup}>
            <Tooltip placement="topLeft" title={data.srcName ? data.srcName : ''} >
              <p>{data.srcName ? data.srcName : ''}</p>
            </Tooltip>
            <p>{data.gender === 0 ? '女' : '男'}
              {detailAge(data)}
              {data.glasses == 1 ? '/戴眼镜' : data.glasses == 2 ? '/没戴眼镜' : ''}
            </p>
            <p>{data.captureTime}</p>
          </div>
        </div>
        <div className={styles.middle}></div>
        <div className={styles.right}>
          <div style={{ position: 'relative' }}>
            <img src={takeImgFromWorker(data) ? takeImgFromWorker(data) : unknows} alt="" className={styles.faceTrack} />
            <div className={styles.ku_icon} style={{ display: data.judged ? 'block' : 'none' }} />
          </div>
          <div className={styles.textGroup}>
            <Tooltip placement="topRight" title={judgePerson ? judgePerson.name : ''}>
              <p>{judgePerson ? judgePerson.name : ''}</p>
            </Tooltip>
            <Tooltip placement="topRight" title={judgePerson ? judgePerson.identityCard : ''}>
              <p>{judgePerson ? judgePerson.identityCard : ''}</p>
            </Tooltip>
            <Tooltip placement="topRight" title={groupName}>
              <p>{groupName}</p>
            </Tooltip>
          </div>
        </div>
        {judgePerson ? <Progress percent={data.judged ? parseFloat((data.percent * 100).toFixed(2)) : 0} size="small" strokeWidth={4} /> : ''}
      </div>
    </div>
  )
};

export default RealPoliceCard;
