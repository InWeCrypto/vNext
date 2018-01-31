import Swiper from "../../assets/js/swiper.min.js";
import "../../assets/less/swiper.min.css";

import { removeFixed2Body } from "../../utils/util.js";
import React, { PureComponent } from "react";
import "./index.less";

class ImgPreview extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			imgHide: true
		};
	}
	componentDidMount() {
		//window挂载点
		window.CImgPreviewWinThis = this;
		this.mySwiper = new Swiper(".imgCoverPreview", {
			observer: true,
			observeParents: true,
			zoom: true
		});
	}
	componentWillMount() {}

	closePop(e) {
		// console.log(e.currentTarget);
		// console.log(e.target);

		this.setState({
			imgHide: true
		});
	}
	render() {
		const { imgsrc } = this.props;
		const { imgHide } = this.state;
		return (
			<div className={imgHide ? "winCover" : "winCover show"}>
				<div className="closeBtn" onClick={this.closePop.bind(this)} />
				<div className="swiper-container imgCoverPreview Center">
					<div className="swiper-wrapper">
						<div className="swiper-slide">
							<div className="swiper-zoom-container">
								<img src={imgsrc} alt="" />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default ImgPreview;
