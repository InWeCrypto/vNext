import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";

import {
	getMainMinHeight,
	getQuery,
	getLocalTime
} from "../../../../utils/util";

import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			
		};
	}
	componentWillReceiveProps(nextProps) {
		
	}
	componentDidMount() {
		
	}
	initPage(search) {
		
	}
	render() {
		const { minH, liH,} = this.state;
		const {
			lng,
			changeLng,
			
		} = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="container">
						
					</div>
				)}
			</I18n>
		);
	}
}
