/**
 * Created by Ethan on 2018/1/15.
 */
import React from 'react';
import { connect } from 'dva';
import QueueAnim from 'rc-queue-anim';
import MayLayout from '../../../components/common/Layout/MayLayout';
import RealPoliceCard from './RealPoliceCard';
import styles from './realPolice.less';

class RealPolice extends React.Component {
  render() {
    return (
      <MayLayout location={this.props.location}>
        <QueueAnim className={styles.list}>
          {this.props.basics_rt.alarmList.map((value, index) => {
            if (index < 12) { return <RealPoliceCard data={value} key={index} />; }
            return false;
          })}
        </QueueAnim>
      </MayLayout>
    );
  }
}

function mapStateToProps({ basics_rt }) {
  return { basics_rt };
}

export default connect(mapStateToProps)(RealPolice);
