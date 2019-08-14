import React, { Component } from 'react'
import { parse } from 'qs'
import {getSongEr} from '../servers/getMusic'
import Link from "umi/Link"; 
import { Icon } from 'antd-mobile';
import creatHistory from 'history/createHashHistory'  //返回上一页这段代码
const history = creatHistory();//返回上一页这段代码
class songEr extends Component {
    constructor(props){
        super(props)
       this.state ={
        list:[],
        name:'',
        img1v1Url:'',
        briefDesc:'',//描述
        alName:''//z专辑名
       }
          
       
    }
    
    componentDidMount(){
        const queryData = parse(this.props.location.search, {
            ignoreQueryPrefix: true, // 忽略掉?
        }); 
        getSongEr(queryData.id).then(res=>{
            console.log(res.data)
            this.setState({
                name:res.data.artist.name,
                img1v1Url : res.data.artist.img1v1Url,
                briefDesc:res.data.artist.briefDesc,
                list:res.data.hotSongs,
               
            })
            console.log(this.state.name)
        })
    }
    toBack(){
        history.goBack();
    }
    render() {
        const {name,img1v1Url,briefDesc,list} = this.state
      
        return (
            <div style={{display:'flex',flexDirection:'column',height:'100%'}}>
                 {/* <span style={{position:'absolute',paddingTop:'15px',fontSize:'18px'}}>123</span> */}
                 <Icon type='left' style={{position:'absolute',paddingTop:'15px'}} 
                 onClick={()=>this.toBack()}
                 size='md'/>
                <div className='songEr'>
                    <h2 style={{width:'40%'}}>
                        <img src={img1v1Url} style={{padding:'15px'}}/>
                    </h2>
                    <p style={{width:'50%'}}>{briefDesc}</p>
                </div>
                <div className='sotitle'>
                    <h3>热门金曲50</h3>
                    <h3 style={{paddingRight:'215px'}}>歌曲</h3>
                    <h3 style={{paddingRight:'15px'}}>专辑</h3>
                </div>
                <div className='top50'>
                    {list.map((item,index)=>{
                        return (
                            <div key={index} >
                                <Link to={{pathname:'/playPage',search:`id=${item.id}`}} style={{color:'#000',fongSize:'18px'}}>
                                <ul>
                                    <li>
                                        <div style={{width:'20%',display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:'20px'}}>
                                        <span>{index+1}</span>
                                        <span className='iconfont icon-bofang  one'></span>
                                        </div>
                                        <div style={{width:'80%',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                        <span className='one'>{item.name}</span>
                                        <span className='one'>{item.al.name}</span>
                                        </div>
                                    </li>
                                </ul>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default songEr