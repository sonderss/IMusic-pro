import React, { Component } from 'react'
import logo from '../../statics/wyy.png'
import { Button , Toast} from 'antd-mobile';
import { getCaptcha } from '../../servers/getMusic'
import {getRegister} from '../../servers/getMusic'
import {getNull} from '../../servers/testFn'
import {getCheckPhone} from '../../servers/getMusic'
import router from 'umi/router'
class register extends Component {
    state =  {
        useName:'',
        psd:'',
        cap:'',
        name:''
    }
    getUsename(e){
        this.setState({
            useName:e.target.value
        })
    }
    getPsd(e){
        this.setState({
            psd:e.target.value
        })
    }
    getCap(e){
        this.setState({
            cap:e.target.value
        })
    }
    getName(e){
        this.setState({
            name:e.target.value
        })
    }
    getCaprchaNum(phone){
        getCaptcha(phone).then(res=>{
            if(res.status == 200){
                Toast.info('验证码已发送！')
            }else if(res.status == 400){
                Toast.info('发送验证码超过限制:每个手机号一天只能发5条验证码')
            }else{
                Toast.info('请输入正确号码或者稍微等待一会~')
            }
           
        })
    }
    toRegster(useName,psd,cap,name){
       
      //判断输入框是否为空
      const a = getNull(useName,psd,cap,name)
       if(a == 0){
           alert('信息不能为空')
       }else if(a == 1){
           //判断是否重复注册 
            getCheckPhone(useName).then(res=>{
                if(res.data.code == 200){
                    alert(res.data.nickname+'已经注册过！')
                    this.setState({
                        useName:'',
                        psd:'',
                        cap:'',
                        name:''
                   })
                   router.push('/users')
                }else{
                    //在这里调用注册接口
                    getRegister(useName,psd,cap,name).then(res=>{
                        //console.log(res.data)
                        router.push('/users')
                    })
                }
            })  
       }else{
           alert('请检查网络！')
       }
    }
    render() {
        const {useName,psd,cap,name} = this.state
        return (
            <div className='LoReBack'>
                 <div className='bak'>
                  <div className='bak-main'>
                      <h2 style={{width:'30%'}}>
                          <img src='https://i.loli.net/2019/08/13/hAO4fTmCK1DjeRr.png' />
                      </h2>
                     <div className='login'>
                       <input type='text' placeholder='请输入手机号'
                       value={this.state.useName} 
                       onChange={this.getUsename.bind(this)}
                       />
                       <input type='text' placeholder='请输入密码'
                       value={this.state.psd} 
                       onChange={this.getPsd.bind(this)}
                       />
                       <div className='getCaptcha'>
                            <input type='text' placeholder='请输入验证码'
                            value={this.state.cap} 
                            onChange={this.getCap.bind(this)}
                            />
                            <Button type='ghost' onClick={()=>this.getCaprchaNum(this.state.useName)}>获取验证码</Button>
                       </div>
                       <input type='text' placeholder='请输入昵称'
                       value={this.state.name} 
                       onChange={this.getName.bind(this)}
                       />
                       <Button type='warning' style={{width:'105%',paddingLeft:'15px'}}
                       onClick={()=>this.toRegster(useName,psd,cap,name)}
                       >注册</Button>
                    </div>
                  </div>
               
               </div>
            </div>
        )
    }
}
export default register