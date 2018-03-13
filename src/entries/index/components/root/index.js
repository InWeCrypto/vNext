import React, {PureComponent} from "react";
import {I18n, Trans} from "react-i18next";
import {NavLink, Link} from "react-router-dom";
import Slider from "react-slick";

import {getMainMinHeight, getQuery,indexRemFun,setLocalItem} from "../../../../utils/util";
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
import eicon6 from "../../../../assets/images/eicon6.png";
import eicon5 from "../../../../assets/images/eicon5.png";
import eicon4 from "../../../../assets/images/eicon4.png";
import eicon3 from "../../../../assets/images/eicon3.png";
import eproject from "../../../../assets/images/eproject.png";
import ebg_1 from "../../../../assets/images/ebg_1.png";
import ebg_2 from "../../../../assets/images/ebg_2.png";
import ebg_4 from "../../../../assets/images/ebg_4.png";
import ebg_5 from "../../../../assets/images/ebg_5.png";

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
        //滚动动画
        this.pageScrollMover();
    }
    pageScrollMover(){
        const pageBox = document.getElementById("e-hugeBox");
        parent.addEventListener("scroll", this.pageScrollFun)
    }
    pageScrollFun(){

    }
    componentDidMount() {}
    changeLanguage(type) {
		this.props.changeLng(type);
		window.i18n.changeLanguage(type);
		setLocalItem("language", type);
    }
    //平滑滚动
    toPosition(id, e){
        let targetDom = e.target;
        let dom = document.getElementById(id);
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let position = dom.getBoundingClientRect().top + scrollTop;
        clearInterval(targetDom.timer);  
        let firstPos = -1, secondPos = -2;
        //默认上次与本次位置不同
        let goonFlag = true; 
        targetDom.timer=setInterval(function(){  
            var currentPos=document.documentElement.scrollTop || document.body.scrollTop, iSpeed=0;  
            iSpeed=(position-currentPos)/8;  
            iSpeed=iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);  
            if((parseInt(position) != parseInt(currentPos)) && goonFlag ){  
                window.scrollTo(0,currentPos+iSpeed); 
                if(firstPos != secondPos){
                    //前后两次位置不同
                    firstPos = secondPos;
                    secondPos = currentPos+iSpeed
                }else{
                    //位置相同，无法滚动至该元素
                    goonFlag = false;
                }
            }else{
                //清理滚动  
                clearInterval(targetDom.timer);  
            }  
        },1);  
    }
    
    render() {
        const {lng, changeLng, registerUser, userInfo} = this.props;
        const {} = this.state;

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
                                            <div onClick={this.toPosition.bind(this, "downloadBox")}>Download</div>
                                            <div onClick={this.toPosition.bind(this, "contactBox")}> Contact</div>
                                            <div>Language</div>
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
                            <div className="inweTitle">
                                <p className="txt1">{t("index.title", lng)}</p>
                                <p className="txt2">In Crypto We Trust.</p>
                            </div>
                            <div className="phoneImgBox">
                                <img src={phoneImg} alt=""/>
                            </div>
                        </div>
                        <div className="downloadBox" id="downloadBox">
                            <div className="rightIcon">
                                <img src={eicon12} alt=""/>
                            </div>
                            <div className="downLoadHoldHei"></div>
                            <div className="content1">
                                <div className="bgImg">
                                    <img src={eicon6} alt=""/>
                                </div>
                                <div className="textMess">
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
                                            </div>
                                        ) : (
                                            <div className="txtbox">
                                                <p>{t("index.txt1_1", lng)}</p>
                                                <p>{t("index.txt1_2", lng)}</p>
                                                <p>{t("index.txt1_5", lng)}</p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="content2">
                                <div className="c2-title">
                                    <p className="mess1">{t("index.txt2", lng)}</p>
                                    <p className="mess2">{t("index.txt3", lng)}</p>
                                </div>
                                <div className="c2-list">
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
                                <div className="downloadBtn">
                                    <Link to="/download">
                                        {t("index.txt4", lng)}
                                    </Link>
                                </div>
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
                                <div className="intrCell">
                                    <div className="cellImg">
                                        <img src={eiconzixun} alt=""/>
                                    </div>
                                    <div className="cellText">
                                        <div className="celltextContain ct_1">
                                            <p className="title">{t("index.txt5", lng)}</p>
                                            <p className="content">
                                            {t("index.txt6", lng)}<br/>
                                            {t("index.txt7", lng)}<br/>
                                            {t("index.txt8", lng)}<br/>
                                            {t("index.txt9", lng)}<br/>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="intrCell">
                                    <div className="cellText">
                                        <div className="celltextContain ct_2">
                                            <p className="title">{t("index.txt10", lng)}</p>
                                            <p className="content">
                                            {t("index.txt11", lng)}<br/> 
                                            {t("index.txt12", lng)}<br/> 
                                            {t("index.txt13", lng)}<br/>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="cellImg">
                                        <img src={eproject} alt=""/>
                                    </div>
                                </div>
                                <div className="intrCell">
                                    <div className="cellImg">
                                        <img src={eicon20} alt=""/>
                                    </div>
                                    <div className="cellText">
                                        <div className="celltextContain ct_3">
                                            <p className="title">{t("index.txt14", lng)}</p>
                                            <p className="content">
                                            {t("index.txt15", lng)}<br/> 
                                            {t("index.txt16", lng)}<br/> 
                                            {t("index.txt17", lng)}<br/>
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
