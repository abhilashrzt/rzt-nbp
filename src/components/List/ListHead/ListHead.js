import * as React from "react";
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
import styles from '../List.css';

class ListHead extends React.Component {

    render() {
        let {
            showDetails, onBack, type, showSearchBox, showNestedList, onListSearch, headers, searchHeaderTitle,
            hideSearch = false, hideBack = false, setParentState, secondaryHeader, onSecondaryInputChange,
            isListMinimized, toggleMinimizeList
        } = this.props;
        let headersL = [headers, secondaryHeader];

        return <div styleName="list-head" className="clearfix">

            {!hideSearch && !showNestedList && <span className="flaticon-search fleft sec-text"
                                                     styleName="search-ico"
                                                     onClick={() => {
                                                         setParentState({
                                                             showSearchBox: !showSearchBox,
                                                             listSearchKey: ""
                                                         });
                                                     }}/>}

            {!hideBack && showNestedList && <button
                className={`fleft sec-text ${(showDetails && type == 'splitview') ? 'flaticon-arrows ' : 'menu-icon'}`}
                styleName="back-ico"
                onClick={() => {
                    onBack && onBack();
                    setParentState({selectedValues: {}});
                    {/*onSecondaryInputChange({});*/}
                    setParentState({
                        innerListData: [],
                        showNestedList: false,
                        innerListDataType: '',
                        showSearchBox: false,
                        hideSearch: true
                    });
                }}/>}

            {!showSearchBox && !showNestedList && <div styleName="customerListHead">
                {headersL.map((header = [], index) => (<div
                    styleName="list__title"
                    key={index + header[0] + header[1]}
                    className={classNames({
                        'fleft': index == 0, 'fright': index == 1
                    })}>
                    <span styleName="list__title__sec" className="sec-text">{header[0]}</span>
                    <span styleName="list__title__main"
                          title={header[1]}>{header[1]}</span>
                </div>))}
            </div>}

            {!hideSearch && showNestedList && <div styleName="list__title" className="fleft">
                <span styleName="list__title__sec" className="sec-text">{headers[0]}</span>
                <span styleName="list__title__main"
                      title={searchHeaderTitle}>{searchHeaderTitle}</span>
            </div>}

            {!hideSearch && showSearchBox && !showNestedList && <div styleName="list__search-box">
                <input type="text" styleName="list__search-box__input" className="fleft"
                       onChange={(e) => onListSearch(e)}
                       placeholder="Search..."
                       autoFocus/>
                <button styleName="list__search-box__close-btn"
                        className="fleft"
                        onClick={() => {
                            setParentState({
                                showSearchBox: !showSearchBox,
                                listSearchKey: ""
                            })
                        }}>
                    <span styleName="list__search-box__close-btn__icon">+</span>
                </button>
            </div>}

            <div styleName="list__minimize-btn__wrapper">
                <button styleName="list__minimize-btn"
                        title="Minimize/Maximize"
                        onClick={() => {
                            toggleMinimizeList(!isListMinimized);
                        }}/>
            </div>

        </div>
    }

}
;

export default CSSModules(ListHead, styles, {allowMultiple: true});
