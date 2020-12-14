import * as React from 'react';
import CSSModules from 'react-css-modules';
import styles from './DownloadCustomers.css';
import classNames from 'classnames';

const compareTwoStrings = (a = "", b = "") => a.toLowerCase().includes(b.toLowerCase());

@CSSModules(styles, {allowMultiple: true})
export default class DownloadSegmentsPopup extends React.Component {
    static defaultProps = {
        segments: [],
        deciles: Array(10).fill(1).map((item, index) => ({id: item + index, name: "Decile" + (item + index)}))
    }

    constructor(props, context) {
        super(props, context)
        this.state = {
            searchText: '',
            selectedSegmentId: null,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        document.body.addEventListener('click', this.handleClick);
    }

    componentWillUnmount() {
        // remember to remove all events to avoid memory leaks
        document.body.removeEventListener('click', this.handleClick);
    }

    handleClick() {
        const {close} = this.props; // get click outside callback
        const {target} = event; // get direct click event target
        if (target !== this.wrapper && !this.wrapper.contains(target)) {
            close && close()
        }
    }

    searchFocus() {
        this.inputField.focus();
    }

    render() {
        let {segments, deciles, close, dataset_id} = this.props;
        return <div styleName="DownloadCustomersPopup"
                    ref={node => {
                        this.wrapper = node;
                    }}
                    onClick={(event) => {
                        event.stopPropagation();
                        console.log(event);
                    }}>
            <div styleName="searchContainer">
                <span className={classNames('flaticon-search', 'fleft')} styleName="searchIcon"
                      onClick={() => this.searchFocus()}/>
                <input styleName="search"
                       className="fleft"
                       ref={(input) => this.inputField = input} type="text"
                       placeholder="Select segment"
                       onChange={() => {
                           this.setState({ selectedSegmentId: null, searchText: this.inputField.value});
                       }}/>
                <span className={ classNames(this.state.searchText ? '' : 'hide', 'flaticon-close')}
                      styleName="closeIcon" onClick={() => {
                    this.inputField.value = '';
                    this.setState({searchText: ''})
                }}/>
            </div>

            <div styleName={`ListsContainer ${this.state.selectedSegmentId != null ? 'biView' : ''}`} >
                <ul styleName="segmentList">
                    {/*<li styleName="segmentListItem" className={styles.active}>Segment1</li>*/}
                    {segments && segments
                        .filter(({name}) => !this.state.searchText || compareTwoStrings(name, this.state.searchText))
                        .map(({id, name}) => (
                            <li key={id}
                                styleName="segmentListItem"
                                className={classNames({[styles.active]: this.state.selectedSegmentId == id}, 'text-overflow-ellipsis')}
                                onClick={() => this.setState({selectedSegmentId: id})}
                                title={name}
                            >{name}</li>
                        ))}
                    <li key={'default-all'}
                        styleName="segmentListItem"
                        className={classNames({[styles.active]: this.state.selectedSegmentId == 0}, 'text-overflow-ellipsis',{['hide']:this.state.searchText && !compareTwoStrings('all', this.state.searchText)})}
                        onClick={() => this.setState({selectedSegmentId: 0})}
                    > ALL
                    </li>
                </ul>
                {this.state.selectedSegmentId != null && <ul styleName="decileList">
                    {deciles.map(({id, name}) => (
                        <li className="text-overflow-ellipsis"
                            key={id}
                            styleName="decileListItem"
                            title={name}
                            onClick={() => {
                                window.open(`${location.origin}/rest/datasets/${dataset_id}/download?segmentId=${this.state.selectedSegmentId}&decileId=${id}`);
                                close && close();
                            }}>
                            <span styleName="decileListItemText" className="flaticon-download"> {name} </span>
                        </li>
                    ))}
                </ul>}
            </div>
        </div>

    }
}

