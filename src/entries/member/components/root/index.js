import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import Header from "../../../../components/header/";
import FixedMenu from "../../../../components/fixedmenu";
export default class Root extends PureComponent {
	componentDidMount() {}
	render() {
		const { lng, changeLng } = this.props;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="member-box">
						<Header lng={lng} />
						<FixedMenu lng={lng} changeLng={changeLng} />
						<div>2</div>
					</div>
				)}
			</I18n>
		);
	}
}
