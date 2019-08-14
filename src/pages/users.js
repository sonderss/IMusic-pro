import React, { Component } from 'react'
import Login from '../pages/users/login'
import Register from '../pages/users/register'
import  logo from  '../statics/wyy.png'
class LoReBack extends Component {
    render() {
        return (
            <div className='LoReBack'>
                <div className='bak'>
                  <div className='bak-main'>
                      <h2 style={{width:'30%'}}>
                          <img src='https://i.loli.net/2019/08/13/hAO4fTmCK1DjeRr.png' />
                      </h2>
                     
                    <Login />
                    {/* <Register /> */}
                  </div>
               
               </div>
            </div>
        )
    }
}

export default LoReBack