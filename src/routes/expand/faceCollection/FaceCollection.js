
import React from 'react';
import { connect } from 'dva';
import { } from 'antd';
import MayLayout from '../../../components/common/Layout/MayLayout';
import style from '../../../theme/swiper/swiper-4.3.3.min.css';
import styles from './faceCollection.css';
import Swiper from 'swiper'
class FaceCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myName: "这里是about页面",
      container: 'swiper-container',
      slide: 'swiper-slide',
      wrapper: 'swiper-wrapper',
      buttonPrev: 'swiper-button-prev',
      buttonNext: 'swiper-button-next'
    }
  }
  componentDidMount() {
   
    const {buttonNext,buttonPrev,container,wrapper,slide}=this.state;
    var mySwiper = new Swiper(`.${style[container]}`, {
      // direction:'horizontal',
      // slidesPerView : 3,
      // centeredSlides : true,
    //  width:900,
     // roundLengths : true,
      navigation: {
        nextEl: `.${style[buttonNext]}`,
        prevEl: `.${style[buttonPrev]}`
      },
      // autoplay: true,
    //     autoplay: {
    // delay: 3000,
    // stopOnLastSlide: false,
    // disableOnInteraction: true,
    // },
    wrapperClass : `${style[wrapper]}`,
    slideClass :  `${style[slide]}` ,
    // slideNextClass : `${style[buttonPrev]}`,
    // slidePrevClass : `${style[buttonPrev]}`,
    })

  }

  render() {
    const {container,wrapper,slide,buttonNext,buttonPrev}=this.state;
    return (
      <MayLayout location={this.props.location}>
        <div className={`${style[container]} ${styles.boxContainer}`}  id="consta">
          <div className={`${style[wrapper]}`} >
            <div className={`${style[slide]} ${styles.swiperSlide}`}>Slide 1</div>
            <div className={`${style[slide]} ${styles.swiperSlide}`}>Slide 2</div>
            <div className={`${style[slide]} ${styles.swiperSlide}`} >Slide 3</div>
            <div className={`${style[slide]} ${styles.swiperSlide}`} >Slide 4</div>
            <div className={`${style[slide]} ${styles.swiperSlide}`} >Slide 5</div>
            <div className={`${style[slide]} ${styles.swiperSlide}`} >Slide 6</div>
            <div className={`${style[slide]} ${styles.swiperSlide}`} >Slide 7</div>
            <div className={`${style[slide]} ${styles.swiperSlide}`} >Slide 8</div>
            <div className={`${style[slide]} ${styles.swiperSlide}`} >Slide 9</div>
            <div className={`${style[slide]} ${styles.swiperSlide}`} >Slide 10</div>
          </div>
          <div className={`${style[buttonPrev]}`}></div>
          <div className={`${style[buttonNext]}`}></div>

        </div>
      </MayLayout>
    );
  }
}

function mapStateToProps({ expand }) {
  return { expand };
}

export default connect(mapStateToProps)(FaceCollection);
