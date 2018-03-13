import React, {PureComponent} from "react";
import {I18n, Trans} from "react-i18next";
import {NavLink, Link} from "react-router-dom";
import Slider from "react-slick";

import {getMainMinHeight, getQuery,indexRemFun} from "../../../../utils/util";
import Header from "../../../../components/header";

import logo from "../../../../assets/images/dfooter_logo.png";
import dphone from "../../../../assets/images/dphone.png";
import dpc from "../../../../assets/images/dpc.png";

import eicon3 from "../../../../assets/images/eicon3.png";
import eicon4 from "../../../../assets/images/eicon4.png";
import eicon5 from "../../../../assets/images/eicon5.png";

import dyou_yingying from "../../../../assets/images/dyou_yingying.png";
import dzuo_yingying from "../../../../assets/images/dzuo_yingying.png";



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
        window.location.href = "http://inwecrypto-china.oss-cn-shanghai.aliyuncs.com/inwecrypto.apk"
    }
    componentDidMount() {}
    
    render() {
        const {lng, changeLng, registerUser, userInfo} = this.props;
        const {} = this.state;
        return (
            <I18n>
                {(t, {i18n}) => (
                    <div className="container m-container e-hugeDownLoadBox" id="e-hugeDownLoadBox">
                        <div className="imgCover1">
                            <img src={dyou_yingying} alt=""/>
                        </div>
                        <div className="headerBox">
                            <div className="navBox">
                                <div className="eleft">
                                    <div className="logobox">
                                        <img src={logo} alt=""/>
                                    </div>
                                    <div className="logotextbox">
                                        InWeCrypto
                                    </div>
                                </div>
                                <div className="eright m-hide">
                                    <div>Download</div>
                                    <div>Contact</div>
                                    <div>Language</div>
                                </div>
                            </div>
                            <p className="mess1">{t("index.txt2",lng)}</p>
                            <p className="mess2">{t("index.txt3",lng)}</p>
                        </div>
                        <div className="downloadBox">
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
                        <div className="contactBox">
                            <div className="titlev">{t("index.txt18",lng)}</div>
                            <div className="imgBox">
                                <img src={logo} alt=""/>
                            </div>
                            <ul className="iconBox">
                                <li><img src={eicon4} alt=""/></li>
                                <li><img src={eicon3} alt=""/></li>
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
