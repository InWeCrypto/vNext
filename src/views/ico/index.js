import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../actions/";
import StackGrid from "react-stack-grid";
import "./index.less";
class Ico extends Component {
	constructor() {
		super();
		this.state = {
			itemW: 0
		};
	}
	componentDidMount() {
		document.title = "ICO评测";
		this.setW();
		window.onresize = () => {
			this.setW();
		};
		this.props.getIcoListAction();
	}
	setW() {
		if (!document) {
			return;
		}
		var w = document.body.clientWidth;
		if (w >= 1000) {
			this.setState({
				itemW: 980 / 3
			});
		} else if (w > 750 && w <= 1000) {
			this.setState({
				itemW: (w - 20) / 2
			});
		} else {
			this.setState({
				itemW: w
			});
		}
	}
	render() {
		const { icoList } = this.props;
		console.log(icoList);
		return (
			<div className="ico-box">
				<div className="ico-title">ICO评测</div>
				<div className="ico-content">
					<StackGrid
						style={{ width: "100%" }}
						gutterWidth={10}
						gutterHeight={10}
						columnWidth={this.state.itemW}
						monitorImagesLoaded={true}
					>
						{icoList &&
							icoList.length > 0 &&
							icoList.map((item, index) => {
								return (
									<Link
										to={{
											pathname: "/ico-detail",
											search: "?id=" + item.id
										}}
										key={index}
										className="ico-item"
									>
										<img
											src={item.img}
											className="ico-item-img"
										/>
										<div className="ico-item-title">
											{item.title}
										</div>
										<div className="ico-item-desc">
											{item.desc}
										</div>
										<div className="ico-item-info">
											<div className="ico-item-time">
												{item.created_at}
											</div>
											<div>{item.assess_status}</div>
										</div>
									</Link>
								);
							})}
					</StackGrid>
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		icoList: state.icoData.icoList
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getIcoListAction: actions.getIcoListAction(dispatch)
	};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Ico));
