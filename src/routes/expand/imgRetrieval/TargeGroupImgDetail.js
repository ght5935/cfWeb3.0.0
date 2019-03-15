/**
 * Created by Ethan on 2018/2/1.
 */
import React from 'react';
import { Modal, Row, Col, Button } from 'antd';
// import styl from '../../basics/historyPolice/historyPolice.less';
import styles from '../../basics/realMonitor/realMonitor.less'
import style from './ImgRetrieve.less'
const TargetGroupImgDetail = ({ data, visible, onCancel,fileList,onMessageToggleClass,onBindFacetrack,ontoggleClass,onAddPicture }) => {
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
              <span className={styles.modalHeaderTitle}>需要检索的人脸</span>
            </div>
            <div className={style.currentPic}>
              {fileList && fileList.length > 0 ? fileList.map((value, i) =>
              <div className={ontoggleClass(value)}  key={i}  onClick={onBindFacetrack.bind(this, value)}   >
                <img src={value.url} style={{ width: 200, height: 200 }} alt=""/>
              </div>
            ) : null}
            </div>
          </Col>
          <Col span={7} className={styles.wrap}>
            <div className={styles.modalHeader}>
              <span className={styles.modalHeaderTitle}>目标照片</span>
            </div>
            <div className={style.contentTwo}>
              {data && data.uploadImgs && data.uploadImgs.length > 0 ? data.uploadImgs.map((value, i) =>
                <div  key={value}  className={style.targetPic}   key={i}>
                  <img src={value} alt=""  />
                </div>
              ) : null}
            </div>
          </Col>
          <Col span={10} className={styles.wrap}>
            <div className={styles.modalHeader}>
              <span className={styles.modalHeaderTitle}>目标信息</span>
              <span onClick={onCancel} className={styles.modalHeaderClose} >×</span>
            </div>
            <div>
              <div   style={{height:'330px'}}>
                <table className={style.tabless}>
                  <tbody>
                    <tr>
                      <th>姓名：</th>
                      <th>{data.name ? data.name : null}</th>
                    </tr>
                    <tr>
                      <th>性别：</th>
                      <th>{data.gender ? data.gender : null}</th>
                    </tr>
                    <tr>
                      <th>身份证号：</th>
                      <th>{data.identityCard ? data.identityCard : ''}</th>
                    </tr>
                    <tr>
                      <th>户籍：</th>
                      <th>{data.householdRegister ? data.householdRegister : ''}</th>
                    </tr>
                    <tr>
                      <th>分组：</th>
                      {data.group ? <th>{data.group[0].name}</th> : <th></th>}
                    </tr>
                    <tr>
                      <th>阈值：</th>
                      <th>{data.socre ? parseInt(data.socre, 10) : null}%</th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={style.borderFrame} >
                <Button onClick={onAddPicture}  type="primary">关联目标</Button>
                <div className={style.reminderFont} >将抓拍序列和目标照片关联,可提高识别率</div>
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

export default TargetGroupImgDetail;
