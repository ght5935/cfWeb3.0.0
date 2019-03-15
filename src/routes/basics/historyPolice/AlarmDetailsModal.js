/**
 * Created by Ethan on 2018/2/1.
 */
import React from 'react';
import { Modal, Row, Col, Button, Tooltip } from 'antd';
import styles from '../historyPass/historyPass.less';
import testImg from '../../../assets/gyc.jpg';

const AlarmDetailsModal = ({ faceTrackData,
  personData,
  visible,
  onCancel,
  addTarget,
  checkImgs,
  deleteTakeImgs,
  bindFacetrack,
  clickBindBtn,
  toggleClass
}) => {
  function onCheckImgs(value) {
    checkImgs(value);
  }

  function onDeleteTakeImgs() {
    deleteTakeImgs();
  }

  function onBindFacetrack(value) {
    bindFacetrack(value);
  }
  function onclickBindBtn() {
    clickBindBtn();
  }
  function ontoggleClass(value) {
    return toggleClass(value);
  }
  function contentImgsList(personData) {
    const rt = [];
    if (personData) {
      if (personData.uploadImgs && personData.uploadImgs.length > 0) {
        personData.uploadImgs.map((value, i) => {
          rt.push(<div className={styles.notSelectImg} key={value}><img src={value} alt="" /></div>);
        });
        return rt;
      } else if (personData.imgs && personData.imgs.length > 0) {
        personData.imgs.map((value, i) => {
          rt.push(<div className={styles.notSelectImg} key={value}><img src={value} alt="" /></div>);
        });
        return rt;
      }
      return rt;
    }
    return rt;
  }
  return (
    <div>
      <Modal
        title=""
        footer=""
        visible={visible}
        onCancel={onCancel}
        closable={false}
        width={1600}
        bodyStyle={{ height: 586, border: '1px solid #02abe3' }}
        className={styles.modalBody}
      >
        <Row style={{ height: '100%' }}>
          <Col span={7} className={styles.wrap}>
            <div className={styles.modalHeader}>
              <span className={styles.modalHeaderTitle}>抓拍序列</span>
            </div>
            <div className={styles.content}>
              {faceTrackData && faceTrackData.imgs && faceTrackData.imgs.length > 0 ? faceTrackData.imgs.map((value, i) =>
                <div className={ontoggleClass(value)} key={value} onClick={onCheckImgs.bind(this, value)}>
                  <img src={value} alt="" />
                </div>
              ) : null}
            </div>
          </Col>
          <Col span={7} className={styles.wrap}>
            <div className={styles.modalHeader}>
              <span className={styles.modalHeaderTitle}>目标信息</span>
            </div>
            <div
              className={styles.contentTwo}
              style={{ display: 'flex', flexWrap: 'wrap' }}
            >
              {contentImgsList(personData)}
            </div>
            <div className={styles.imgList}>
              <div style={{ display: 'flex', marginLeft: 22 }}>
                <Tooltip placement="topRight" arrowPointAtCenter title={personData && personData.name}>
                  <p style={{width: 121}}><em>姓名:</em>{personData && personData.name}</p>
                </Tooltip>
                <p style={{width: 290}}><em>身份证:</em>{personData && personData.identityCard}</p>
              </div>
              <div style={{ display: 'flex', marginLeft: 22 }}>
                <p style={{width: 121}}><em>性别:</em>{personData && personData.gender}</p>
                <Tooltip placement="topLeft" arrowPointAtCenter title={personData && personData.household_register}>
                  <p style={{width: 290}}><em>户&nbsp;&nbsp;&nbsp;&nbsp;籍:</em>{personData && personData.household_register}</p>
                </Tooltip>
              </div>
            </div>
          </Col>
          <Col span={10} className={styles.wrap}>
            <div className={styles.modalHeader}>
              <span className={styles.modalHeaderTitle}>现场照片</span>
              <span onClick={onCancel} className={styles.modalHeaderClose} >×</span>
            </div>
            <div>
              <div className={styles.sceneImg} >
                <img className={styles.sceneImgData} src={faceTrackData.snapImg} alt="" />
              </div>
              <div className={`${styles.sceneText} ${styles.clearfix} `}>
              <div className={styles.relevance}>
                <Button style={{ marginLeft: '33%' }} onClick={onclickBindBtn} type="primary">关联目标</Button>
                <div className={styles.reminderFont} >将抓拍序列和目标照片关联,可提高识别率</div>
              </div>
              <div className={styles.addNew}>
                <Button onClick={addTarget} style={{ marginLeft: '33%' }} type="primary">新增目标</Button>
                <div className={styles.reminderFont} >将抓拍序列作为人脸图片进行新增目标</div>
              </div>
              </div>
            </div>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default AlarmDetailsModal;
