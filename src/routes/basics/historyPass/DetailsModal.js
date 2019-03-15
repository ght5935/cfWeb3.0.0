/**
 * Created by Ethan on 2018/2/1.
 */
import React from 'react';
import { Modal, Row, Col, Button, Tooltip } from 'antd';
import styles from './historyPass.less';

const DetailsModal = ({ data,
  matchPoiList,
  judgePerson,
  visible,
  onCancel,
  addTarget,
  checkImgs,
  deleteTakeImgs,
  bindFacetrack,
  clickBindBtn,
  toggleClass,
  messageToggleClass,
  isNeedTarget
}) => {
  let alarmPersonList = [];
  if (data.judgePerson && data.matchPoiList && data.matchPoiList.length > 0) {
    if (data.matchPoiList.indexOf(data.judgePerson) === -1) {
      data.matchPoiList.unshift(data.judgePerson);
    }
    alarmPersonList = data.matchPoiList;
  } else if (data.judgePerson) {
    alarmPersonList[0] = data.judgePerson;
  } else if (data.matchPoiList && data.matchPoiList.length > 0) {
    alarmPersonList = data.matchPoiList;
  }

  function onCheckImgs(value) {
    checkImgs(value);
  }

  function onDeleteTakeImgs() {
    deleteTakeImgs()
  }

  function onBindFacetrack(value) {
    bindFacetrack(value)
  }
  function onclickBindBtn() {
    clickBindBtn()
  }
  function ontoggleClass(value) {
    return toggleClass(value)
  }
  function onMessageToggleClass(value) {
    return messageToggleClass(value)
  }
  return (
    <div>
      <Modal
        title=""
        footer=""
        visible={visible}
        onCancel={onCancel}
        closable={false}
        width={isNeedTarget ? 1600 : 1100}
        bodyStyle={{ height: 586, border: '1px solid #02abe3' }}
        className={styles.modalBody}
      >
        <Row style={{ height: '100%' }}>
          <Col span={isNeedTarget ? 7 : 10} className={styles.wrap}>
            <div className={styles.modalHeader}>
              <span className={styles.modalHeaderTitle}>抓拍序列</span>
            </div>
            <div className={styles.content}>
              {data && data.imgs && data.imgs.length > 0 ? data.imgs.map((value, i) =>
                <div className={ontoggleClass(value)} key={i} onClick={onCheckImgs.bind(this, value)}>
                  <img src={value} alt="" />
                </div>
              ) : null}
            </div>
          </Col>
          {isNeedTarget ?
            <Col span={7} className={styles.wrap}>
              <div className={styles.modalHeader}>
                <span className={styles.modalHeaderTitle}>目标信息</span>
              </div>
              <div className={styles.content}>
                {alarmPersonList && alarmPersonList.length > 0 ? alarmPersonList.map((value) => {
                  let groupName = '';
                  try {
                    if (value.poigroupData.length == 1) {
                      groupName = value.poigroupData[0].groupName;
                    } else {
                      value.poigroupData.map(v => {
                        if (!v.default) {
                          groupName = v.groupName
                        }
                      })
                    }
                  } catch (err) {

                  }
                  return (
                    <div
                      key={value.id}
                      className={onMessageToggleClass(value)}
                      onClick={onBindFacetrack.bind(this, value)}
                    >
                      <img style={{ float: 'left' }} src={value.uploadImgs && value.uploadImgs.length > 0 ? value.uploadImgs[0] : value.imgs[0]} alt="" />
                      <div className={styles.personText}>
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
                          {value && value.poiOrgunitList && value.poiOrgunitList.length > 0 ?
                            <Tooltip placement="topLeft" title={`${value.poiOrgunitList[0].name}-${groupName}`}>
                              <span >{value.poiOrgunitList[0].name}-</span>
                              <span>{groupName}</span>
                            </Tooltip>
                            : '无组织-'}
                        </p>

                        <Tooltip placement="topLeft" title={(value.score * 100).toFixed(2) + '%'}>
                          {value.score ? <p style={{ color: '#ff9b3a' }}>{(value.score * 100).toFixed(2)}%</p> : null}
                        </Tooltip>
                      </div>
                    </div>
                  )
                }

                ) : null}

              </div>

            </Col>
            : ''}
          <Col span={isNeedTarget ? 10 : 14} className={styles.wrap}>
            <div className={styles.modalHeader}>
              <span className={styles.modalHeaderTitle}>现场照片</span>
              <span onClick={onCancel} className={styles.modalHeaderClose} >×</span>
            </div>
            <div>
              <div className={styles.sceneImg} >
                <img className={styles.sceneImgData} src={data.snapImg} alt="" />
              </div>
              <div className={styles.sceneText}>
                <div className={styles.relevance} style={isNeedTarget ? {} : { width: '100%' }}>
                  <Button style={{ display: 'block', margin: '0 auto' }} onClick={onclickBindBtn} type="primary">关联目标</Button>
                  <div className={styles.reminderFont} >将抓拍序列和目标照片关联,可提高识别率</div>
                </div>
                {isNeedTarget ?
                  <div className={styles.addNew}>
                    <Button onClick={addTarget} style={{ display: 'block', margin: '0 auto' }} type="primary">新增目标</Button>
                    <div className={styles.reminderFont} >将抓拍序列作为人脸图片进行新增目标</div>
                  </div>
                  : ''}
              </div>

            </div>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default DetailsModal;
