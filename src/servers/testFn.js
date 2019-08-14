import {getMusicUrl} from '../servers/getMusic'
import {useEffect,useState} from 'react'
import { func } from 'prop-types';
import {getLrc} from '../servers/getMusic'
//验证注册输入框是否为空
export function getNull(a,b,c,d){
    if(a.length == 0 || b.length == 0 || c.length == 0 || d.length == 0){
        return 0
    }else{
        return 1
    }
}
//获取Url
export function getUrl(sId){
    const audio = document.getElementById('playMusic')
    getMusicUrl(sId).then(res=>{
            audio.setAttribute('src',res.data.data[0].url)
                    
    })
}

//播放
export function play(isPlay){
    const audio = document.getElementById('playMusic')
    
            if(isPlay){
                audio.play()
            }else{
                audio.pause()
            }
                
              
}
//获取歌词并且展示
//  export async function showLrc(songId){
//   var a = await  getLrc(songId)
//    console.log(a.data.lrc)
//    return a.data.lrc
// }
