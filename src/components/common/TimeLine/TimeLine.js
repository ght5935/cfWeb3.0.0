import React from "react";
import styles from './TimeLine.less';

class TimeLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [1,2,3,4,5,6,6,7,7,1]
        }
    }
    renderTimeLineItem = () => {
        let rt = [];
        rt = this.props.data.map((v, i) => {
            const flag = i%2;
            const delay = i
            console.log(flag)
            return (
                <div className={styles.tlItem} key={i}>
                    <i className={flag ? `${styles.line} ${styles.lineDown}` : styles.line}></i>
                    <div style={{animationDelay: delay + 0.5 + 's'}} className={flag ? `${styles.outCircle} ${styles.outCircleDown}` : styles.outCircle}>
                        <i style={{animationDelay: delay + 0.5 + 's'}} className={flag ? `${styles.innerCircle} ${styles.innerCircleDown}` : styles.innerCircle}></i>
                        <i style={{animationDelay: delay + 0.5 + 's'}} className={flag ? `${styles.arrow} ${styles.arrowDown}`: styles.arrow}></i>
                        <i style={{animationDelay: delay + 0.5 + 's'}} className={flag ? `${styles.point} ${styles.pointDowm}` : styles.point}></i>
                        <div className={flag ? `${styles.personInfo} ${styles.personInfoDown}` : styles.personInfo}>
                            <div style={{animationDelay: delay + 0.5 + 's'}} className={flag? `${styles.img} ${styles.imgDown}` : styles.img}>
                                <img src={v.imgs && v.imgs.length > 0? v.imgs[0] : ''} alt="" />
                            </div>
                            <div className={flag ?`${styles.info} ${styles.infoDown}` : styles.info}>
                                <p style={{animationDelay: delay + 0.5 + 's'}}>{v.cameraName}</p>
                                <p style={{animationDelay: delay + 0.5 + 's'}}>{v.captureTime}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
        return rt;
    }

    render() {
        return (
            <div className={styles.contain}>
                {/* <div className={styles.tlItem}>
                    <i className={styles.line}></i>
                    <div className={styles.outCircle}>
                        <i className={styles.innderCircle}></i>
                        <i className={styles.arrow}></i>
                        <i className={styles.point}></i>
                        <div className={styles.personInfo}>
                            <div className={styles.img}>
                                <img src="" alt="" />
                            </div>
                            <div className={styles.info}>
                                <p>fsf</p>
                                <p>fsfs</p>
                                <p>fsfsfsfs</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.tlItem}>
                    <i className={styles.line}></i>
                    <div className={styles.outCircle}>
                        <i className={styles.innderCircle}></i>
                        <i className={`${styles.arrow} ${styles.arrowDown}`}></i>
                        <i className={`${styles.point} ${styles.pointDowm}`}></i>
                        <div className={`${styles.personInfo} ${styles.personInfoDown}`}>
                            <div className={`${styles.img} ${styles.imgDown}`}>
                                <img src="" alt="" />
                            </div>
                            <div className={`${styles.info} ${styles.infoDown}`}>
                                <p>fsf</p>
                                <p>fsfs</p>
                                <p>fsfsfsfs</p>
                            </div>
                        </div>
                    </div>
                </div> */}
                {this.renderTimeLineItem()}
            </div>
        )
    }
}

export default TimeLine