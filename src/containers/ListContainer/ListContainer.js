import * as React from 'react';
import CSSModules from 'react-css-modules';
import styles from './ListContainer.css';
import classNames from 'classnames';
import DropDown from '../../components/DropDown/DropDown';

// export default class ListContainer extends React.Component {
//     render() {
//         let {listTitle,listData,list,filter} = this.props;
//         const List=list;
//         return (<div styleName="wrapper">
//             <div styleName="header">
//                 <span styleName="header__title">{listTitle}</span>
//                 { filter  &&  <DropDown
//                     options={['ALL', 'ON NET', 'OFF NET']}
//                     onClick={setFilter}
//                     clickParams={['all', 'onnet', 'offnet']}
//                     wrapperClass={ styles.filterDropdown }
//                     globalClass={"fright"}
//                     headStyle={"fright"}
//                 /> }
//             </div>
//             <List listData={listData}/>
//         </div>)
//     }
// }
class ListContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            filter : props.filter
        }
    }

    setFilter = ( filterValue ) => {
        this.setState({
            filter: filterValue
        });
    }

    filterList = () => (
        (!this.state.filter || this.state.filter == 'all') ? this.props.listData.values : this.props.listData.values.filter( item => item.type == this.state.filter )
    )

    componentDidMount(){
        if((this.props.listData.type || '').toUpperCase() == 'PROGRESS')
            this.setState({ filter : 'all' })
    }

    render() {
        let {listTitle,listData,list,filterList,options,clickParams,globalClass,getFieldColor} = this.props;
        const List = list;
        return (

            <div styleName="wrapper" className={classNames(globalClass)}>

                <div styleName="header">
                    <span styleName="header__title">{listTitle}</span>
                    { this.state.filter  &&  <DropDown
                        options={options}
                        onClick={this.setFilter}
                        clickParams={clickParams}
                        wrapperClass={ styles.filterDropdown }
                        globalClass={"fright"}
                        headStyle={"fright"}
                    /> }
                </div>
                {filterList ? <List listData={this.filterList()}/> :  <List listData={listData} getFieldColor={getFieldColor}/>}
            </div>
        )
    }
}

export default ListContainer;
