import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './DropDown.css';
import classNames from 'classnames';


const DropDownListComp = ({size, options, onClick, setSelectedText, selectedOption, displayValue, uKey}) => (
    <ul size={size} styleName="options__list">
        { options.map(
            (option, index) => {
                return <li
                    title={ option[displayValue] }
                    styleName={ classNames('options__list__item', (selectedOption && option[uKey] == selectedOption) ? 'active' : '') }
                    className="text-overflow-ellipsis"
                    onClick={ () => {
                        onClick(option);
                        setSelectedText(option)
                    } }
                    key={ index }>
                    { option[displayValue] }
                </li>
            }
        )
        }
    </ul>
);

const DropDownList = CSSModules(DropDownListComp, styles, {allowMultiple: true});


class DropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
            selectedText: ''
        };
        this.placeholder = '';
        // this.options = [];
        this.setSelection = this.setSelection.bind(this);
        this.onclickListener = this.onclickListener.bind(this);
    }

    toggle = (event) => {
        event.stopPropagation();
        this.setState({
            opened: !this.state.opened
        });
    }

    onclickListener(event) {
        if (this.state.opened)
            this.toggle(event);
    }

    setSelection = (text) => {
        this.setState({
            selectedText: text
        })
    };

    componentDidMount() {
        this.placeholder = this.props.placeholder;
        if (!this.props.selectedOption) {
            this.setSelection(this.props.options[0][this.props.displayValue]);
        }
        window.addEventListener('click', this.onclickListener);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.onclickListener);
    }

    render() {
        let {opened} = this.state;
        let {
            options, onClick, wrapperClass, globalClass, sortable, toggleSort, headStyle,
            OptionsTitle, placeholder, selectedOption, displayValue, uKey
        } = this.props;

        let displayText = selectedOption ? options.find(item => item[uKey] == selectedOption)[displayValue] : placeholder;
        return (
            <div styleName="wrapper"
                 className={`${globalClass && globalClass} ${wrapperClass && wrapperClass}`}>
                <div styleName={classNames('head', (sortable) ? 'sortable' : '')}
                     className={classNames("clearfix", headStyle)}>
                    <span styleName="head__title" className={"text-overflow-ellipsis fleft"}
                          onClick={ event => this.toggle(event) } title={displayText}>{ displayText }</span>
                    { sortable && selectedOption && <span className={classNames('flaticon-sort', 'fleft')}
                                                          styleName={'sort-ico'} title="Sort"
                                                          onClick={ (e) => {
                                                              e.stopPropagation();
                                                              toggleSort();
                                                          }}/> }
                </div>
                { opened && <div styleName="options">
                    <div styleName="options__header">
                        <span styleName="options__header__title">SELECT {OptionsTitle && OptionsTitle}</span>
                    </div>
                    <DropDownList size={3}
                                  options={options}
                                  onClick={onClick}
                                  uKey={uKey}
                                  setSelectedText={this.setSelection}
                                  selectedOption={selectedOption}
                                  displayValue={displayValue}/>
                </div>}
            </div>
        )
    }
}
export default CSSModules(DropDown, styles, {allowMultiple: true});