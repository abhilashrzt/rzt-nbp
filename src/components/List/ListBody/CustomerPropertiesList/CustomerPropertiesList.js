import * as React from "react";
import CSSModules from 'react-css-modules';
import styles from '../../List.css';
import * as d3 from 'd3'
const xScale = d3.scaleLinear().range([0, 54]);
let yScale = d3.scaleLinear().range([22, 0]);

class CustomerPropertiesList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            innerListData, handleAddNewListValue, setParentState, addListErrorMsg,
            listColor, innerListDataType, handleRemoveListValue, showAddListRow,
            updateValueColor, onSecondaryInputChange, selectedValues
        } = this.props;

        innerListDataType = (innerListDataType|| '').toLowerCase()

        return <ul styleName="list__primary-list">

            {
                innerListData.sort().map((data, index) => {
                    let selectedvalue = Object.keys(selectedValues).find((item)=>{
                        return (innerListDataType === 'sparklines' && item == data.name) || (innerListDataType === 'range' && item == data.join(' - ') || (item == data))
                    });

                    let  isChecked = !!selectedvalue;

                    let d =[];

                    let isSparkLines = innerListDataType === 'sparklines';


                    if (isSparkLines){
                        let coordinates = data.coordinates.map((d, i)=>({ x: i, y: d }))

                        xScale.domain(d3.extent(coordinates, ({ x }) => x));
                        yScale.domain([0, d3.max(coordinates, ({ y }) => y)])

                        d = coordinates.map(({x, y})=> [ xScale(x), yScale(y) ])
                    }


                    return <li key={index}>
                        <input type="checkbox"
                               checked={isChecked}
                               styleName="nested-list__item__checkbox"
                               onChange={()=> {
                                   let newSelectedValues = selectedValues;
                                   let max = innerListData.length;
                                   let name = innerListDataType === "range" ? `${data[0]} - ${data[1]}` : data;
                                   
                                   if (isSparkLines) name = data.name;

                                   let color = document.getElementById(`color${index}`).value;
                                   for (let i = 0; i < max; i++) {
                                       if (document.getElementById(index).checked) {
                                           selectedValues[name] = color;
                                           setParentState({selectedValues: newSelectedValues})
                                       } else {
                                           delete selectedValues[name];
                                           setParentState({selectedValues: newSelectedValues})
                                       }
                                   }
                                   onSecondaryInputChange(newSelectedValues);
                               }}
                               id={index}/>
                        <label styleName="list__item nested-list__item"
                               htmlFor={index} className="clearfix">
                            <span styleName="nested-list__item__checkbox-icon"/>
                            <label htmlFor={`color${index}`}
                                   styleName="nested-list__item__color-indicator"
                                   style={{backgroundColor: listColor[index] || '#999999'}}
                            />
                            <input type="color"
                                   styleName="nested-list__item__color-picker"
                                   id={`color${index}`}
                                   defaultValue={listColor[index] || '#999999'}
                                   onChange={()=> {
                                       document.getElementById(index).checked = true;
                                       let inputColor = document.getElementById(`color${index}`).value;
                                       document.getElementById(`color${index}`).value = inputColor;
                                       document.querySelector(`label[for="color${index}"]`).style.backgroundColor = inputColor;
                                       
                                       let name = innerListDataType === "range" ? `${data[0]} - ${data[1]}` : data;
                                       if (isSparkLines) name = data.name;

                                       updateValueColor({
                                           value: name,
                                           color: inputColor
                                       });
                                       let selectedValuesState = selectedValues;
                                       selectedValuesState[name] = inputColor;
                                   }}/>
                            {(innerListDataType === "string" || innerListDataType === "number") &&
                            <span>{data}</span>
                            }
                            {(innerListDataType === "range") &&
                            <span>{`${data[0]} - ${data[1]}`}</span>
                            }
                            {(isSparkLines) &&
                            <span>{`${data.name}`}</span>
                            }
                            {
                              (isSparkLines) &&
                                <svg styleName="nested-list__item__sparklines"> 
                                    <path d={d ? "M" + d.join("L") + "" : null}
                                          data={d}
                                          style={{
                                                transform: "scale(0.9) translate(3px, 0)",
                                                strokeDasharray: 0,
                                                strokeWidth: 2,
                                                fill: "rgba(243, 242, 242, 0.0666667)",
                                                stroke: "rgba(70, 64, 66, 0.69)"

                                            }}
                                      />
                                </svg>
                            }
                           {
                             <button styleName="nested-list__item__delete-icon"
                                    onClick={(e)=> {
                                        e.stopPropagation();
                                        handleRemoveListValue(index);
                                    }}>
                                <span styleName="nested-list__item__delete-icon__title">Delete</span>
                              </button>
                          }
                        </label>
                    </li>
                })
            }
            {showAddListRow &&
            <li className="clearfix">
                {innerListDataType === "string" &&
                <div styleName="nested-list__item__new-list__wrapper"
                     className="clearfix fleft">
                    <input type="text"
                           styleName="nested-list__item__new-list"
                           className="fleft"
                           id="newInnerListItem"/>
                    {addListErrorMsg && <span
                        styleName="nested-list__item__new-list__error-msg">{addListErrorMsg}</span>}
                </div>}

                {innerListDataType === "number" &&
                <div styleName="nested-list__item__new-list__wrapper"
                     className="clearfix fleft">
                    <input type="number"
                           styleName="nested-list__item__new-list"
                           className="fleft"
                           id="newInnerListItem"/>
                    {addListErrorMsg && <span
                        styleName="nested-list__item__new-list__error-msg">{addListErrorMsg}</span>}
                </div>}

                {innerListDataType === "range" &&
                <div styleName="nested-list__item__new-list__wrapper"
                     className="clearfix fleft">
                    <input type="number"
                           styleName="nested-list__item__new-list__number"
                           className="fleft"
                           id="newInnerListItemNum1"/>
                    <span styleName="nested-list__item__new-list__spacer"
                          className="fleft">-</span>
                    <input type="number"
                           styleName="nested-list__item__new-list__number"
                           className="fright margin-lr-0"
                           id="newInnerListItemNum2"/>
                    {addListErrorMsg && <span
                        styleName="nested-list__item__new-list__error-msg">{addListErrorMsg}</span>}
                </div>}

                <button styleName="nested-list__item__new-list-remove"
                        className="fright"
                        onClick={()=> {
                            setParentState({showAddListRow: false, addListErrorMsg: false});
                        }}>
                    <span styleName="nested-list__item__new-list-remove__tooltip">Delete</span>
                </button>

                <button styleName="nested-list__item__new-list-save"
                        className="fright"
                        onClick={()=> {
                            if (innerListDataType === "range") {
                                let listLabel1 = document.getElementById('newInnerListItemNum1').value;
                                let listLabel2 = document.getElementById('newInnerListItemNum2').value;
                                if (listLabel1 !== '' && listLabel2 !== '') {
                                    document.getElementById('newInnerListItemNum1').value = '';
                                    document.getElementById('newInnerListItemNum2').value = '';
                                    handleAddNewListValue(listColor[innerListData.length], listLabel1, listLabel2);
                                } else {
                                    setParentState({addListErrorMsg: "Value cannot be empty !!"});
                                    if (listLabel1 == '') {
                                        document.getElementById('newInnerListItemNum1').style.borderColor = "red";
                                    } else {
                                        document.getElementById('newInnerListItemNum2').style.borderColor = "red";
                                    }
                                }
                            } else {
                                let listLabel = document.getElementById('newInnerListItem').value;
                                if (listLabel !== '') {
                                    document.getElementById('newInnerListItem').value = '';
                                    handleAddNewListValue(listColor[innerListData.length], listLabel);
                                } else {
                                    setParentState({addListErrorMsg: "Value cannot be empty !!"});
                                    document.getElementById('newInnerListItem').style.borderColor = "red";
                                }
                            }
                        }}>
                    <span styleName="nested-list__item__new-list-save__tooltip">Add</span>
                </button>
            </li>
            }
            {innerListDataType === "range" && <li className="text-align-center">
                <button styleName="nested-list__item__add-button"
                        onClick={()=> {
                            setParentState({showAddListRow: true});
                        }}>
                    <span styleName="nested-list__item__add-button__icon"/>
                    <span styleName="nested-list__item__add-button__title">add new</span>
                </button>
            </li>}
        </ul>
    }
}

export default CSSModules(CustomerPropertiesList, styles, {allowMultiple: true});
