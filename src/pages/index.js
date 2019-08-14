import React, { Component } from 'react'
import {getIndexMusic } from '../servers/getMusic'
import router from 'umi/router'
import {getUserInfo} from '../servers/getMusic'
import { NavBar, Icon } from 'antd-mobile';
import  Carousel from '../components/Carousel'
import Gexing from '../components/Gexing'
import FmTitle from '../components/FmTitle'
import SongTui from '../components/SongTui'
import BuNav1 from '../components/BuNav1'
import { Drawer, List } from 'antd-mobile';
import Link from "umi/Link"; 
export class index extends Component {

    state = {
        open: false,
        info:{},
        touxiang:'',
        nickname:'',
        backgroundUrl:''
      }
      onOpenChange = (...args) => {
        //console.log(args);
        this.setState({ open: !this.state.open });
      }
    // componentDidMount(){
    //     // getIndexMusic().then(res=>console.log(res.data))
    //     // getDetailMusic(924680166).then(res=>console.log(res.data))
       
    //     getUserInfo(32953014).then(res=>{
            
    //        this.setState((a,b)=>({
    //            info:res.data
    //        }))

    //     })
    //     console.log(this.state.info)
    // }
    
        async componentDidMount(){
            const uid = localStorage.getItem('useId');
            if(uid){
                await getUserInfo(uid).then(res=>{
                    this.setState({
                       info:res.data,
                       touxiang:res.data.profile.avatarUrl,
                       nickname:res.data.profile.nickname,
                       backgroundUrl:res.data.profile.backgroundUrl
                   })
               
               })
            }else{
                router.push('/users')
            }
         
            // await getUserInfo(uid).then(res=>{
            //      this.setState({
            //         info:res.data,
            //         touxiang:res.data.profile.avatarUrl,
            //         nickname:res.data.profile.nickname,
            //         backgroundUrl:res.data.profile.backgroundUrl
            //     })
            
            // })
           // console.log(this.state.info)
        }
    render() {
        const {info,touxiang,nickname,backgroundUrl} = this.state
        const sidebar = (
            <div className='infoUser' style={{background:`url(${backgroundUrl})`}}>
                <div className='headIndo' >
                    <div className='headLast'>
                     <img src={touxiang} className='touxiang'/>
                     <p>{nickname}</p><i style={{color:'#fff',fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>Lv.{info.level}</i>
                    </div>
                    <h3 style={{paddingLeft:'20px',color:'#fff'}}>我的听歌记录：{info.listenSongs}</h3>
                </div>
               <ul className='listInfo'>
                   <li>我的歌单</li>
                   <li>我的关注</li>
                   <li>我的动态</li>
                   <li>私信</li>
                   <li>我的数字专辑</li>
               </ul>
            </div>
        );
        return (
            <div className='MainFirst'>
               
                    <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {}}
                    rightContent={[
                        <Link to={{pathname:'/search'}} style={{color:'#fff'}}>
                        <Icon key="0" type="search" style={{ marginRight: '16px' }}/>
                        </Link>
                    ]}
                    className='header'
                    style={{  position:'fixed',
                    top:0,
                    zIndex:999,
                    width:'100%',
                    }}
                    onLeftClick={this.onOpenChange}
                    >网易云首页</NavBar>
                    <Drawer
                    className="my-drawer"
                    style={{ minHeight: document.documentElement.clientHeight }}
                    enableDragHandle
                    contentStyle={{ color: '#000', textAlign: 'center', paddingTop: 42 }}
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={this.onOpenChange}
                >
              <Gexing />
                <div className='main'>
                    <div className='Carousel'>
                        <Carousel />
                    </div>
                    
                    <FmTitle />
                    <SongTui />
                    <BuNav1 />
                </div>
      </Drawer>
                  
               
      
            </div>
        )
    }
}

export default index
