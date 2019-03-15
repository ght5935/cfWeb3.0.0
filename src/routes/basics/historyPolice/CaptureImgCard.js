/**
 * Created by Ethan on 2018/2/2.
 */
import React from 'react';
import { connect } from 'dva';
import { Progress, Row, Col,Tooltip } from 'antd';
import styles from './historyPolice.less';
import testImg from '../../../assets/gyc.jpg';


const CaptureImgCard = ({faceTrackData, onClick }) => (
  <div className={styles.takeImgWrap} >
    <div className={styles.takeImgCad} onClick={onClick}>
      <img src={faceTrackData.imgs[0]} alt="" className={styles.takeCamera}/>
      <p>
        <span>{faceTrackData.gender}</span>
        <span>{faceTrackData.age < 20 ? '/少年' : faceTrackData.age < 30 ? '/青年' : faceTrackData.age < 50 ? '/中年' : '/老年'}</span>
        <span>{faceTrackData.isglasses === 1 ? '/戴眼镜' : faceTrackData.isglasses === 2 ? '/没戴眼镜' : ''}</span>
        {/* <span>{faceTrackData.ismoustache === 1 ? '/有胡子' : faceTrackData.ismoustache === 2 ? '/无胡子' : ''}</span> */}
        {/* <span>{faceTrackData.ishat === 1 ? '/有帽子' : faceTrackData.ishat === 2 ? '/无帽子' : ''}</span> */}
      </p>
      <Tooltip title={faceTrackData.srcName}>
        <p className={styles.description}>{faceTrackData.srcName}</p>
      </Tooltip>
      <Tooltip title={faceTrackData.captureTime}>
        <p className={styles.description}>{faceTrackData.captureTime}</p>
      </Tooltip>
    </div>
  </div>
  );
export default CaptureImgCard;
