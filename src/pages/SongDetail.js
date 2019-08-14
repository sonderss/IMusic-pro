import React, { Component } from 'react'
import {getDetailMusic} from '../servers/getMusic'
import '../../node_modules/antd-mobile/dist/font_4q1fp5troyo/iconfont.css'
import { parse } from 'qs'
import { Icon } from 'antd-mobile';
import Link from "umi/Link"; 
import creatHistory from 'history/createHashHistory' 
const history = creatHistory();//返回上一页这段代码
export default class SongDerail extends Component {
      state ={
          list:[],
          imgUrl:'',
          desc:'',
          name:''
      }
    async componentDidMount(){
        const queryData = parse(this.props.location.search, {
            ignoreQueryPrefix: true, // 忽略掉?
        }); 
        await getDetailMusic(queryData.id).then(res=>{
             this.setState({
                list:res.data.playlist.tracks,
                imgUrl:res.data.playlist.coverImgUrl,
                desc:res.data.playlist.description,
                name:res.data.playlist.name
            })
        })
       
   // console.log(this.state.list)
    }
    toBack(){
        history.goBack();
    }
    render() {
        const {list,imgUrl,desc,name} = this.state
        return (
            <div style={{background:'skyblue',display:'flex',flexDirection:'column',height:'100%'}}>
                <div className='songHead' >
               
                    <Icon type='left' size='lg' color='#fff'
                    onClick={()=>this.toBack()}
                    />
                    <div className='imgRq'>
                         <img src={imgUrl} style={{width:'100%',height:'100%',padding:'15px'}}/>
                         <div style={{paddingLeft:'15px',width:'100%',color:'#fff'}}>{name}</div>
                    </div>
                    <i style={{width:'60%',overflow:'hidden',paddingLeft:'30px',paddingTop:'15px',color:'#fff',lineHeight:'17px'}}>{desc}</i>
                </div>
                <ul className='Songs'>
                    {list.map((item,index)=>{
                        return (<div key={index}>
                            <Link to={{pathname:'/playPage',search:`id=${item.id}`}} style={{color:'#000'}}>
                            <li style={{paddingLeft:'15px'}}>
                                <h2 style={{width:'10%'}}>
                                <img src={item.al.picUrl} style={{width:'100%',height:'100%'}}/>
                                </h2>
                                <span className='iconfont icon-bofang play' style={{paddingLeft:'10px'}}></span>
                               
                                <div style={{display:'flex',width:'80%',justifyContent:'space-between'}}>
                                    <h4 style={{paddingLeft:'20px'}}>{item.name}</h4>
                                    {/* <p >{item.al.name}</p> */}
                                    <h4 style={{paddingRight:'15px'}}>{item.ar[0].name}</h4>
                                </div>
                            </li>
                            </Link>
                        </div>)
                    })}
                        
                </ul>
            </div>
        )
    }
}
