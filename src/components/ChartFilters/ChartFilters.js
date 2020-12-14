import React, {Component} from 'react';
import classNames from 'classnames';
import {clamp} from '../../utils/index';
import styles from './ChartFilters.css';

let yAxisLabelWidth = 55;
let handleWidth = 9;

const getStyleValue = (el, prop) => parseInt(getComputedStyle(el)[prop], 10);
const rightFilterWidth = (width) => ({ width: `${width}px` });

class ChartFilters extends Component {
  constructor(props) {
    super();
    this.state = {  
      leftFilter: 0,
      rightFilter: 0,
      dragStartX: 0,
      isDragging: false,
      activeHandle: null,
      containerWidth: 0,
      segments: props.segments,
      segmentWidth: 0
    };
    this.setFilters = props.setFilters;
  }

  componentDidMount() {
    this.setState({ 
      containerWidth: getStyleValue(this.container, 'width'),
      segmentWidth: getStyleValue(this.container, 'width') / this.state.segments
    });
  }

  componentWillReceiveProps(newProps) {
    if (this.props.customerId !== newProps.customerId) {
      // reset handles if new customer is loaded
      this.setState({
        leftFilter: 0,
        rightFilter: 0
      });  
    }
    this.setState({
      segments: newProps.segments,
      segmentWidth: getStyleValue(this.container, 'width') / newProps.segments
    });
  }

  setDragStart = (e) => {
    e.persist();
    this.setState({
      isDragging: true,
      activeHandle: e.target.className.indexOf('right') >= 0 ? 'rightHandle' : 'leftHandle',
      dragStartX: e.pageX,
      dragStartLeft: getStyleValue(e.target, 'left')
    });

    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('mouseup', this.setDragEnd);
  }

  onDrag = (e) => {
    if (!this.state.isDragging) return false;
    let diff = this.state.dragStartX - e.pageX;
    const limits = clamp(yAxisLabelWidth, this.state.containerWidth - handleWidth);
    this[this.state.activeHandle].style.left = `${ limits(this.state.dragStartLeft - diff) }px`;
  }

  setDragEnd = (e) => {
    this.setState({ isDragging: false });

    let leftFilter = getStyleValue(this.leftHandle, 'left') - yAxisLabelWidth;
    let rightFilter = this.state.containerWidth - getStyleValue(this.rightHandle, 'left') - handleWidth;

    let minFilterIndex = Math.abs(leftFilter / this.state.segmentWidth);
    let maxFilterIndex = Math.ceil(rightFilter / this.state.segmentWidth);

    if (this.state.activeHandle === 'leftHandle') {
      // leftFilter = leftFilter + 100 < rightFilter ? leftFilter : rightFilter - 100;
      this.setState({ leftFilter });
    } else {
      // rightFilter = rightFilter - 100 > leftFilter ? rightFilter : leftFilter + 100;
      this.setState({ rightFilter });
    }

    let filterSettings = {
      min: minFilterIndex,
      max: this.state.segments - maxFilterIndex - 1
    };

    this.setFilters(filterSettings);
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.setDragEnd);
  }


  render() {
    return (
      <div className={styles.container} ref={(c) => { this.container = c; }}>
        <div className={classNames(styles.handleArea, styles.left)} style={{width: `${this.state.leftFilter}px`}}></div>
        <div className={classNames(styles.handleArea, styles.right)} style={rightFilterWidth(this.state.rightFilter)}></div>

        {this.props.children}

        <div 
          className={classNames(styles.handle, styles.left,"fleft" )}
          style={{left: `${this.state.leftFilter + yAxisLabelWidth}px`}} 
          onMouseDown={this.setDragStart}
          ref={(c) => {this.leftHandle = c;}}
        ><div className="handleBottom"></div></div>
        <div 
          className={classNames(styles.handle, styles.right,"fleft")}
          style={{left: `calc(100% - ${this.state.rightFilter + handleWidth}px)`}}
          onMouseDown={this.setDragStart}
          ref={(c) => {this.rightHandle = c;}}
        ><div className={styles.handleBottom}></div></div>
      </div>
    );
  }
}

ChartFilters.defaultProps = {
  children: ''
}

ChartFilters.propTypes = {
  children : React.PropTypes.node,
  formButton: React.PropTypes.bool,
  text: React.PropTypes.string,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func
}


export default ChartFilters;