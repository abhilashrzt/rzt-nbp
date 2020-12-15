import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './DropDownTreeList.css';
import classNames from 'classnames';


class DropDownList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: this.props.selectedOption
        }

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.selectedOption !== nextProps.selectedOption) {
            this.setState({selectedOption: nextProps.selectedOption});
        }
    }

    componentDidMount() {
        let {options} = this.props;
        let {selectedOption} = this.state;

        if(selectedOption && options) {
            options && options.forEach(seg => {
                seg.child_segment && seg.child_segment.forEach(childSeg => {
                    if(childSeg.id === selectedOption.id) this.setState({[seg.id] : true})
                })
            })
        }
    }

    onClickHandler(option) {
        this.props.setSelection(option);
        this.props.onClick(option);
    }

    render() {
        let {options} = this.props;
        let {selectedOption} = this.state;
        return (
            <ul styleName="nested-options-list">
                {options && options.map((option, index) => {

                        return (<li styleName="nested-options-list__item"
                                    key={`${option.name}${index}`}>
                            <div styleName="nested-options-list__item__header"
                                 className="clearfix"
                                 onClick={() => {
                                     this.onClickHandler(option)
                                 }}>
                                <button
                                    styleName={classNames('nested-options-list__item__header__button', this.state[`${option.id}`] ? 'active' : '')}
                                    className="fleft"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        this.setState({[`${option.id}`]: !this.state[`${option.id}`]})
                                    }}/>
                                <span
                                    styleName={classNames('nested-options-list__item__header__title', ((selectedOption.id && option.id) && option.id === selectedOption.id) ? 'active' : '')}
                                    className="text-overflow-ellipsis fleft" title={option.name}>{option.name}</span>
                            </div>
                            {this.state[`${option.id}`] && <ul styleName="nested-options-list__item__inner-list">
                                { option.child_segment && option.child_segment.map(
                                    (option, index) =>
                                        <li styleName={classNames('nested-options-list__item__inner-list__item', ((selectedOption.id && option.id) && option.id === selectedOption.id) ? 'active' : '')}
                                            className="text-overflow-ellipsis"
                                            key={`inner-list${index}`}
                                            title={option.name}
                                            onClick={() => {
                                                this.onClickHandler(option)
                                            }}>
                                            {option.name}
                                        </li>
                                )}
                            </ul>}
                        </li>)
                    }
                )}
            </ul>
        );
    }
}

class DropDownTreeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
            selectedOption: ''
        };

        this.setSelection = this.setSelection.bind(this);
        this.onclickListener = this.onclickListener.bind(this);
        this.getSelectedOption = this.getSelectedOption.bind(this);
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

    setSelection = (value) => {
        this.setState({
            selectedOption: value
        })
    };

    getSelectedOption() {
        let {options, selectedOptionId} = this.props;

        if (options && selectedOptionId) {

            let list = options.reduce((acc, {id, name, child_segment}) => {
                acc.push({id, name});
                if (child_segment) acc = acc.concat(child_segment);

                return acc;
            }, []);

            return list.find((item) => item.id == selectedOptionId);
        }
    }

    componentDidMount() {
        this.props.options[0] && this.setSelection(this.getSelectedOption());
        window.addEventListener('click', this.onclickListener);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.onclickListener);
    }

    render() {
        let {opened, selectedOption} = this.state;
        let {
            options,
            onClick,
            clickParams = options,
            wrapperClass,
            globalClass,
            sortable,
            toggleSort,
            headStyle,
            OptionsTitle
        } = this.props;

        this.getSelectedOption()
        return (
            <div styleName="wrapper"
                 className={`${globalClass && globalClass} ${wrapperClass && wrapperClass}`}>
                <div styleName={classNames('head', (sortable) ? 'sortable' : '')}
                     className={classNames("clearfix", headStyle)}>
                    <span styleName="head__title" className={"text-overflow-ellipsis fleft"}
                          onClick={ event => this.toggle(event) } title={selectedOption.name}>{ selectedOption && selectedOption.name }</span>
                    { sortable && <span className={classNames('flaticon-sort', 'fleft')}
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
                    <DropDownList options={options}
                                  onClick={onClick}
                                  setSelection={this.setSelection}
                                  selectedOption={selectedOption}/>
                </div>}
            </div>
        )
    }
}
export default CSSModules(DropDownTreeList, styles, {allowMultiple: true});
