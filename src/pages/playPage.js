import React, { Component } from 'react'
import {play, prv} from '../servers/testFn'
import {getUserPlaySongs,getSongInfo,getLrc} from '../servers/getMusic'
import {getUrl,showLrc} from '../servers/testFn'
import { Progress } from 'antd-mobile';
import { parse } from 'qs'
import { Icon} from 'antd-mobile';
import creatHistory from 'history/createHashHistory'  //返回上一页这段代码
const history = creatHistory();//返回上一页这段代码
class playPage extends Component {
    state ={
        isPlay:false,//改变图标播放状态
        index:1,//当前播放音乐
        SongList:[],  //最近播放记录
        sid:'', //歌曲名字
        songer:'',//歌手名字
        songImg:'',//歌曲图片
        a:'',
        times:'',
        b:'',
        text:[],//歌词文本
        c:[],
        d:[],
        time:[],
        num:1,
        test:[], //时间当做id
        songId:'', //歌单歌曲id
        geci:false,
        jindu:0, //进度条
        zong:0//总时长
    }
    componentDidMount(){
        const uid = localStorage.getItem('useId')
        const audio = document.getElementById('playMusic')
        const queryData = parse(this.props.location.search, {
            ignoreQueryPrefix: true, // 忽略掉?
        }); 
        
        
        
        getSongInfo(queryData.id).then(res=>{
            this.setState({
                sid:res.data.songs[0].name,
                songer:res.data.songs[0].ar[0].name,
                songImg:res.data.songs[0].al.picUrl
            })
           
            
        })
        getLrc(queryData.id).then(res=>{
           // console.log(res.data.lrc.lyric)
            this.setState({
                a:res.data.lrc.lyric.split('[')
            })
            for(var i=0;i<this.state.a.length;i++){
                this.setState({
                    b:this.state.a[i].split(']')
                })
               
                this.state.c.push(this.state.b[0].split('.'))
                
               if(this.state.b){
                    this.state.text.push(this.state.b[1])
               }
              
               this.state.d.push(this.state.c[i][0].split(':'))
               
              this.state.time.push(this.state.d[i][0]*60+this.state.d[i][1]*1)
            //    this.state.time.splice(1,1)
             
            }
           //console.log( this.state.time)
            for(var i = 1;i<this.state.time.length;i++){
                this.state.test.push(this.state.time[i])
                
            }
            this.state.test.unshift(-1)
            //console.log(audio.currentTime)
            const ap = document.getElementsByTagName('p');
            const oap = document.getElementsByClassName('zhongjian')[0]
            const jindu = document.getElementById('jindu')//进度条
           // console.log(ap)
        //    console.log(this.state.test)
        //    console.log(this.state.time)
           //if(this.state.time[0] == )
           const that = this
            audio.oncanplay = function () {  
                var MusicTimes = audio.duration //总时长
                that.state.zong = MusicTimes
                console.log(that.state.zong)
                // console.log(MusicTimes)  
            }
            audio.addEventListener('timeupdate',()=>{
                
                var nowTime =parseInt(audio.currentTime)
                
            //    console.log( nowTime/parseInt(this.state.zong).toFixed(2))
               var a =  nowTime/parseInt(this.state.zong)

              // a.toFixed(2)
             
               jindu.style.width = a.toFixed(2)*100+'%'
               if(document.getElementById(nowTime)){
                    for(var i=1;i<ap.length;i++){
                        ap[i].style.color='#000'
                        ap[i].style.fontSize='14px'
                    }
                    document.getElementById(nowTime).style.color='red'
                    document.getElementById(nowTime).style.fontSize = '16px'
               }
               if(ap[6+this.state.num*1].id == nowTime){
                oap.style.top = -40*this.state.num+'px'
                oap.style.transition = '1s linear'
                       this.state.num++   
               }
               
               if(this.state.num == ap.length-6){
                  this.state.num = 0;
               }   
                if(parseInt(this.state.zong)  == nowTime){
                    this.setState({
                        isPlay:false
                    })
                    oap.style.top = '0px'
                    a = 0+'&'
                    this.state.isPlay = false
                    audio.removeEventListener("timeupdate",null,false);
                }   
               
            })
        console.log(audio.paused)
        console.log(this.state.num)
        })
    
        //最近播放歌曲列表
        getUserPlaySongs(uid).then(res=>{
            //console.log(res.data.weekData)
            this.setState({
                SongList:res.data.weekData //最近播放歌曲列表
            })
            getUrl(queryData.id)
            this.setState({
                isPlay:true
            })
           
        })
        // audio.oncanplay = function () {  
        //     var MusicTimes = audio.duration //总时长
        //     this.state.zong = MusicTimes
        //     console.log(MusicTimes)  
        // }
      
    }
    //播放
    playS(){
        
        this.setState({
            isPlay:!this.state.isPlay
        },function(){
            play(this.state.isPlay)
        })
       
    }
    prv(){
        const audio= document.getElementById('playMusic')
        const that = this
        this.setState({
            isPlay:!this.state.isPlay
        },function(){
            this.state.index++
            getUrl(this.state.SongList[this.state.index-1].song.id) //获取歌曲url
            play(this.state.isPlay)//播放
            getSongInfo(this.state.SongList[this.state.index-1].song.id).then(res=>{
                this.setState({
                    sid:res.data.songs[0].name,
                    songer:res.data.songs[0].ar[0].name
                })
               
            })
            getLrc(this.state.SongList[this.state.index-1].song.id).then(res=>{
                    this.setState({
                        text:[],
                        a:res.data.lrc.lyric.split('['),
                        b:'',
                        c:[],
                        d:[],
                        time:[],
                        test:[], //时间当做id
                    })
                    for(var i=0;i<this.state.a.length;i++){
                        this.setState({
                            b:this.state.a[i].split(']')
                        })
                        this.state.c.push(this.state.b[0].split('.'))
                        if(this.state.b){
                            this.state.text.push(this.state.b[1])
                        }
                        this.state.d.push(this.state.c[i][0].split(':'))
                        // console.log(this.state.d[i][0]*60)
                         this.state.time.push(this.state.d[i][0]*60+this.state.d[i][1]*1)
                         this.state.test.push(this.state.time[i])   
                    }
                   // console.log(this.state.text)
                //  console.log(this.state.a.length)
                // console.log(this.state.test)
            })
        })
        if(this.state.index == this.state.SongList.length){
            this.setState({
               index: 1
            })
        }
        if(!audio.paused){
            console.log('正在播放')
            this.setState({
                isPlay:true
            })
            
        }
    }
    next(){
        const audio= document.getElementById('playMusic')
        const that = this
        this.setState({
            isPlay:!this.state.isPlay
        },function(){
            this.state.index--
            getUrl(this.state.SongList[this.state.index-1].song.id) //获取歌曲url
            play(this.state.isPlay)//播放
            getSongInfo(this.state.SongList[this.state.index-1].song.id).then(res=>{
                this.setState({
                    sid:res.data.songs[0].name,
                    songer:res.data.songs[0].ar[0].name
                })
            })
            getLrc(this.state.SongList[this.state.index-1].song.id).then(res=>{
                this.setState({
                    text:[],
                    a:res.data.lrc.lyric.split('['),
                    b:'',
                    c:[],
                    d:[],
                    time:[],
                    test:[], //时间当做id
                })
                for(var i=0;i<this.state.a.length;i++){
                    this.setState({
                        b:this.state.a[i].split(']')
                    })
                    this.state.c.push(this.state.b[0].split('.'))
                    if(this.state.b){
                        this.state.text.push(this.state.b[1])
                    }
                    this.state.d.push(this.state.c[i][0].split(':'))
                    // console.log(this.state.d[i][0]*60)
                     this.state.time.push(this.state.d[i][0]*60+this.state.d[i][1]*1)
                     this.state.test.push(this.state.time[i])   
                }
               // console.log(this.state.text)
                // console.log(this.state.a.length)
                // console.log(this.state.test)
             })
        })
        if(this.state.index == 1){
            this.setState({
               index: this.state.SongList.length
            })
        }
        if(!audio.paused){
           // console.log('正在播放')
            this.setState({
                isPlay:true
            })
        }
    }
    //后退，并停止播放
    toPrv(){
        this.state.isPlay = false
        play(this.state.isPlay)
        history.goBack();
    }
    render() {
        const {isPlay,sid,text,test,songer,songImg} = this.state
        return (
            <div className='PlayPage'>
                <div className='head-haha' >
                   <Icon type="left" onClick={()=>this.toPrv()}/>
                    <h3 style={{paddingRight:'37px'}}>{sid}-{songer}</h3>
                    <span>     </span>
                </div>
                <div id='jindu' style={{width:'0px',height:'2px',zIndex:'999',background:'red',position:'fixed',bottom:'72px'}}>
                </div>
                <div id='qqq' style={{ display:'flex',height:'100%',overflow:'hidden',position:'relative',background:'url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565611322617&di=993fb2473f357e4352c2a590065bc4f4&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201711%2F29%2F20171129112214_Vf3Mv.thumb.700_0.jpeg")no-repeat'}}>
                <div className='zhongjian' style={{overflow:'auto'}}>
                        {text.map((item,index)=>{
                            return (<div key={index} className='wenben' style={{height:'40px',lineHeight:'40px'}}>

                                <p id={test[index]} style={{width:'100%',height:'100%',margin:'0 0',overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{item}</p>
                            </div>)
                        })}
                   
                </div>
                </div>
                <div className='right-Nav haha' style={{background:'url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565611322617&di=993fb2473f357e4352c2a590065bc4f4&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201711%2F29%2F20171129112214_Vf3Mv.thumb.700_0.jpeg")no-repeat'}} >
                    <span className='iconfont icon-xiayishou1 one'
                    onClick={()=>this.prv()}
                    ></span>
                    <span id='one' className={isPlay ? 'iconfont icon-pause-20 play' :'iconfont icon-bofang play' }
                    onClick={()=>this.playS()}
                    ></span>
                    <span className='iconfont icon-xiayishou one'
                    onClick={()=>this.next()}
                    ></span>
                    <span className='iconfont icon-liebiao one'></span>
                </div>
            
        </div>
        )
    }
}
export default playPage