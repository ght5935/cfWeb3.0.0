import React from 'react';
import { connect } from 'dva';
import { Row } from 'antd';
import { Link } from 'dva/router';
import QueueAnim from 'rc-queue-anim';

import styles from './IndexPage.less';
import Header from '../../components/common/Layout/Header';

import { API_PREFIX } from '../../utils/config';

class IndexPage extends React.Component {
  componentWillMount() {
    this.props.dispatch({
      type: 'navigation/navList'
    });
  }
  onModuleClick = id => {
    // this.props.dispatch({
    //     type: 'navigation/success',
    //     payload: {
    //         parentId: id
    //     }
    // });
    document.cookie = `parentId=${id}`;
    // this.props.dispatch({
    //   type: 'navigation/getSubModule'
    // });
  }

  renderNavList = () => {
    if (this.props.navigation.navlist && this.props.navigation.navlist.length > 0) {
      return this.props.navigation.navlist.map(value => (
        <div className={styles.group} key={value.moduleId}>
          <div className={styles.title}>
            <span className={styles.text}>{value.moduleName}</span>
          </div>

          {value.subNavigationDataList.length > 0 ? value.subNavigationDataList.map(item => (
            <div key={item.moduleId} onClick={this.onModuleClick.bind(null, item.parent_id)}>

              <Link to={item.url}>
                <div className={styles.card}>
                  <div className={styles.d1}>
                    <div className={styles.d2}></div>
                    <div className={styles.d4}></div>
                    {/*<div className={styles.photograph}/>*/}
                    <img className={styles.photograph} src={`${API_PREFIX}${item.icon}`} alt="" />
                    <span className={styles.fontText}>{item.moduleName}</span>
                    <div className={styles.introduce}>
                      {/*<span>{item.memo}</span>  TODO*/}
                      <span className={styles.memoText}>{item.memo}</span>
                    </div>

                    <div className={styles.d3}></div>
                    <div className={styles.d5}></div>
                  </div>
                </div>
              </Link>

            </div>
          )) : null}
        </div>
      ));
    }
  }

  render() {
    return (
      <div>
        <Row className={styles.wrap} />
        <Header />
        <QueueAnim
          className={styles.basics}
          animConfig={[
            { opacity: [1, 0], translateY: [0, 30] },
            { height: 0 },
          ]}
          ease={['easeOutQuart', 'easeInOutQuart']}
          duration={[550, 450]}
          interval={150}
        >
          {this.renderNavList()}
        </QueueAnim>
      </div>
    );
  }
}

function mapStateToProps({ navigation }) {
  return { navigation };
}

export default connect(mapStateToProps)(IndexPage);
