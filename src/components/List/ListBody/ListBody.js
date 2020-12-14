import * as React from "react";
import CSSModules from 'react-css-modules';
import styles from '../List.css';
import SegmentList from './SegmentList/SegmentList';
import CustomerPropertiesList from './CustomerPropertiesList/CustomerPropertiesList'


class ListBody extends React.Component {
    constructor(props, args) {
        super(props, args);
        this.state = {};
    }

    render() {
        let {
            showNestedList,
            setParentState,
            isHighlight,
            listData,
            accordian,
            updateValueColor,
            onSecondaryInputChange,
            filterList,
            innerListData,
            listColor,
            innerListDataType,
            handleRemoveListValue,
            handleAddNewListValue,
            addListErrorMsg,
            showAddListRow,
            onClickPrimary,
            displayProp,
            displayOrder,
            sortFn,
            selectedValues, primaryInfoDisplayProp
        } = this.props;

        return <div styleName="list__body">
            {!showNestedList ? (<SegmentList
                primaryInfoDisplayProp = {primaryInfoDisplayProp}
                listData={listData}
                filterList={filterList}
                isHighlight={isHighlight}
                displayOrder={displayOrder}
                setParentState={setParentState}
                accordian={accordian}
                sortFn = {sortFn}
                displayProp={displayProp}
                onClickPrimary={onClickPrimary}
                selectedValues={selectedValues}
            />)

                : (<CustomerPropertiesList
                updateValueColor={updateValueColor}
                onSecondaryInputChange={onSecondaryInputChange}
                innerListData={innerListData}
                handleAddNewListValue={handleAddNewListValue}
                setParentState={setParentState}
                addListErrorMsg={addListErrorMsg}
                listColor={listColor}
                innerListDataType={innerListDataType}
                handleRemoveListValue={handleRemoveListValue}
                showAddListRow={showAddListRow}
                selectedValues={selectedValues}/>)
            }
        </div>
    }
}

export default CSSModules(ListBody, styles, {allowMultiple: true});
