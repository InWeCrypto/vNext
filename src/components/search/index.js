import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { StyleSheet, css } from "aphrodite";
import { puffIn } from "react-magic";
import { setLocalItem } from "../../utils/util";
import "./index.less";
class searchIn extends PureComponent {
	constructor() {
		super();
		this.state = {
			inputBg: false,
			inputVal: ""
		};
		this.styles = StyleSheet.create({
			magic: {
				animationName: puffIn,
				animationDuration: ".3s"
			}
		});
	}
	componentDidMount() {
		window.onkeydown = function(event) {
			event = event || window.event;
			if (event.keyCode == 13) {
				if (this.state.inputBg) {
					window.location.href = "/search?k=" + this.state.inputVal;
				}
			}
		}.bind(this);
	}
	render() {
		const { lng, closeSearch } = this.props;
		const { inputBg, inputVal } = this.state;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="search-box">
						<div className="search-content">
							<div className="search-bg" />
							<div className={css(this.styles.magic)}>
								<div className="search-inbox">
									<div className="search-in">
										<i
											className="icon-close"
											onClick={() => {
												closeSearch();
											}}
										/>
										<div className="search-in-content">
											<div
												className={
													inputBg
														? "searchInput ui center jcenter focus"
														: "searchInput ui center jcenter"
												}
											>
												<b />
												<input
													type="text"
													placeholder="Search you want to know"
													onChange={e => {
														this.setState({
															inputVal:
																e.target.value
														});
													}}
													onFocus={e => {
														this.setState({
															inputBg: true
														});
													}}
													onBlur={() => {
														this.setState({
															inputBg: false
														});
													}}
												/>
											</div>
											<div className="searchRecon">
												<span className="everySearch">
													Everyone in the search
												</span>
											</div>

											<ul className="searchReconUl">
												<li>
													<span>Neo</span>
												</li>
												<li>
													<span>Neo</span>
												</li>
												<li>
													<span>Neo</span>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default searchIn;
