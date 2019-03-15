/**
 * Created by Jason on 2018/3/29.
 */
    import React from 'react';

    import styles from './Statistics.less';
    import unkown from '../../../assets/unknows.png';

    const AlarmCard = ({data}) => (
      <div className={styles.listItem}>
        <div className={styles.listCard}>
          <div className={styles.alarmImage}>
            <img className={styles.images} src={data.imgs[0]} alt=""/>
          </div>
          <div className={styles.alarmText}>
              <p title={data.judgePerson ? data.judgePerson.name : ''}>{data.judgePerson ? data.judgePerson.name : '其他人员'}</p>
              <p title={data.judgePerson ? data.judgePerson.identityCard : ''}>{data.judgePerson ? data.judgePerson.identityCard : '无身份证号'}</p>
              <p title={data.groupList && data.groupList.length > 0 ? data.groupList[0] : ''}>{data.groupList && data.groupList.length > 0 ? data.groupList[0] : '未分组'}</p>
              <p title={data.srcName}>{data.srcName}</p>
              <p title={data.captureTime}>{data.captureTime}</p>
          </div>
          <div className={styles.alarmImage}>
            <img className={styles.images} src={data.judgePerson !== null ? data.judgePerson.uploadImgs ? data.judgePerson.uploadImgs[0] : data.judgePerson.imgs[0]  : unkown} alt=""/>
          </div>
        </div>
      </div>
        );

    export default AlarmCard;
