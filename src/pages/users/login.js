import React, { Component } from 'react'
import Link from "umi/Link"; 
import {Button} from 'antd-mobile'
import {getLogin} from '../../servers/getMusic'
import router from 'umi/router'


class login extends Component {
    state={
        phone:'',
        psd:''
    }
    getValue(e){
        this.setState({
            phone:e.target.value
        })
    }
    getPsd(e){
        this.setState({
            psd:e.target.value
        })
    }
    toLogin(phone,psd){
        getLogin(phone,psd).then(res=>{
            console.log(res.data) //用户信息
            if(res.data.code == 200){
                localStorage.setItem('useId',res.data.account.id)
                router.push('/')
                
            }else{
                alert('输入错误请确认用户名密码')
            }
        })
    }
    render() {
        const {phone,psd} = this.state
        return (
            <div className='Login'>
                <input type='text' placeholder='请输入手机号' 
                value={this.state.phone}
                onChange={this.getValue.bind(this)}
                />
                  <input type='password' placeholder='请输入密码' 
                   value={this.state.psd}
                   onChange={this.getPsd.bind(this)}
                  />
                  <Button type='warning' style={{width:'105%',paddingLeft:'0'}}
                  onClick={()=>this.toLogin(phone,psd)}
                  >登陆</Button>
                  <Link to={{pathname:'/users/register'}} className='reg'>
                  <Button type='primary' size='large'> 注册 </Button>
                  </Link>
            </div>
        )
    }
}
export default  login
