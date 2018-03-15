import React, {PureComponent} from "react";
import {I18n, Trans} from "react-i18next";
import {NavLink, Link} from "react-router-dom";
import Slider from "react-slick";

import {getMainMinHeight, getQuery,indexRemFun,setLocalItem, addClass, hasClass, removeClass, toPosition,isWeiXin} from "../../../../utils/util";
import Header from "../../../../components/header";

import logo from "../../../../assets/images/dfooter_logo.png";
import dphone from "../../../../assets/images/dphone.png";
import dpc from "../../../../assets/images/dpc.png";

import eicon3 from "../../../../assets/images/eicon3.png";
import eicon4 from "../../../../assets/images/eicon4.png";
import eicon5 from "../../../../assets/images/eicon5.png";

import dyou_yingying from "../../../../assets/images/dyou_yingying.png";
import dzuo_yingying from "../../../../assets/images/dzuo_yingying.png";
import commendus from "../../../../assets/images/commendus.jpeg";



import "./index.less";
import { reactI18nextModule } from "react-i18next/dist/commonjs/context";
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
        this.initPageMove();
    }
    initPageMove(){
        const pageBox = document.getElementById("e-hugeDownLoadBox");
    }
    toDownLoadAnd(){
        window.location.href = "https://www.pgyer.com/InWeCryptoAndroid";
        // var iswx = isWeiXin();
        // if(iswx){
        //     this.setState({
        //         showWxCover: true
        //     })
        // }else{
        //     window.location.href = "https://www.pgyer.com/InWeCryptoAndroid";
        //    // window.location.href = "http://inwecrypto-china.oss-cn-shanghai.aliyuncs.com/inwecrypto.apk"
        // }
    }
    componentDidMount() {}
    pageScrollMover(){
        const pageBox = document.getElementById("e-hugeDownLoadBox");
        parent.addEventListener("scroll", this.pageScrollFun)
    }
    pageScrollFun(){
        var showBoxList = document.getElementsByClassName("showFlowBox");
        var winHei = document.documentElement.clientHeight;
        for(var i = 0; i < showBoxList.length; i++){
            var boxDom = showBoxList[i];
            if(boxDom.getBoundingClientRect().top < winHei - 50){
                addClass(boxDom, "showTogger")
            }else if(boxDom.getBoundingClientRect().top > winHei + 50){
                removeClass(boxDom, "showTogger")
            }
        }
    }
    changeLanguage(type) {
		this.props.changeLng(type);
		window.i18n.changeLanguage(type);
		setLocalItem("language", type);
    }
    toIndex(){
        window.location.href="/"
    }
    render() {
        const {lng, changeLng, registerUser, userInfo, showWxCover} = this.props;
        const {} = this.state;
        let isEnAndTouch = ((window.i18n.language == "en") && IsTouchDevice);
        return (
            <I18n>
                {(t, {i18n}) => (
                    <div className="container m-container e-hugeDownLoadBox" id="e-hugeDownLoadBox">
                        <div className="imgCover1">
                            <img src={dyou_yingying} alt=""/>
                        </div>
                        <div className="headerBox">
                            <div className="navBox">
                                <div className="eleft" onClick={this.toIndex.bind(this)}>
                                    <div className="logobox">
                                        <img src={logo} alt=""/>
                                    </div>
                                    <div className="logotextbox">
                                        InWeCrypto
                                    </div>
                                </div>
                                <div className="eright m-hide">
                                    <div onClick={toPosition.bind(this, "downloadBox")}>{t("index.download", lng)}</div>
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
                            </div>
                            <p className="mess1">{t("index.txt2",lng)}</p>
                            <p className={
                                isEnAndTouch ? "mess2 isEnTouch" : "mess2"
                            }>{t("index.txt3",lng)}</p>
                        </div>
                        <div className="downloadBox" id="downloadBox">
                            <div className="mobileDownload">
                                <p className="mmess1">{t("download.txt1",lng)}</p>
                                <p className="mmess2">{t("download.txt2",lng)}</p>
                                <div className="btnBox">
                                    <Link to="/downios">
                                        <div className="ios">
                                            <span className="icon"></span>
                                            <span className="text">IOS</span>
                                        </div>
                                    </Link>
                                    <div className="and" onClick={this.toDownLoadAnd.bind(this)}>
                                        <span className="icon"></span>
                                        <span className="text">Android</span>
                                    </div>
                                </div>
                            </div>
                            <div className="downloadPhoneImg">
                                <img src={dphone} alt=""/>
                            </div>
                        </div>
                        <div className="pcDownloadBox">
                            <div className="imgCover2">
                                <img src={dzuo_yingying} alt=""/>
                            </div>
                            <div className="pcImg">
                                <img src={dpc} alt=""/>
                            </div>
                            <div className="pcDownload">
                                <p className="mess1">{t("download.txt3",lng)}</p>
                                <p className="mess2">{t("download.txt4",lng)}</p>
                                <div className="btnBox">
                                    <div className="ios">
                                        <span className="icon"></span>
                                        <span className="text">Mac</span>
                                    </div>
                                    <div className="and">
                                        <span className="icon"></span>
                                        <span className="text">Windows</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="contactBox" id="contactBox">
                            <div className="titlev">{t("index.txt18",lng)}</div>
                            <div className="imgBox">
                                <img src={logo} alt=""/>
                            </div>
                            <ul className="iconBox ">
                                <li>
                                    <a href="mailto:support@inwecrypto.com">
                                        <img src={eicon4} alt=""/>
                                    </a>
                                </li>
                                <li className="airportIcon">
                                    <img src={eicon3} alt=""/>
                                    <img className="airportQrcode" src={commendus} alt=""/>
                                </li>
                                <li><img src={eicon5} alt=""/></li>
                            </ul>
                            <div className="footerText">
                                ©InWeCrypto 2018
                            </div>
                        </div>
                    </div>
                )}
            </I18n>
        );
    }
}
