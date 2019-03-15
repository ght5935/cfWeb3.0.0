/**
 * Created by Ethan on 2018/2/28.
 */
import React from 'react';
import { connect } from 'dva';
import { Input, Row, Button } from 'antd';
import styles from './DatumEdit.less';
import MayLayout from '../../../components/common/Layout/MayLayout';

const { TextArea } = Input;

class DatumEdit extends React.Component {
  componentWillMount() {
    this.props.dispatch({
      type: 'personal/getUserMsg'
    });
  }
  onNameChange = e => {
    const modifyUser = this.props.personal.modifyUser;
    this.props.dispatch({
      type: 'personal/success',
      payload: {
        modifyUser: {
          ...modifyUser,
          name: e.target.value
        }
      }
    });
  };
  onPhoneChange = e => {
    const modifyUser = this.props.personal.modifyUser;
    this.props.dispatch({
      type: 'personal/success',
      payload: {
        modifyUser: {
          ...modifyUser,
            phone: e.target.value
        }
      }
    });
  };
  onMailChange = e => {
    const modifyUser = this.props.personal.modifyUser;
    this.props.dispatch({
      type: 'personal/success',
      payload: {
        modifyUser: {
          ...modifyUser,
            email: e.target.value
        }
      }
    });
  };
  onMemoChange = e => {
    const modifyUser = this.props.personal.modifyUser;
    this.props.dispatch({
      type: 'personal/success',
      payload: {
        modifyUser: {
          ...modifyUser,
            memo: e.target.value
        }
      }
    });
  };
    onOkClick =() => {
      this.props.dispatch({
        type:'personal/modifyUser'
      })
    }
  render() {
    return (
      <MayLayout location={this.props.location}>
        <div className={styles.wrap}>
          <div className={styles.title}>资料修改</div>
          <div className={styles.content}>
            <div className={styles.formItem}>
              <label className={styles.label}>用户名：</label>
              <Input type="text" style={{ width: '30%', minWidth: '200px'}} disabled={true} value={this.props.personal.modifyUser.loginName} />
            </div>
            <div className={styles.formItem}>
              <label className={styles.label}>姓名：</label>
              <Input type="text" style={{ width: '30%', minWidth: '200px'}} value={this.props.personal.modifyUser.name} onChange={this.onNameChange}/>
            </div>
            <div className={styles.formItem}>
              <label className={styles.label}>手机号：</label>
              <Input type="text" style={{ width: '30%', minWidth: '200px'}} value={this.props.personal.modifyUser.phone} onChange={this.onPhoneChange}/>
            </div>
            <div className={styles.formItem}>
              <label className={styles.label}>电子邮箱：</label>
              <Input type="text" style={{ width: '30%', minWidth: '200px'}} value={this.props.personal.modifyUser.email} onChange={this.onMailChange}/>
            </div>
            <div className={styles.formItem}>
              <label className={styles.label}>所属角色：</label>
              <Input type="text" style={{ width: '30%', minWidth: '200px'}} disabled={true} value={this.props.personal.modifyUser.roleName}/>
            </div>
            <div className={styles.formItem}>
              <label className={styles.label}>所属组织：</label>
              <Input type="text" style={{ width: '30%', minWidth: '200px'}} disabled={true} value={`${this.props.personal.modifyUser.orgunitName}`}/>
            </div>
            <div className={styles.formItem}>
              <label className={styles.label}>备注：</label>
              <TextArea style={{width: '30%', minWidth: '200px'}} value={this.props.personal.modifyUser.memo} onChange={this.onMemoChange}/>
            </div>

          </div>
          <Row type="flex" justify="center" className={styles.footer}>
            <Button type="primary" className={styles.refreshMatch} onClick={this.onOkClick}>确定</Button>
            <Button type="primary" ghost className={styles.refreshMatch}>关闭</Button>
          </Row>
        </div>
      </MayLayout>
    );
  }
}

function mapStateToProps({ personal }) {
  return { personal};
}

export default connect(mapStateToProps)(DatumEdit);
