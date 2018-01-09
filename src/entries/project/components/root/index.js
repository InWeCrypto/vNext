import React, { PureComponent } from "react";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import "./index.less";

export default class Root extends PureComponent {
    componentDidMount() {
        this.props.getProjectList();
    }
    render() {
        return (
            <div className="container">
                <Header />
                <div className='project ui'>
                    <div style={{ width: 582, color: 'red' }}></div>
                    <div className='projectContent f1'>
                        <ul className='ui'>
                            <li>
                                <div className='projectLiTop ui center'>
                                    <div className='projectLiTopleft ui center'>
                                        <img src='' />
                                        <span>NEO</span>
                                        <b>(neo)</b>
                                    </div>
                                </div>
                            </li>
                            <li>1</li>
                            <li>1</li>
                            <li>1</li>
                            <li>1</li>
                            <li>1</li>
                            <li>1</li>
                            <li>1</li>
                        </ul>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
