import { get  } from './request'
import { func } from 'prop-types';


//首页展示歌单
export function getIndexMusic(){
        return get('http://www.shixueyi.club:3000/personalized')
}
//首页歌单详情

export function getDetailMusic(id){
    return get('http://www.shixueyi.club:3000/playlist/detail?id='+id)
}

//轮播图
export function getCarousel(type){
    return get('http://www.shixueyi.club:3000/banner?type='+type)
}
//获取验证码
export function getCaptcha(phone){
    return get('http://www.shixueyi.club:3000/captcha/sent?phone='+phone)
}
//登陆
export function getLogin(phone,psd){
    return get("http://www.shixueyi.club:3000/login/cellphone?phone="+phone+'&'+'password='+psd)
}
//注册
export function getRegister(phone,psd,cap,name){
    return get("http://www.shixueyi.club:3000/register/cellphone?phone="+phone+'&'+'password='+psd+'&'+'captcha='+cap+'&'+'nickname='+name)
}
//检测手机号是否注册
export function getCheckPhone(phone){
    return get('http://www.shixueyi.club:3000/cellphone/existence/check?phone='+phone)
}
//获取用户信息
export function getUserInfo(id){
    return get('http://122.152.214.15:3000/user/detail?uid='+id)
} 
//获取用户播放记录
export function getUserPlaySongs(uid){
    return get('http://www.shixueyi.club:3000/user/record?uid='+uid)
}

//获取音乐url
export function getMusicUrl(songId){
    return get('http://www.shixueyi.club:3000/song/url?id='+songId)
}
//获取歌曲信息
export function getSongInfo(songId){
    return get('http://www.shixueyi.club:3000/song/detail?ids='+songId)
}
//获取歌词
export function getLrc(songId){
    return get('http://www.shixueyi.club:3000/lyric?id='+songId)
}
//获取搜索内容
export function getSearch(key){
    return get('http://www.shixueyi.club:3000/search/suggest?keywords='+key)
}
//获取歌手详情
export function getSongEr(songErid){
    return get('http://www.shixueyi.club:3000/artists?id='+songErid)
}