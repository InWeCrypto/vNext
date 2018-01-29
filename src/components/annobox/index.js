import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { getLocalTime } from "../../utils/util";
import "./index.less";
class AnnoBox extends PureComponent {
	constructor() {
		super();
	}
	closeClick() {
		this.props.close();
	}
	render() {
		const { item, lng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="acc-detail">
						<div className="acc-content">
							<div className="acc-container">
								<i
									className="icon-close"
									onClick={this.closeClick.bind(this)}
								/>
								<div className="acc-title">
									{item.source_name}
								</div>
								<div className="acc-time">
									{getLocalTime(item.created_at)}
								</div>
								<div
									className="acc-text"
									dangerouslySetInnerHTML={{
										__html: item.content
									}}
								/>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default AnnoBox;
