/**
 * Created by Ethan on 2018/2/2.
 */
import React from 'react';
import { Row, Col, Modal, Tooltip } from 'antd';
import styles from '../../basics/historyPolice/historyPolice.less';


const TakeImgDetail = ({ visiable, onCancel, data }) => (

  <div>
    <Modal
      title=""
      footer=""
      visible={visiable}
      onCancel={onCancel}
      closable={false}
      width={1150}
      bodyStyle={{ height: 590, border: '1px solid #02abe3' }}
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
                <img src={value} style={{ width: 200, height: 200 }} alt="" />
              </div>
            ) : null}
          </div>
        </Col>
        <Col span={14} className={styles.detailsWrap}>
          <div className={styles.modalHeader}>
            <span className={styles.modalHeaderTitle}>现场照片</span>
            <span onClick={onCancel} className={styles.modalHeaderClose} >×</span>
          </div>
          <div>
            <div className={styles.sceneImg}>
              <img className={styles.sceneImgData} src={data.snapImg} alt="" />
            </div>
            <div className={styles.modalInput}>
              <div className={styles.formItem}>
                <p>
                  <span>摄像头名称: </span>
                  <Tooltip placement="topLeft" title={data && data.cameraName}>
                    <em>{data.cameraName}</em>
                  </Tooltip>
                </p>
              </div>
              <div className={styles.formItem}>
                <p>
                  <span>人脸特征 :</span>
                  <em>{data.age < 20 ? '少年' : data.age < 30 ? '青年' : data.age < 50 ? '中年' : '老年'}</em>
                  <em>{data.isglasses === 1 ? '/有眼镜' : data.isglasses === 2 ? '/无眼镜' : '/未知'}</em>
                  {/* <em>{data.ismoustache === 1 ? '/有胡子' : data.ismoustache === 2 ? '/无胡子' : '/未知'}</em> */}
                  {/* <em>{data.ishat === 1 ? '/有帽子' : data.ishat === 2 ? '/无帽子' : '/未知'}</em> */}
                </p>
              </div>
              <div className={styles.formItem}>
                <p> <span>抓拍时间 :</span> {data.captureTime}</p>
              </div>
              <div className={styles.formItem}>
                <p> <span>相似度 :</span> {parseFloat(data.percent*100).toFixed(2) }%</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Modal>
  </div>

);

export default TakeImgDetail;
