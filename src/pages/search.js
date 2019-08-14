import React, { Component } from 'react'
import { SearchBar,Toast} from 'antd-mobile';
import {getSearch} from '../servers/getMusic'
import Link from "umi/Link"; 
import creatHistory from 'history/createHashHistory'  //返回上一页这段代码
const history = creatHistory();//返回上一页这段代码
class search extends Component {
    constructor(props){
        super(props)
        
    }
    state = {
        flag:true,
        songs:[],//歌曲
        artists:[],//歌手
     }
    getValue(e){
        if(e){

       
       getSearch(e).then(res=>{
                console.log(res.data)
                if(res.data.result ){
                
                    if( !res.data.result.songs || !res.data.result.artists ){
                        Toast.info('关键词错误')
                    }else{
                        this.setState({
                            songs:res.data.result.songs,
                            artists:res.data.result.artists
                        })
                    }
                }else{

                }
            
            //console.log(res.data.result)
            })  
        }else{

        }
    }
    clear(){
  
        const oUl = document.getElementById('oUl')
        oUl.innerHTML = ''
        history.goBack();
    }
    render() {
        const {artists,songs} = this.state
        return (
            <div>
                 <SearchBar placeholder="李荣浩" 
                 onChange={(e)=>this.getValue(e)}
                 ref={ref => this.autoFocusInst = ref} 
                 onCancel={(e)=>this.clear(e)}
                 
                 />
                
                 <ul id='oUl'>
                     {/* 歌曲 */}
                      {songs.map((item,index)=>{
                          return (
                              <Link to={{pathname:'/playPage',search:`id=${item.id}`}} key={index}>
                              <div >
                                  <li>{item.name}</li>
                              </div>
                              </Link>
                          )
                      })}
                      {/* 歌手 */}
                      {artists.map((item,index)=>{
                           return (
                            <Link to={{pathname:'/songEr',search:`id=${item.id}`}} key={index}>
                            <div>
                                <li>{item.name}</li>
                            </div>
                            </Link>
                            )
                      })}

                 </ul>
            </div>
        )
    }
}
export default search