import React , {useEffect,useState} from 'react'
import {getUserPlaySongs} from '../servers/getMusic'
import {getMusicUrl} from '../servers/getMusic'
import {Toast} from 'antd-mobile'
import '../../node_modules/antd-mobile/dist/font_4q1fp5troyo/iconfont.css'
function BuNav() {
    const [songList,setSongList] = useState({song:{name:'',ar:[{name:''}],al:[{picUrl:''}],privilege:{id:''}}})
    const [isPlay,setIs] = useState(false)
    const [num,setNum] = useState(0)
    const [MusicList,setList] = useState(0)
    const [List,setL] = useState(0)
    useEffect(function(){
        const uid = localStorage.getItem('useId')
        //这里没有考虑未登录状态
        getUserPlaySongs(uid).then(res=>{

            setL(res.data.weekData)
            setList(res.data.weekData.length)
            //console.log(res.data.weekData.slice(1,2)[0])
            setSongList(res.data.weekData.slice(MusicList,MusicList+1)[0])
          console.log(res.data.weekData)
         
        })
    },[])
  
   //播放
    const play = (songId)=>{
    // console.log(songId) 拿到歌曲id，调用获取URl的接口
    const audio = document.getElementById('playMusic')
    //把Url给到播放器
    if(audio.src == ''){
        getMusicUrl(songId).then(res=>{
            audio.setAttribute('src',res.data.data[0].url)
            setIs(true)
         })
         }
      if(audio.src){
        if(isPlay){
            audio.pause()
            setIs(false)
        }else{
            audio.play()
            setIs(true)
        }
        if(audio.ended){
            setIs(false)
        }
        console.log(audio.ended)
      }
   }
    //上一首
    function prv() {
       
         if(num == 0){
            setNum(List.length)
            console.log(num)
         }else{
            const uid = localStorage.getItem('useId')
            const audio = document.getElementById('playMusic')
              getUserPlaySongs(uid).then(res=>{
                //console.log(res.data.weekData.slice(1,2)[0])
                setSongList(res.data.weekData.slice(num-1,num)[0])
                setNum(num-1)
              
              // console.log(res.data.weekData.slice(1,1)[0])
              const len = res.data.weekData.length
              const sid = res.data.weekData.slice(num-1,num)[0].song.privilege.id
                getMusicUrl(sid).then(res=>{
                    audio.setAttribute('src',res.data.data[0].url)
                    setIs(true)
                })
                if(audio.src){
                    if(isPlay){ 
                        audio.pause()
                        setIs(false)
                    }else{
                        audio.play()
                        setIs(true)
                    }
                    if(audio.ended){
                        setIs(false)
                    }
                }
            })
            //console.log()
            
    //    console.log(num)
}
        console.log(songList)
    }
    //下一首
    const next =()=>{
        if(num == List.length){
            setNum(1)
        }else{
        const uid = localStorage.getItem('useId')
        const audio = document.getElementById('playMusic')
      
            getUserPlaySongs(uid).then(res=>{
                //console.log(res.data.weekData.slice(1,2)[0])
                setSongList(res.data.weekData.slice(num,num+1)[0])
                setNum(num+1)
                console.log(num)
              // console.log(res.data.weekData.slice(1,1)[0])
              const len = res.data.weekData.length
              const sid = res.data.weekData.slice(num,num+1)[0].song.privilege.id
                getMusicUrl(sid).then(res=>{
                    audio.setAttribute('src',res.data.data[0].url)
                    setIs(true)
                })
                if(audio.src){
                    if(isPlay){ 
                        audio.pause()
                        setIs(false)
                        if(audio.ended){
                            setIs(false)
                        }
                    }else{
                        audio.play()
                        setIs(true)
                    }

                }
            })
            //console.log()
         
        //    console.log(num)
        
        //     console.log(songList)
    }
        
    }
    return (
        <div className='PlayMusic'>
            <div className='left-Nav'>
                <h2 className='left-img'>
                    <img src={songList.song.al.picUrl}/>
                </h2>         
                <h3 className='left-imgName'>
                    <p className='song-name'>{songList.song.name}</p>
                    <p className='song-name' style={{textAlign:'text'}}>{songList.song.ar[0].name}</p>
                </h3>  
            </div>
             <div className='right-Nav'>
                 <span className='iconfont icon-xiayishou1 one'
                 onClick={()=>prv(songList.song.privilege.id)}
                 ></span>
                 <span className={isPlay ? 'iconfont icon-pause-20 play' :'iconfont icon-bofang play' }
                 onClick={(e)=>play(e,songList.song.privilege.id)}
                 ></span>
                 <span className='iconfont icon-xiayishou one'
                 onClick={()=>next()}
                 ></span>
                 <span className='iconfont icon-liebiao one'></span>
            </div>
            
        </div>
    )
}

export default BuNav
