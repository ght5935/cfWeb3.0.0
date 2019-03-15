import React from 'react';
import { connect } from 'dva';
import { Modal, Table, Progress } from 'antd';
import styles from './Target.less';

const { Column } = Table;

class TrajectoryModal extends React.Component {
    onCancel = () => {
        const poiPerson = this.props.bussiness.poiPerson;
        this.props.dispatch({
            type: 'bussiness/success',
            payload: {
                poiPerson: {
                    ...poiPerson,
                    trajectoryModalVisible: false
                }
            }
        })
    }
    renderTableImg = record => (<div className={styles.tableImgBorder} >
        <img
            style={{ width: '100%', height: '100%' }}
            src={record.imgs && record.imgs.length > 0 ? record.imgs[0] : []} alt="" />
    </div>);
    renderDetail = (record) => (<div>
        <span title="编辑目标" onClick={this.onEditClick.bind(this, record)} className={`${styles.tableBtn} ${styles.tableEdit}`} />

    </div>)
    onEditClick = (record) => {
        const poiPerson = this.props.bussiness.poiPerson;
        const bindFacetrack = poiPerson.bindFacetrack;
        this.props.dispatch({
            type: 'bussiness/success',
            payload: {
                poiPerson: {
                    ...poiPerson,
                    trajectoryModalVisible: false,
                    detailFaceModalVisible: true,
                    trajectoryData: record,
                    bindFacetrack: {
                        ...bindFacetrack,
                        facetrackId: record.facetrackId
                    }
                }
            }
        })
    }
    render() {
        return (
            <Modal
                title=''
                footer={null}
                visible={this.props.bussiness.poiPerson.trajectoryModalVisible}
                closable={false}
                onCancel={this.onCancel}
                width={1000}
                bodyStyle={{ border: '1px solid #02abe3' }}
                className={styles.modalBody}
            >
                <div className={styles.modalHeader}>
                    <span className={styles.modalHeaderTitle}>人脸序列</span>
                    <span className={styles.modalHeaderClose} onClick={this.onCancel}>×</span>
                </div>
                <Table
                    dataSource={this.props.bussiness.poiToFace.matchFaceList}
                    bordered
                    rowKey={record => record.id}
                    pagination={false}
                    scroll={{ x: '100%', y: 500 }}

                >
                    <Column
                        title="照片"
                        width={'10%'}
                        render={record => this.renderTableImg(record)}
                    />
                    <Column
                        width={'15%'}
                        title="摄像头名称"
                        dataIndex="cameraName"
                        key="cameraName"
                    />
                    <Column
                        width={'10%'}
                        title="创建时间"
                        dataIndex="captureTime"
                        key="captureTime"
                    />
                    <Column
                        width={'10%'}
                        title="相似度"
                        render={record => <Progress type="circle" 
                        format={p => <span style={{color: '#fff'}}>{p}%</span>} 
                        percent={(record.score * 100).toFixed(1)} 
                        width={60}/>}
                        
                    />
                    {/* <Column
                        width={300}
                        title="关联状态"
                        render={record => <span>{record.state === 0 ? '未关联' : '已关联'}</span>}
                    /> */}
                    <Column
                        width={'7%'}
                        title="详情"
                        render={record => this.renderDetail(record)}
                    />
                </Table>

            </Modal>
        )
    }
}

function mapStateToProps({ bussiness }) {
    return { bussiness };
}

export default connect(mapStateToProps)(TrajectoryModal);
