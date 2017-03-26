import React, {Component} from 'react';
import styles from './app.css';
import * as actions from '../action/actionCreator';
import {connect} from 'react-redux';

class QuestionImages extends Component {
    constructor(props) {
        super(props)
    }

    renderImages() {
        const {pageIndex} = this.props;
        const {imageIndex} = this.props;

        return (
            <div className={`col-lg-4 col-md-6 col-xs-12 + ${styles.questionImages}`}>
                <img width="300" src={this.props.image.image} onClick={this.props.clickImage.bind(this, pageIndex, imageIndex)}/>
            </div>
        )
    }

    render() {
        return (
            this.renderImages()
        )
    }
}

function mapStateToProps(state) {
    return {
        imageData: state.imageData
    }
}

export default connect(mapStateToProps, actions)(QuestionImages);