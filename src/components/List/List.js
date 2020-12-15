import * as React from "react";
import ReactDOM from "react-dom";
import CSSModules from 'react-css-modules';
import Button from './../Button/Button';
import styles from './List.css';
import ListHead from './ListHead/ListHead';
import ListBody from './ListBody/ListBody';

class ListInfoHead extends React.Component {

    constructor() {
        super();
        this.state = {
            editMode: false
        }
        this.toggleEdit = this.toggleEdit.bind(this);
        // this.listKey = ['SELECTED SEGMENT'];
        // this.listValue = ['PRE-RETIREMENT','19,239','2'];
    }

    toggleEdit(e) {
        this.setState({
            editMode: !this.state.editMode
        });
    }

    handleKeyPress = (key, id) => {
        if (key === 'Enter') {
            this.props.changeSegmentName(id, this.titleInput.value);
            this.toggleEdit();
        } else if (key === 'Escape') {
            this.toggleEdit();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('click', () => {
            this.state.editMode && this.toggleEdit()
        })
    }

    componentDidMount() {
        window.addEventListener('click', () => {
            this.state.editMode && this.toggleEdit()
        })
    }

    render() {
        let {onBack, data, changeSegmentName, isListMinimized, toggleMinimizeList, infoHeadViewData} = this.props;
        let {editMode} = this.state;
        return (
            <div styleName={"list-info-head"} className="clearfix" onClick={ e => e.stopPropagation()}>
                <span className="flaticon-arrows fleft sec-text"
                      styleName="back-ico"
                      onClick={onBack}></span>
                <div styleName="list__title-wrapper" className="fleft clearfix">
                    { !editMode && <div styleName="list__title" className="fleft">
                        <span styleName="list__title__sec" className="sec-text">SELECTED SEGMENT</span>
                        <span styleName="list__title__main"
                              onClick={ (e) => {
                                  e.stopPropagation();
                                  this.toggleEdit()
                              } }
                              title={data.meta.segment_name.toUpperCase()}>
                          { data.meta.segment_name.toUpperCase() }</span>
                    </div> }
                    { editMode && <div styleName="list__title" className="fleft">
                        <span styleName="list__title__sec" className="sec-text">SEGMENT NAME</span>
                        <input type="text"
                               styleName="list__input"
                               ref={(node) => {
                                   this.titleInput = node
                               }}
                               defaultValue={ data.meta.segment_name }
                               onKeyUp={(e) => this.handleKeyPress(e.key, data.id)}
                               autoFocus/>
                    </div>}
                    {
                        infoHeadViewData && infoHeadViewData.map((val, index) => (
                                <div styleName="list__title sm-width" className="fleft"
                                     key={`infoHead${index}${val && val.value}`}>
                                    <span styleName="list__title__sec" className="sec-text">{val.label}</span>
                                    <span styleName="list__title__main">
                                        { val.value }</span>
                                </div>
                            )
                        )
                    }
                </div>


                <div styleName="list__minimize-btn__wrapper">
                    <button styleName="list__minimize-btn"
                            title="Minimize/Maximize"
                            onClick={() => {
                                toggleMinimizeList(!isListMinimized);
                            }}/>
                </div>
            </div>)
    }
}
;


class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listSearchKey: "",
            showSearchBox: false,
            showNestedList: !!this.props.showNestedList,
            innerListData: [],
            innerListDataType: '',
            searchHeaderTitle: '',
            showAddListRow: false,
            addListErrorMsg: false,
            selectedValues: this.props.selectedValues || {},
            isListMinimized: false
        }

        this.onListSearch = this.onListSearch.bind(this);
        this.handleAddNewListValue = this.handleAddNewListValue.bind(this);
        this.handleRemoveListValue = this.handleRemoveListValue.bind(this);
        this.setParentState = this.setParentState.bind(this);
        this.filterList = this.props.filter.bind(this);
        this.sortFn = (this.props.sortFn|| function(){ return 1; }).bind(this);
        this.toggleMinimizeList = this.toggleMinimizeList.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.showNestedList !== this.props.showNestedList) || this.props.defaultSelectedPropertyData !== nextProps.defaultSelectedPropertyData)
            this.setState({
                showNestedList: nextProps.showNestedList,
                innerListData: nextProps.defaultSelectedPropertyData.value,
                innerListDataType: nextProps.defaultSelectedPropertyData.type,
                searchHeaderTitle: nextProps.defaultSelectedPropertyData.label,
                selectedValues: nextProps.selectedPropertyValues
            })
        if (this.props.isListMinimized !== nextProps.isListMinimized) {
            this.toggleMinimizeList(nextProps.isListMinimized);
        }
    }

    toggleMinimizeList(state) {
        this.props.setParentState && this.props.setParentState({isListMinimized: state})
        this.setState({isListMinimized: state});
    }

    handleAddNewListValue(color, val1, val2 = undefined) {
        let newInnerListData = this.state.innerListData;
        if (this.state.innerListDataType === "string" || this.state.innerListDataType === "number") {
            this.props.onSecondaryListUpdateCallBack({
                value: val1,
                color: color
            });
            document.getElementById('newInnerListItem').value = '';
        } else {
            newInnerListData.push([val1, val2]);
            this.props.onSecondaryListUpdateCallBack({
                value: [val1, val2],
                color: color
            });
        }
        this.setState({innerListData: newInnerListData, showAddListRow: false, addListErrorMsg: false});
    }

    handleRemoveListValue(index) {
        let newInnerListData = this.state.innerListData;
        newInnerListData.splice(index, 1);
        this.setState({innerListData: newInnerListData});
    }

    onListSearch(e) {
        this.setState({listSearchKey: e.target.value})
    }

    setParentState = (state) => {
        this.setState(state);
    }

    render() {
        let {
            type, showDetails, onBack, propClass, editableTitle, accordian, listData, headers, onClickPrimary,
            listColor, onSecondaryInputChange, primaryDisplayProp, displayOrder, secondaryDisplayProp,
            secondaryHeader, hideSearch, hideBack, fullDetailButtonText, onFullDetailClick,
            infoHeadViewData, primaryInfoDisplayProp,
            updateValueColor, infoHeadData, changeSegmentName
        } = this.props;
        /*TODO: Hide search when switching from primary list to secondary list*/

        return (
            <div styleName={`${propClass} ${this.state.isListMinimized ? 'minimize' : ''}`}>
                { showDetails && type == 'splitview' && <ListInfoHead onBack={onBack}
                                                                      editableHead={true}
                                                                      data={infoHeadData}
                                                                      infoHeadViewData={infoHeadViewData}
                                                                      changeSegmentName={changeSegmentName}
                                                                      toggleMinimizeList={this.toggleMinimizeList}
                                                                      isListMinimized={this.state.isListMinimized}/> }

                { !(showDetails && type == 'splitview') &&
                <div styleName="list">
                    <ListHead showSearchBox={this.state.showSearchBox}
                              showNestedList={this.state.showNestedList}
                              headers={headers}
                              searchHeaderTitle={this.state.searchHeaderTitle}
                              innerListData={this.state.innerListData}
                              innerListDataType={this.state.innerListDataType}
                              onListSearch={this.onListSearch}
                              showDetails={showDetails}
                              type={type}
                              hideSearch={hideSearch}
                              hideBack={hideBack}
                              onBack={onBack}
                              secondaryHeader={secondaryHeader}
                              listSearchKey={this.state.listSearchKey}
                              setParentState={this.setParentState}
                              onSecondaryInputChange={onSecondaryInputChange}
                              toggleMinimizeList={this.toggleMinimizeList}
                              isListMinimized={this.state.isListMinimized}
                    />

                    <ListBody showNestedList={this.state.showNestedList}
                              setParentState={this.setParentState}
                              listData={listData}
                              accordian={accordian}
                              innerListData={this.state.innerListData}
                              listColor={listColor}
                              filterList={this.filterList}
                              sortFn={this.sortFn}
                              isHighlight={type == 'highlight'}
                              primaryInfoDisplayProp={primaryInfoDisplayProp}
                              displayProp={!this.state.showNestedList ? primaryDisplayProp : secondaryDisplayProp}
                              innerListDataType={this.state.innerListDataType}
                              handleRemoveListValue={this.handleRemoveListValue}
                              handleAddNewListValue={this.handleAddNewListValue}
                              addListErrorMsg={this.state.addListErrorMsg}
                              showAddListRow={this.state.showAddListRow}
                              onSecondaryInputChange={onSecondaryInputChange}
                              updateValueColor={updateValueColor}
                              displayOrder={displayOrder}
                              onClickPrimary={onClickPrimary}
                              selectedValues={this.state.selectedValues}
                    />
                    { type == 'detailview' && <Button className={{local: "primary arrow-button-icon", global: "fright m10"}}
                                                      onClick={onFullDetailClick}>
                        {fullDetailButtonText}
                        <span className="flaticon-arrows fright sec-text"
                              styleName="in-list-button">
                        </span>
                    </Button>}
                </div>
                }
            </div>)
    }
}
;

export default CSSModules(List, styles, {allowMultiple: true});
