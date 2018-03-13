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
import eicon18 from "../../../../assets/images/eicon18.png";
import eicon19 from "../../../../assets/images/eicon19.png";

import fopenapp from "../../../../assets/images/fopenapp.png";
import fdownloadapp from "../../../../assets/images/fdownloadapp.png";
import fapplication_book from "../../../../assets/images/fapplication_book.png";
import fiosqrcode from "../../../../assets/images/fiosqrcode.png";


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
        if(!IsTouchDevice){
            indexRemFun();
            window.addEventListener("resize",function() {
                indexRemFun();
            })
        }
    }
    componentDidMount() {}
    
    render() {
        const {lng, changeLng, registerUser, userInfo} = this.props;
        const {} = this.state;
        return (
            <I18n>
                {(t, {i18n}) => (
                    <div className="container m-container e-hugeDownIosBox">
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
                            <p className="mess1">{t("downios.txt1", lng)}</p>
                            <p className="mess2">
                                <img src={fiosqrcode} alt=""/>
                            </p>
                            <p className="mess3">{t("downios.txt2", lng)}</p>
                        </div>
                        <div className="downloadBox">
                            <div className="downloadPhoneImg">
                                <img src={fdownloadapp} alt=""/>
                            </div>
                            <div className="mobileDownload">
                                <p className="mmess1">1.{t("downios.txt3", lng)}</p>
                                <p className="mmess2">
                                    {t("downios.txt4_1", lng)}
                                    <br/>
                                    {t("downios.txt4_2", lng)}
                                    <br/>
                                    {t("downios.txt4_3", lng)}
                                </p>
                            </div>
                        </div>
                        <div className="pcDownloadBox">
                            <div className="imgCover2">
                                <img src={eicon18} alt=""/>
                            </div>
                            <div className="imgCover3">
                                <img src={eicon19} alt=""/>
                            </div>
                            <div className="pcDownload">
                                <p className="mess1">2. {t("downios.txt5", lng)}</p>
                                <p className="mess2">
                                    {t("downios.txt6_1", lng)}
                                    <br/>
                                    {t("downios.txt6_2", lng)}
                                    <br/>
                                    {t("downios.txt6_3", lng)}
                                </p>
                            </div>
                            <div className="pcImg">
                                <img src={fapplication_book} alt=""/>
                            </div>
                        </div>
                        <div className="downloadBox " id="openApp">
                            <div className="downloadPhoneImg">
                                <img src={fopenapp} alt=""/>
                            </div>
                            <div className="mobileDownload">
                                <p className="mmess1">3. {t("downios.txt7", lng)}</p>
                                <p className="mmess2">
                                {t("downios.txt8", lng)}
                                </p>
                            </div>
                        </div>
                        <div className="contactBox">
                            <div className="titlev">{t("index.txt18", lng)}</div>
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
