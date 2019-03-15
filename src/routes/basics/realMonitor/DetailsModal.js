/**
 * Created by Ethan on 2018/2/1.
 */
import React from 'react';
import { Modal, Row, Col, Button, Tooltip } from 'antd';
import styles from './realMonitor.less';

const DetailsModal = ({ data,
  visible,
  onCancel,
  addTarget,
  checkImgs,
  deleteTakeImgs,
  bindFacetrack,
  clickBindBtn,
  toggleClass,
  messageToggleClass
}) => {
  let alarmPersonList = [];
  if (data.judgePerson && data.matchPoiList) {
    if (data.matchPoiList.indexOf(data.judgePerson) === -1) {
      data.matchPoiList.unshift(data.judgePerson);
    }
    alarmPersonList = data.matchPoiList;
  } else if (data.judgePerson) {
    alarmPersonList[0] = data.judgePerson;
  }

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
  function onMessageToggleClass(value) {
    return messageToggleClass(value);
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
              {data && data.imgs && data.imgs.length > 0 ? data.imgs.map((value, i) =>
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
            <div className={styles.content}>
              {alarmPersonList && alarmPersonList.length > 0 ? alarmPersonList.map((value, idx) => {
                let groupName = '';
                try {
                  if (value.groupList.length == 1) {
                    groupName = value.groupList[0].name;
                  } else {
                    value.groupList.map(v => {
                      if (!v.isDefault == 1) {
                        groupName = v.name
                      }
                    })
                  }
                } catch (err) {

                }

                return (<div
                  key={idx}
                  style={{ display: 'flex', alignItems: 'center' }}
                  className={onMessageToggleClass(value)}
                  onClick={onBindFacetrack.bind(this, value)}
                >
                  <img src={value.uploadImgs && value.uploadImgs.length > 0 ? value.uploadImgs[0] : value.imgs[0]} alt="" />
                  <div className={styles.textGroups}>
                    <Tooltip placement="topLeft" title={value.name}>
                      {value.name ? <p>{value.name}</p> : null}
                    </Tooltip>
                    <Tooltip placement="topLeft" title={value.identityCard}>
                      {value.identityCard ? <p>{value.identityCard}</p> : null}
                    </Tooltip>
                    <Tooltip placement="topLeft" title={value.gender}>
                      {value.gender ? <p>{value.gender}</p> : null}
                    </Tooltip>

                    <p>
                      {data && data.judgePoiOrg ?
                        <Tooltip placement="topLeft" title={`${data.judgePoiOrg.name}-${groupName}`}>
                          <span >{data.judgePoiOrg ? `${data.judgePoiOrg.name}-` : '无组织-'}</span>
                          <span>{groupName}</span>
                        </Tooltip>
                        : '无组织'}
                    </p>

                    <Tooltip placement="topLeft" title={(data.percent * 100).toFixed(2) + '%'}>
                      {data.percent ? <p style={{ color: '#ff9b3a' }}>{(data.percent * 100).toFixed(2)}%</p> : null}
                    </Tooltip>
                  </div>
                </div>)
              }
              ) : null}
            </div>

          </Col>
          <Col span={10} className={styles.wrap}>
            <div className={styles.modalHeader}>
              <span className={styles.modalHeaderTitle}>现场照片</span>
              <span onClick={onCancel} className={styles.modalHeaderClose} >×</span>
            </div>
            <div>
              <div className={styles.sceneImg} >
                <img className={styles.sceneImgData} src={data.snapImg} alt="" />
              </div>
              <div className={styles.sceneText}>
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
        <iframe
          src="about:blank" frameBorder="0" filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=1)"
          className={styles.iframe} />
      </Modal>
    </div>
  );
};

export default DetailsModal;
