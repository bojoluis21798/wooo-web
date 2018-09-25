import React,{Component} from 'react';
import './matchingUI.css';
import {inject,observer} from 'mobx-react';
import logo from '../assets/left-arrow.png'
import recu from '../assets/rico.jpg';
import close from '../assets/close-button.png';
import heart from '../assets/heart-outline.png';
import {Link} from 'react-router-dom';
import Loading from '../Loading/Loading';
@inject('store')@observer
class Matching extends Component{

    constructor(){
        super();

        this.state = {isLoading:false};
    }
    componentDidMount(){
        this.setState({isLoading:true});
        setTimeout(() => {
          console.log("GOT IN");
          this.setState({isLoading:false});
        }, 5000);
    }
    render(){
        const store = this.props.store;

        if(this.state.isLoading){
            return <Loading/>;
        }

        // const list = store.arr.map(num=>{
        //     return <li>{num}</li>
        // });

        // //OR
        // console.log(store.users);
        // const list = store.arr.map((num,index)=>(
        //     <li key={index}>{num}</li>
        // ));
        // const anotherList = store.users.map((object,index)=>(
        //     <li>{object.firstName}</li>
        // ));
        return (
            <div className='container'>
                {/*<p className='white'>The total is:{this.props.store.sum}</p>
                <ul className='white'>
                    {list}
                </ul>
                <ul className='white'>
                    {anotherList}
                </ul>*/}
                <div className='backArea'>
                    <button className='buttonBack'><img className='iconStyle' src={logo}/></button>
                </div>
                <div className='picArea'>
                    <img className='imageStyle' width="100" height="50" src={recu} />
                </div>
                <div className='mainTextArea'>
                    <div className="textContainer">
                        <div className="biorow">
                            <div className='text1'>Rico Mesina, 16</div>
                            <div className='text2'>DOWNTOWN MANHATTAN, NEW YORK</div>
                        </div>
                        <div className="biorow">
                            <div className='text3'>My friends call me daddy.I can't figure out why. Do you mind helping me figure it out?</div>
                        </div>
                    </div>
                </div>
                <div className='buttonArea'>
                        <div className='item1'><Link to="/home"><button className="button button5"><img className='iconStyle' src={close}/></button></Link></div>
                        {/* <div class=item3></div> */}
                        <div className='item2'><button className="button button5"><img className='iconStyle' src={heart}/></button></div>
                </div>
            </div>
        );
    }

    //  changeSmth = ()=>{
    //     // this.props.store.add();
    //     this.props.store.fetchUsers();
    // }
}

export default Matching;
