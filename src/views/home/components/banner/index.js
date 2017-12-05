import React, { Component } from "react";
import Slider from "react-slick";
import "./index.less";
class Banner extends Component {
	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			arrows: false
		};
		const { bannerList } = this.props;
		return (
			<div className="banner-box">
				<Slider {...settings}>
					{bannerList &&
						bannerList.length > 0 &&
						bannerList.map((item, index) => {
							return (
								<div key={index} className="banner-item">
									<div className="banner-img">
										<img src={item.img} />
									</div>
									<div className="banner-title">
										{item.title}
									</div>
									<div className="banner-desc">
										{item.desc}
									</div>
								</div>
							);
						})}
				</Slider>
			</div>
		);
	}
}
export default Banner;
