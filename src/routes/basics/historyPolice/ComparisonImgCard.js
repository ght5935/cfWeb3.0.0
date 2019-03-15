/**
 * Created by Ethan on 2018/2/2.
 */
import React from 'react';
import { connect } from 'dva';
import { Progress, Row, Col } from 'antd';
import styles from './historyPolice.less';
import testImg from '../../../assets/gyc.jpg';
import style from '../../../theme/swiper/swiper-4.3.3.min.css';
import Swiper from 'swiper'
var mySwiper;
class ComparisonImgCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      container: 'swiper-container',
      slide: 'swiper-slide',
      wrapper: 'swiper-wrapper',
      buttonPrev: 'swiper-button-prev',
      buttonNext: 'swiper-button-next',
      alarmPersonList: this.props.alarmPersonList,
      faceTrackData: this.props.faceTrackData,
      historyPoliceValue: this.props.historyPoliceValue,
      disabledClass: 'my-button-disabled',
      otherButPrev: 'my-slide-pre',
      otherButNext: 'my-slide-next',
      index: this.props.index,
      hiddenClass: 'my-button-hidden'

    }
  }
  componentDidMount() {
    const { buttonNext, buttonPrev, container, wrapper, slide, disabledClass, otherButNext, otherButPrev, index, hiddenClass } = this.state;
    mySwiper = new Swiper(`#swiper${index + 1}`, {
      // width:1150,
      observer: true,
      spaceBetween: 12,
      slidesPerView: 4,
      watchOverflow: true,
      navigation: {
        nextEl: `.${style[buttonNext]}`,
        prevEl: `.${style[buttonPrev]}`,
      },
      on: {
        slideChange: function () {
          if (this.isEnd) {
            this.navigation.$nextEl.css('display', 'none');
          } else {
            this.navigation.$nextEl.css('display', 'block');
          }
          if (this.isBeginning) {
            this.navigation.$prevEl.css('display', 'none');
          } else {
            this.navigation.$prevEl.css('display', 'block');
          }
        },
      },
      wrapperClass: `${style[wrapper]}`,
      slideClass: `${style[slide]}`,
      paginationClickable: true,
      slideNextClass: `${style[otherButNext]}`,
      slidePrevClass: `${style[otherButPrev]}`,
    })
  }
  componentWillReceiveProps(nextProps) {
    mySwiper.navigation.update();
    if (nextProps !== this.props) {
      this.setState({
        alarmPersonList: nextProps.alarmPersonList,
        faceTrackData: nextProps.faceTrackData,
        historyPoliceValue: nextProps.historyPoliceValue,
      })
    }
  }

  handleClick = (value) => {
    const historyPolice = this.state.historyPoliceValue;
    const faceTrackData = this.state.faceTrackData;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPolice: {
          ...historyPolice,
          personData: value,
          takeImgData: faceTrackData
        },
        detailsModalData: faceTrackData,
        detailsModal: true
      }
    });

  }

  render() {
    const { container, wrapper, slide, buttonNext, buttonPrev, alarmPersonList, faceTrackData, index } = this.state;
    return (
      <div className={styles.comparisonWrap}  >

        <div className={`${style[container]} ${styles.boxContainer}`} id={`swiper${index + 1}`}>

          <div className={`${style[buttonPrev]} ${styles[buttonPrev]}`}   ></div>
          <div className={`${style[wrapper]} ${styles.wraper}`} >
            {alarmPersonList ? alarmPersonList.map((value, i) => {
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
                <div key={i} className={`${style[slide]} ${styles.swiperSlide} ${styles.card}`} onClick={this.handleClick.bind(this, value)} >
                  <img src={value.uploadImgs && value.uploadImgs.length > 0 ? value.uploadImgs[0] : value.imgs[0]} alt="" className={styles.camera} />
                  <div className={styles.textGroup}>
                    <p>{value.name}</p>
                    <p>{value.identityCard}</p>
                    <p>{groupName}</p>
                    <Progress percent={(value.score * 100).toFixed(2) - 0} size="small" strokeWidth={4} styles={{ marginTop: '50px' }} />
                  </div>
                </div>
              )
            }
            ) : null}
          </div>

          <div className={`${style[buttonNext]} ${styles[buttonNext]}`} ></div>

        </div>
      </div>
    )
  }


}
function mapStateToProps({ basics }) {
  return { basics };
}

export default connect(mapStateToProps)(ComparisonImgCard);
