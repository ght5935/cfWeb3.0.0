/**
 * Created by Ethan on 2018/2/2.
 */
import React from 'react';
import { connect } from 'dva';
import { Progress, Row, Col, Modal, Button, Input, Tooltip } from 'antd';
import styles from './historyPolice.less';
import testImg from '../../../assets/gyc.jpg';
import sceneImg from '../../../assets/sceneImg.png';
import CaptureImgCard from './CaptureImgCard';
import ComparisonImgCard from './ComparisonImgCard';


const TakeImgDetail = ({ visiable, onCancel, data }) => (

  <div>
    <Modal
      title=""
      footer=""
      visible={visiable}
      onCancel={onCancel}
      closable={false}
      width={1150}
      bodyStyle={{ height: 576, border: '1px solid #02abe3' }}
      className={styles.modalBody}
    >
      <Row style={{ height: '100%', color: '#fff' }}>
        <Col span={10} className={styles.detailsWrap}>
          <div className={styles.modalHeader}>
            <span className={styles.modalHeaderTitle}>抓拍序列</span>
          </div>
          <div className={styles.takeImgList}>
            {data && data.imgs && data.imgs.length > 0 ? data.imgs.map((value, i) =>
              <div className={styles.imgList} key={value}>
                <img src={value} alt="" />
              </div>
            ) : null}
          </div>
        </Col>
        <Col span={14} className={styles.detailsWrap}>
          <div className={styles.modalHeader}>
            <span className={styles.modalHeaderTitle}>现场照片</span>
            <span onClick={onCancel} className={styles.modalHeaderClose} >×</span>
          </div>

          <div className={styles.sceneImg}>
            <img className={styles.sceneImgData} src={data.snapImg} alt="" />
          </div>

          <div className={styles.modalInput}>
            <div className={styles.formItem}>
              <p>
                <span>摄像头名称 :</span>
                <Tooltip placement="topLeft" title={data && data.srcName}>
                  <em>{data.srcName}</em>
                </Tooltip>
              </p>
            </div>
            <div className={styles.formItem}>
              <p>
                <span>人脸特征 :</span>
                <em>{data.gender}</em>
                <em>{data.age < 20 ? '/少年' : data.age < 30 ? '/青年' : data.age < 50 ? '/中年' : '/老年'}</em>
                <em>{data.isglasses === 1 ? '/戴眼镜' : data.isglasses === 2 ? '/没戴眼镜' : ''}</em>
                <em>{data.ismoustache === 1 ? '/有胡子' : data.ismoustache === 2 ? '/无胡子' : ''}</em>
                <em>{data.ishat === 1 ? '/有帽子' : data.ishat === 2 ? '/无帽子' : ''}</em>
              </p>
            </div>
            <div className={styles.formItem}>
              <p><span>抓拍时间 :</span>{data.captureTime}</p>
            </div>
          </div>
        </Col>
      </Row>
    </Modal>
  </div>

);

export default TakeImgDetail;
