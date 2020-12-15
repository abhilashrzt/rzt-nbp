import * as React from "react";
import CSSModules from 'react-css-modules';
import styles from '../../List.css';
import _ from 'underscore';

const propensity = {
    0: 'Low',
    1: 'High',
    undefined: '-',
    null: '-'
}

const SegmentListComponent = function ({
    filterList, listData = [], isHighlight = false,
    primaryInfoDisplayProp,
    sortFn,
    setParentState, accordian = false, onClickPrimary, displayProp, displayOrder
}) {
    let listItemData = Array.isArray(listData) && listData.filter(filterList);

    listItemData = listItemData.sort(sortFn);

    if (listItemData.length < 1) {
        return <span styleName="list__empty-msg"> No records found</span>;
    } else {
        return (

            <ul styleName="list__primary-list">

                {
                    listItemData.map((data, index) => {
                        let listTitle = _.get(data, displayProp);
                        let order = displayOrder || [displayProp];

                        return <li key={index + '' + data.id}
                                   onClick={() => {
                                       onClickPrimary(data);
                                       if (isHighlight) {
                                           setParentState({
                                               innerListData: data.value,
                                               searchHeaderTitle: data.name,
                                               showNestedList: true,
                                               innerListDataType: data.type
                                           });
                                       }
                                   }}>
                            <div styleName="list__item">
                                {accordian && <span className="arrow collapsed"/>}
                                <span styleName="list__item__primary__title"
                                      className="text-overflow-ellipsis fleft"
                                      title={_.get(data, order[0])}>
                                {_.get(data, order[0])}
                                </span>
                                <span className="text-overflow-ellipsis fright sec-text"
                                      styleName="list__item__secondary__title sec-text-sm"
                                      title={primaryInfoDisplayProp && `Propensity: ${_.get(data, primaryInfoDisplayProp, "-")}`}>
                                {primaryInfoDisplayProp && `Propensity: ${_.get(data, primaryInfoDisplayProp, "-")}`}
                                </span>
                                <span className="fright sec-text">{_.get(data, order[1])}</span>
                            </div>
                        </li>
                    })
                }
            </ul>);
    }
}

const SegmentList = CSSModules(SegmentListComponent, styles, {allowMultiple: true});

export default SegmentList;
