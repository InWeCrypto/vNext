import React, {PureComponent} from "react";
import {I18n, Trans} from "react-i18next";
import {NavLink, Link} from "react-router-dom";
import QcodeBox from "../../../../components/qcode";
import {getMainMinHeight, getQuery, getLocalTime, addFixed2Body,isAndroidOrIos,getDownloadSit} from "../../../../utils/util.js";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import FixedMenu from "../../../../components/fixedmenu";
import TurnApp from "../../../../components/turnapp";
import ImgPreview from "../../../../components/imgpreview";
import origlePic from "../../../../assets/images/yuanchuang_pic.png";

import fclose_icon from "../../../../assets/images/fclose_icon.png";
import logoapp from "../../../../assets/images/logoapp.png";
import "./index.less";
import {platform} from "os";

export default class Root extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            minH: "auto",
            isShowImg: true,
            newsType: "video", // video img
            isJump: "", // yes no
            art_id: "",
            enable: false,
            showShareList: false,
            isShowQcode: false,
            QcodeUrl: "",
            previewImgSrc: "",
            showVideoType: true
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.location.search != this.props.location.search) {
            this.initPage(nextProps.location.search);
        }
    }
    componentDidMount() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        document.title = "InWe-" + i18n.t("navMenu.news", this.props.lng);
        let minH = getMainMinHeight();
        // let leftArrow = document.getElementById("newsDetailLeft").offsetLeft;
        // document.getElementById("newsDetailRight").style.right = 	leftArrow + "px";
        let contW = document
            .getElementById("newsDetailConBox")
            .offsetWidth - parseFloat(getComputedStyle(document.getElementById("newsDetailConBox"))["padding-left"], 10) - parseFloat(getComputedStyle(document.getElementById("newsDetailConBox"))["padding-right"], 10);
        if (document.body.offsetWidth > 1366) {
            document
                .getElementById("newsDetailLeft")
                .style
                .marginLeft = "-" + (contW / 2 + 36 + 10) + "px";
            document
                .getElementById("newsDetailRight")
                .style
                .marginLeft = contW / 2 + 20 + 10 + "px";
        } else {
            document
                .getElementById("newsDetailLeft")
                .style
                .marginLeft = "-" + (contW / 2 + 36) + "px";
            document
                .getElementById("newsDetailRight")
                .style
                .marginLeft = contW / 2 + 20 + "px";
        }

        this.setState({minH: minH});
        document
            .querySelector("#mainBox")
            .style
            .minHeight = minH + "px";
        this.initPage(this.props.location.search);
        document.addEventListener("click", () => {
            this.setState({showShareList: false});
        }, false);
    }
    initPage(location) {
        let p = getQuery(location);
        if (p.art_id) {
            this.setState({art_id: p.art_id});
        }
        this.getNewsDetailContent(p.art_id);
    }
    componentDidUpdate() {
        this.textChange();
    }
    getNewsDetailContent(art_id) {
        this
            .props
            .getNewsDetail({art_id: art_id})
            .then(res => {
                if (res.code === 4000) {
                    let enableBool = false;
                    let isJumpBoll = false;
                    if (res.data.article_user && res.data.article_user.user_id) {
                        enableBool = true;
                    } else {
                        enableBool = false;
                    }
                    if (res.data.url) {
                        isJumpBoll = true; // 外部链接
                    } else {
                        isJumpBoll = false;
                    }
                    if(res && res.data && res.data.title){
                        console.log(res.data.title)
                        document.getElementsByTagName("title")[0].text = res.data.title;
                    }
                    this.setState({art_id: res.data.id, newsType: res.data.type, enable: enableBool, isJump: isJumpBoll});
                }
                //img点击放大
                this.newsDetailImgClickFoo();

                return res;
            })
            .then(res => {
                this.getNewsComment();
                if (res.data.type == 3) {
                    //this.videoPlay(res.data.url, res.data.video, res.data.img);
                }
            });
    }
    newsDetailImgClickFoo() {
        const that = this;
        // ============ 简单的事件委托
        function delegateEvent(interfaceEle, selector, type, fn) {
            if (interfaceEle.addEventListener) {
                interfaceEle.addEventListener(type, eventfn);
            } else {
                interfaceEle.attachEvent("on" + type, eventfn);
            }

            function eventfn(e) {
                var e = e || window.event;
                var target = e.target || e.srcElement;
                //如果目标元素与选择器匹配则执行函数
                if (matchSelector(target, selector)) {
                    if (fn) {
                        //将fn内部的this指向target（在此之前this都是指向的绑定事件的元素即interfaceEle）
                        fn.call(target, e);
                    }
                }
            }
        }
        /**
		 * only support #id, tagName, .className
		 * and it's simple single, no combination
		 */
        //比较函数：判断事件的作用目标是否与选择器匹配；匹配则返回true
        function matchSelector(ele, selector) {
            // 如果选择器为ID
            if (selector.charAt(0) === "#") {
                return ele.id === selector.slice(1);
            }
            // charAt(0),返回索引为0的字符 slice(a，b),从已有的数组或字符串返回从索引从a处开始，截取到索引b之前的子数组或子字符串；
            // 如果选择器为Class
            if (selector.charAt(0) === ".") {
                return ((" " + ele.className + " ").indexOf(" " + selector.slice(1) + " ") != -1);
            }
            // 如果选择器为tagName
            return ele
                .tagName
                .toLowerCase() === selector.toLowerCase();
        }

        let imgContainerDom = document.getElementById("newsDetailsContentId");
        delegateEvent(imgContainerDom, "img", "click", function (e) {
            let imgDom = e.target;
            that.setState({previewImgSrc: imgDom.src});
            if (window.CImgPreviewWinThis) {
                window
                    .CImgPreviewWinThis
                    .setState({imgHide: false});
            }
        });
    }
    getNewsCollect(art_id) {
        let trunapp = window.CtrunappAdvHide;
        if (trunapp && IsTouchDevice) {
            trunapp.setState({advHide: false});
            return;
        }
        this
            .props
            .getNewsDetailCollect({
                art_id: art_id,
                enable: !this.state.enable
            })
            .then(res => {
                if (res.code === 4000) {
                    this.setState({
                        enable: !this.state.enable
                    });
                }
            });
    }
    getNewsComment() {
        this
            .props
            .getNewsDetailCommentL({art_id: this.state.art_id})
            .then(res => {
                if (res.code === 4000) {
                    // console.log(res);
                }
            });
    }
    showApp() {
        let trunapp = window.CtrunappAdvHide;
        if (trunapp && IsTouchDevice) {
            trunapp.setState({advHide: false});
        }
    }
    inFocus() {
        this.setState({isShowImg: false});
    }
    outFocus() {
        this.setState({isShowImg: true});
    }
    textChange() {
        return;
        let obj = document.getElementById("textareaId");
        if (obj.value.length > 300) 
            obj.value = obj.value.slice(0, 300);
        if (true) {
            obj.style.height = 0 + "px";
            obj.style.height = obj.clientHeight + obj.scrollHeight - obj.clientHeight + "px";
        }
    }
    textEmpty() {
        let obj = document.getElementById("textareaId");
        obj.value = "";
        this.textChange();
    }
    textSubmit() {
        let obj = document.getElementById("textareaId");
        this
            .props
            .getNewsDetailComment({art_id: this.state.art_id, content: obj.value})
            .then(res => {
                if (res.code === 4000) {
                    obj.value = "";
                    this.getNewsComment();
                }
            });
    }
    videoPlay(url, video, img) {
        if (url) {
            // 跳转
            let indNum = url.indexOf("http");
            if (indNum > 0) {
                url = url.substring(indNum);
            }
            window.open(url, "_blank");
        } else {
            // 不跳转
            this.creatVideo(video, img);
            // this.setState({ 	showVideoType: false });
        }
    }
    toggleShareList(e) {
        e.stopPropagation();
        e
            .nativeEvent
            .stopImmediatePropagation();
        let trunapp = window.CtrunappAdvHide;
        if (trunapp && IsTouchDevice) {
            trunapp.setState({advHide: false});
            return;
        }

        this.setState({
            showShareList: !this.state.showShareList
        });
    }
    creatVideo(video, img) {
        console.log(video);
        let script = document.createElement("script");
        script.src = "//g.alicdn.com/de/prismplayer/2.5.0/aliplayer-min.js";
        script.type = "text/javascript";
        let link = document.createElement("link");
        link.href = "//g.alicdn.com/de/prismplayer/2.5.0/skins/default/aliplayer-min.css";
        link.rel = "stylesheet";
        document
            .getElementsByTagName("head")[0]
            .appendChild(link);
        document
            .getElementsByTagName("head")[0]
            .appendChild(script);
        script.onload = function () {
            var player = new Aliplayer({
                id: "J_prismPlayer", width: "100%", autoplay: true, cover: img,
                //支持播放地址播放,此播放优先级最高
                source: video
            }, function (player) {
                console.log("播放器创建好了。");
                // console.log(player.play());
            });
        };
    }
    showThisPageTocode() {
        this.setState({isShowQcode: true, QcodeUrl: window.location.href});
    }
    closeQcode() {
        this.setState({isShowQcode: false, QcodeUrl: window.location.href});
    }
    openTele() {
        window.open("https://t.me/inwecrypto");
    }
    showApp() {
        let trunapp = window.CtrunappAdvHide;
        if (trunapp && IsTouchDevice) {
            trunapp.setState({advHide: false});
        }
    }
    closePop(e) {
		this.setState({
			downloadHide: true
		});
	}

	downloadApp() {

		if (isAndroidOrIos() == "android") {
			window.location.href = getDownloadSit();
		} else if (isAndroidOrIos() == "ios") {
            console.log(312)
            window.location.href = "/downios"
		}
	}
    render() {
        const {
            minH,
            enable,
            showShareList,
            share,
            QcodeUrl,
            isShowQcode,
            previewImgSrc,
            showVideoType,
            downloadHide
        } = this.state;
        const {
            lng,
            changeLng,
            sendEmailCode,
            registerUser,
            loginIn,
            userInfo,
            setReduxUserInfo,
            forgetUser,
            newsDetail,
            newsDetailCommentL,
            commonMarket,
            getHeaderMarket
        } = this.props;
        return (
            <I18n>
                {(t, {i18n}) => (
                    <div className="container">
                        {!IsTouchDevice && (<FixedMenu changeLng={changeLng} lng={lng}/>)}
                        <div style={{display: "none"}}>
                            <Header
                                userInfo={userInfo}
                                registerUser={registerUser}
                                sendEmail={sendEmailCode}
                                loginIn={loginIn}
                                setReduxUserInfo={setReduxUserInfo}
                                forgetUser={forgetUser}
                                lng={lng}
                                commonMarket={commonMarket}
                                getHeaderMarket={getHeaderMarket}/>
                        </div>
                        {
                            !downloadHide && IsTouchDevice && (
                                <div className="downloadBox newsDetail">
                                    <div className="logoicon">
                                        <img src={logoapp} alt=""/>
                                    </div>
                                    <div className="textBox" >
                                        <span className="text1">InWeCrpyto</span>
                                        <span className="text2">{t("index.downloadMess", lng)}</span>
                                    </div>
                                    <div className="downloadBtn" onClick={this.downloadApp.bind(this)}>
                                        {t("index.downloadBtnMess", lng)}
                                    </div>
                                    {/* <div className="closeNtb" onClick={this.closePop.bind(this)}>
                                        <img src={fclose_icon} alt=""/>
                                    </div> */}
                                </div>
                            )
                        }
                       
                        <div id="mainBox" className="newsDetail ui">
                            <div
                                id="newsDetailLeft"
                                className={newsDetail.article_prev
                                ? "newsDetailLeft ui center show m-hide"
                                : "newsDetailLeft ui center m-hide"}>
                                {newsDetail.article_prev && (
                                    <Link
                                        to={{
                                        pathname: "newsdetail",
                                        search: "?art_id=" + newsDetail.article_prev.id
                                    }}>
                                        <span/>
                                    </Link>
                                )}
                                {!newsDetail.article_prev && <span/>}
                            </div>

                            <div className="newsDetailCon f1" id="newsDetailConBox">
                                <div className="newsDetailConTitle">
                                    <span>{newsDetail.title}</span>
                                </div>
                                <div className="newsMeta ui">
                                    <div className="newsDetailConMeta f1">
                                        <span className="metaDate">
                                            {newsDetail.created_at && getLocalTime(newsDetail.created_at)}
                                        </span>
                                        {newsDetail.is_sole && (
                                            <span className="metaCategory">
                                                {t("icon.original", lng)}
                                            </span>
                                        )}
                                        {newsDetail && newsDetail.article_category_cc && newsDetail.article_category_cc.length > 0 && newsDetail
                                            .article_category_cc
                                            .map((item, index) => {
                                                return (
                                                    <Link
                                                        key={index}
                                                        to={{
                                                        pathname: "/projectdetail/" + item.category.id
                                                    }}>
                                                        <img src={item.category.img} alt={item.category.name}/>
                                                    </Link>
                                                );
                                            })}
                                    </div>
                                    <div
                                        className="newDetailConShare"
                                        onClick={this
                                        .showApp
                                        .bind(this)}>
                                        <span className="rt noEvent">
                                            <b
                                                className={showShareList
                                                ? "wxShare cur"
                                                : "wxShare"}
                                                onClick={e => {
                                                this.toggleShareList(e);
                                            }}/>
                                        </span>
                                        <span className="rt noEvent">
                                            <b
                                                className={enable
                                                ? "collect active"
                                                : "collect"}
                                                onClick={() => {
                                                this.getNewsCollect(newsDetail.id);
                                            }}/>
                                        </span>
                                        {showShareList && (
                                            <ul className="shareList ui center">
                                                <li
                                                    onClick={this
                                                    .showThisPageTocode
                                                    .bind(this)}
                                                    className="wx"/> {/* <li className="pyq" /> */}
                                                <li
                                                    onClick={this
                                                    .openTele
                                                    .bind(this)}
                                                    className="tele"/>
                                                <li
                                                    onClick={this
                                                    .showThisPageTocode
                                                    .bind(this)}
                                                    className="qq"/>
                                            </ul>
                                        )}
                                    </div>
                                </div>
                                <div className="newsDetailBox">
                                    {/* 视频 */}
                                    {!this.state.isJump && (<div className="prism-player" id="J_prismPlayer"/>)}
                                    {(this.state.newsType == 3 || this.state.newsType == 6) && this.state.showVideoType && (
                                        <div
                                            className="videoType"
                                            onClick={() => {
                                            if (this.state.newsType == 6) {
                                                window.location.href = newsDetail.url;
                                            }
                                        }}>
                                            <img src={newsDetail.img} alt=""/> {this.state.newsType == 3 && (<b
                                                id="videoPlay"
                                                onClick={() => {
                                                this.videoPlay(newsDetail.url, newsDetail.video);
                                            }}/>)}
                                        </div>
                                    )}
                                    {(this.state.newsType == 3 || this.state.newsType == 6) && (<div
                                        dangerouslySetInnerHTML={{
                                        __html: newsDetail.desc
                                    }}/>)}

                                    <div id="newsDetailsContentId" className="newsDetailContent">
                                        {/* {this.state.newsType == 2 && (
											<img
												src="http://img4.imgtn.bdimg.com/it/u=4004954884,1272926999&fm=214&gp=0.jpg"
												alt=""
											/>
										)} */}
                                        <div
                                            dangerouslySetInnerHTML={{
                                            __html: newsDetail.content
                                        }}/>
                                    </div>
                                    <p className="newsReadNums">
                                        {newsDetail.click_rate}
                                        {"  "}
                                        {t("newsDetail.read", lng)}
                                    </p>
                                </div>
                                {false && (
                                    <div className="newsDetailComment">
                                        <div className="newsDetailCommentNums">
                                            <b>{newsDetail.comment_count}</b>
                                            {"  "}
                                            {t("newsDetail.comment", lng)}
                                        </div>
                                        <div
                                            className="newsDetailCommmentBox"
                                            onClick={this
                                            .showApp
                                            .bind(this)}>
                                            <div className="newsDetailCommentBoxCenter ui center noEvent">
                                                {this.state.isShowImg && !IsTouchDevice && (
                                                    <div className="newsDetailHeadImg">
                                                        <img src={userInfo && userInfo.img} alt=""/>
                                                    </div>
                                                )}
                                                <textarea
                                                    name=""
                                                    id="textareaId"
                                                    placeholder={t("newsDetail.talk", lng)}
                                                    onFocus={() => {
                                                    this.inFocus();
                                                }}
                                                    onBlur={() => {
                                                    this.outFocus();
                                                }}
                                                    onChange={() => {
                                                    this.textChange();
                                                }}/>
                                            </div>
                                            <div className="newsDetailCommentBoxBtn clearfix m-hide">
                                                <span
                                                    className="submit"
                                                    onClick={() => {
                                                    this.textSubmit();
                                                }}>
                                                    {t("newsDetail.sub", lng)}
                                                </span>
                                                <span
                                                    className="cancel"
                                                    onClick={() => {
                                                    this.textEmpty();
                                                }}>
                                                    {t("newsDetail.cancel", lng)}
                                                </span>
                                            </div>
                                        </div>
                                        <ul className="newsDetailCommentList">
                                            {newsDetailCommentL && newsDetailCommentL.data && newsDetailCommentL.data.length > 0 && newsDetailCommentL
                                                .data
                                                .map((item, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <div className="newsDetailCommentListHead ui center">
                                                                <div className="newsDetailHeadImg">
                                                                    <img src={item.user && item.user.img} alt=""/>
                                                                </div>
                                                                <div className="newsDetailHeadInfo">
                                                                    <span className="newsDetailHeadName">
                                                                        {item.user && item.user.name}
                                                                    </span>
                                                                    <span className="newsDetailHeadDate">
                                                                        {getLocalTime(item.created_at)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="newsDetailCommentListContent">
                                                                <p>
                                                                    {item.content}
                                                                </p>
                                                            </div>
                                                        </li>
                                                    );
                                                })}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div
                                id="newsDetailRight"
                                className={newsDetail.article_next
                                ? "newsDetailRight show ui center m-hide"
                                : "newsDetailRight ui center m-hide"}>
                                {newsDetail.article_next && (
                                    <Link
                                        to={{
                                        pathname: "newsdetail",
                                        search: "?art_id=" + newsDetail.article_next.id
                                    }}>
                                        <span/>
                                    </Link>
                                )}
                                {!newsDetail.article_next && <span/>}
                            </div>
                        </div>
                        {/* <Footer lng={lng} changeLng={changeLng} /> */}
                        {isShowQcode && (<QcodeBox
                            close={this
                            .closeQcode
                            .bind(this)}
                            url={QcodeUrl}/>)}
                        {/* {IsTouchDevice && <TurnApp/>} */}
                        <ImgPreview imgsrc={previewImgSrc}/>
                    </div>
                )}
            </I18n>
        );
    }
}
