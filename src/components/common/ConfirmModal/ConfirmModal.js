/**
 * Created by Jason on 2018/1/16.
 */

import { Modal, Button, Row} from 'antd';
import styles from './ConfirmModal.less';

const ComfirmModal = ({ visiable, onSubmit, onCancel }) => {
  function onCancelClick() {
    onCancel();
  }
  function onSubmitClick() {
    onSubmit();
  }
  return (
    <div>
      <Modal
        title=""
        footer=""
        visible={visiable}
        onCancel={onCancel}
        closable={false}
        width={432}
        bodyStyle={{ height: 170, border: '1px solid #02abe3' }}
        className={styles.modalBody}
                >
        <div className={styles.modalHeader}>
          <span className={styles.modalHeaderTitle}>提示</span>
        </div>
        <div className={styles.serchWrap}>
            您的操作可能引起数据变化，请确认！
        </div>
        <Row type="flex" justify="space-between" className={styles.footer}>
          <Button type="primary" className={styles.refreshMatch} onClick={onSubmitClick}>确定</Button>
          <Button type="primary" ghost className={styles.refreshMatch} onClick={onCancelClick}>关闭</Button>
        </Row>
      </Modal>
    </div>);
};


export default ComfirmModal;

