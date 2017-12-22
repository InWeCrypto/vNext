import React, { Component } from "react";
import closeBtn from "../../../../lib/images/close_48.png";
import "./index.less";
class MustRead extends Component {
	constructor(props) {
		super(props);
	}
	close() {
		this.props.closeMethod();
	}
	contentClick(e) {}
	render() {
		const { content } = this.props;
		console.log(content);
		return (
			<div className="mustread-box">
				<div className="mustread-bg" />
				<div className="mustread-cont" onClick={this.close.bind(this)}>
					<div
						className="mustread-container"
						onClick={e => {
							e.stopPropagation();
							this.contentClick.bind(this);
						}}
					>
						<span
							className="close_btn"
							onClick={this.close.bind(this)}
						>
							<img src={closeBtn} />
						</span>
						<div>
							<div className="mustread-title">
								{content &&
									content.length > 0 &&
									content[0].name}
							</div>
							<div>
								{content &&
									content.length > 0 &&
									content[0].desc}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MustRead;
