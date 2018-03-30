import React, {PureComponent} from "react";
import {I18n, Trans} from "react-i18next";
import {NavLink, Link} from "react-router-dom";
import Slider from "react-slick";

import {getMainMinHeight, getQuery,indexRemFun,setLocalItem, addClass, hasClass, removeClass, toPosition,getLocalItem,remFun} from "../../../../utils/util";
import Header from "../../../../components/header";

import logo from "../../../../assets/images/eicon1.png";
import logotext from "../../../../assets/images/eInWeCrypto-logo.png";
import inwetextimg from "../../../../assets/images/einwecrypto.png";
import phoneImg from "../../../../assets/images/eback.png";
import elefticon from "../../../../assets/images/elefticon.png";
import erighticon from "../../../../assets/images/erighticon.png";
import elogo from "../../../../assets/images/elogo.png";
import eiconzixun from "../../../../assets/images/eiconzixun.png";
import eicon20 from "../../../../assets/images/eicon20.png";
import eicon19 from "../../../../assets/images/eicon19.png";
import eicon18 from "../../../../assets/images/eicon18.png";
import eicon17 from "../../../../assets/images/eicon17.png";
import eicon16 from "../../../../assets/images/eicon16.png";
import eicon15 from "../../../../assets/images/eicon15.png";
import eicon14 from "../../../../assets/images/eicon14.png";
import eicon13 from "../../../../assets/images/eicon13.png";
import eicon12 from "../../../../assets/images/eicon12.png";
import eicon7 from "../../../../assets/images/eicon7.png";
import eicon6 from "../../../../assets/images/eicon6.png";
import eicon5 from "../../../../assets/images/eicon5.png";
import eicon4 from "../../../../assets/images/eicon4.png";
import eicon3 from "../../../../assets/images/eicon3.png";
import eproject from "../../../../assets/images/eproject.png";
import ebg_1 from "../../../../assets/images/ebg_1.png";
import ebg_2 from "../../../../assets/images/ebg_2.png";
import ebg_4 from "../../../../assets/images/ebg_4.png";
import ebg_5 from "../../../../assets/images/ebg_5.png";
import commendus from "../../../../assets/images/commendus.jpeg";

import "./index.less";
export default class Root extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillReceiveProps(nextProps) {}
    componentWillMount(){
        const that = this;
        indexRemFun();
        window.addEventListener("resize",function() {
            indexRemFun();
        });
        
    }
    componentDidMount() {
        const that = this;
        //滚动动画
        this.pageScrollMover();
        setTimeout(() => {
            that.pageScrollFun();
        },1000)
    }
    pageScrollMover(){
        const pageBox = document.getElementById("e-hugeBox");
        parent.addEventListener("scroll", this.pageScrollFun)
    }
    pageScrollFun(){
        var showBoxList = document.getElementsByClassName("showFlowBox");
        var winHei = document.documentElement.clientHeight;
        for(var i = 0; i < showBoxList.length; i++){
            var boxDom = showBoxList[i];
            if(boxDom.getBoundingClientRect().top < winHei - 100){
                addClass(boxDom, "showTogger")
            }else if(boxDom.getBoundingClientRect().top > winHei - 100){
                removeClass(boxDom, "showTogger")
            }
        }
    }
    changeLanguage(type) {
		this.props.changeLng(type);
		window.i18n.changeLanguage(type);
		setLocalItem("language", type);
    }
    
    render() {
        const {lng, changeLng, registerUser, userInfo} = this.props;
        const {} = this.state;
        let isEnAndTouch = ((window.i18n.language == "en") && IsTouchDevice);
        return (
            <I18n>
                {(t, {i18n}) => (
                    <div className="container m-container e-hugeBox" id="e-hugeBox">
                        <div className="headerBox">
                            <div className="navBox">
                                <div className="eleft">
                                    <div className="logobox">
                                        <img src={logo} alt=""/>
                                    </div>
                                    <div className="logotextbox">
                                        <img src={logotext} alt=""/>
                                    </div>
                                </div>
                                {
                                    IsTouchDevice ? (
                                        <div className="eright">
                                            <div 
                                                onClick={() => {
												    this.changeLanguage("zh");
											    }}
                                            >中文</div>
                                            <div>|</div>
                                            <div
                                                onClick={() => {
												    this.changeLanguage("en");
											    }}
                                            >EN</div>
                                        </div>
                                    ) : (
                                        <div className="eright">
                                            {/* <div onClick={toPosition.bind(this, "downloadBox")}>{t("index.download", lng)}</div> */}
                                            <div onClick={toPosition.bind(this, "contactBox")}>{t("index.contact", lng)}</div>
                                            <div className="langChange">
                                                {t("index.language", lng)}
                                                <span className="langBox">
                                                    <p onClick={() => {
                                                        this.changeLanguage("en");
                                                    }}>ENGLISH</p>
                                                    <p  onClick={() => {
                                                        this.changeLanguage("zh");
                                                    }}>中文</p>
                                                </span>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="bgimgBox">
                                <img src={IsTouchDevice ? ebg_2 : ebg_1} alt=""/>
                            </div>
                            <div className="inweTextImg">
                                <img src={inwetextimg} alt=""/>
                            </div>
                            <div className={
                                isEnAndTouch ? "inweTitle  entouch" : "inweTitle "
                            }>
                                {
                                    isEnAndTouch ? 
                                        (<p className="txt1 ">{t("index.txt1", lng)}</p> )
                                            :
                                        (<p className="txt1">{t("index.title", lng)}</p>)
                                }
                                {
                                    !isEnAndTouch && <p className="txt2">In Crypto We Trust.</p>
                                }
                                {
                                    !IsTouchDevice && (
                                        <div className="downloadBtn">
                                            <Link to="/download">
                                                {t("index.txt4", lng)}
                                            </Link>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="phoneImgBox showFlowBox">
                                <img src={phoneImg} alt=""/>
                            </div>
                        </div>
                        <div className="downloadBox" >
                            <div className="rightIcon">
                                <img src={eicon12} alt=""/>
                            </div>
                            <div className="downLoadHoldHei"></div>
                            <div className="content1 showFlowBox">
                                <div className={ isEnAndTouch ? "bgImg jEnTouch" : "bgImg" }>
                                    <img src={eicon6} alt=""/>
                                </div>
                                <div className={
                                    isEnAndTouch ? "textMess jEnTouch" : "textMess"
                                }>
                                    <div className="icondot1">
                                        <img src={elefticon} alt=""/>
                                    </div>
                                    <div className="icondot2">
                                        <img src={erighticon} alt=""/>
                                    </div>
                                    {
                                        IsTouchDevice ? (
                                            <div className="txtbox">
                                                <p>{t("index.txt1_1", lng)}</p>
                                                <p>{t("index.txt1_2", lng)}</p>
                                                <p>{t("index.txt1_3", lng)}</p>
                                                <p>{t("index.txt1_4", lng)}</p>
                                                <p>{t("index.txt1_5", lng)}</p>
                                            </div>
                                        ) : (
                                            <div className="txtbox">
                                                <p>{t("index.txt1_1", lng)}</p>
                                                <p>{t("index.txt1_2", lng)}</p>
                                                <p>{t("index.txt1_3", lng)}</p>
                                                <p>{t("index.txt1_4", lng)}</p>
                                                <p>{t("index.txt1_5", lng)}</p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="content2" id="downloadBox">
                                <div className="c2-title showFlowBox">
                                    <p className="mess1">{t("index.txt2", lng)}</p>
                                    <p className={
                                        isEnAndTouch ? "mess2 jEntouch" : "mess2"
                                    }>{t("index.txt3", lng)}</p>
                                </div>
                                <div className="c2-list showFlowBox">
                                    <div className="phoneAnd">
                                        <img src={eicon13} alt=""/>
                                    </div>
                                    <div className="phonemac">
                                        <img src={eicon14} alt=""/>
                                    </div>
                                    <div className="pcAnd">
                                        <img src={eicon15} alt=""/>
                                    </div>
                                    <div className="pcmac">
                                        <img src={eicon16} alt=""/>
                                    </div>
                                </div>
                                {
                                    IsTouchDevice && (
                                        <div className="downloadBtn showFlowBox">
                                            <Link to="/download">
                                                {t("index.txt4", lng)}
                                            </Link>
                                        </div>
                                    )
                                }
                                <div className="downloadBtnHold"></div>
                            </div>
                        </div>
                        <div className="shadowBox"></div>
                        <div className="intrduceBox">
                            <div className="bgImgLeft">
                                {
                                    IsTouchDevice ? (
                                        <img src={ebg_4} alt=""/>
                                    ) : (
                                        <img src={eicon18} alt=""/>
                                    )
                                }
                            </div>
                            <div className="bgImgRight">
                                {
                                    IsTouchDevice ? (
                                        <img src={ebg_5} alt=""/>
                                    ) : (
                                        <img src={eicon19} alt=""/>
                                    )
                                }
                            </div>
                            <div className="intrMessContainer">
                                <div className={
                                    isEnAndTouch ? "intrCell isEnTouch" : "intrCell"
                                }>
                                    <div className="cellImg showFlowBox">
                                        <img src={eiconzixun} alt=""/>
                                    </div>
                                    <div className="cellText showFlowBox">
                                        <div className="celltextContain ct_1">
                                            <p className="title">{t("index.txt5", lng)}</p>
                                            <p className="content">
                                                <span>{t("index.txt6", lng)}</span><br/>
                                                <span>{t("index.txt7", lng)}</span><br/>
                                                <span>{t("index.txt8", lng)}</span><br/>
                                                <span>{t("index.txt9", lng)}</span><br/>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={
                                    isEnAndTouch ? "intrCell isEnTouch" : "intrCell"
                                }>
                                    <div className="cellText showFlowBox">
                                        <div className="celltextContain ct_2">
                                            <p className={
                                                ((window.i18n.language == "en") && !IsTouchDevice) ? "title jlngEnRight" : "title"
                                            }>{t("index.txt10", lng)}</p>
                                            <p className= {
                                               ((window.i18n.language == "en") && !IsTouchDevice) ? "content jlngEnRight" : "content"
                                            }>
                                            <span>{t("index.txt11", lng)}</span><br/> 
                                            <span>{t("index.txt12", lng)}</span><br/> 
                                            <span>{t("index.txt13", lng)}</span><br/>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="cellImg showFlowBox">
                                        <img src={eproject} alt=""/>
                                    </div>
                                </div>
                                <div className={
                                    isEnAndTouch ? "intrCell isEnTouch" : "intrCell"
                                }>
                                    <div className="cellImg showFlowBox">
                                        <img src={eicon20} alt=""/>
                                    </div>
                                    <div className="cellText showFlowBox">
                                        <div className="celltextContain ct_3">
                                            <p className="title">{t("index.txt14", lng)}</p>
                                            <p className="content">
                                            <span>{t("index.txt15", lng)}</span><br/> 
                                            <span>{t("index.txt16", lng)}</span><br/> 
                                            <span>{t("index.txt17", lng)}</span><br/>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="contactBox" id="contactBox">
                            <div className="title">{t("index.txt18", lng)}</div>
                            <div className="imgBox">
                                <img src={elogo} alt=""/>
                            </div>
                            <ul className="iconBox ">
                                <li>
                                    <a href="https://medium.com/@inwecrypto">
                                        <img src={eicon7} alt=""/>
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:support@inwecrypto.com">
                                        <img src={eicon4} alt=""/>
                                    </a>
                                </li>
                                <li className="airportIcon">
                                    <img src={eicon3} alt=""/>
                                    <img className="airportQrcode" src={commendus} alt=""/>
                                </li>
                                <li>
                                	<a href="https://twitter.com/inwe_crypto">
		                                <img src={eicon5} alt=""/>
                                	</a>
                                </li>
                            </ul>
                            <div className="footerText ">
                                ©InWeCrypto 2018
                            </div>
                        </div>
                    </div>
                )}
            </I18n>
        );
    }
}
