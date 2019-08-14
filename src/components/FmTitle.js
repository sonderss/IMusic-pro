import React, { Component } from 'react'
import { Icon, Grid } from 'antd-mobile';
import   '../../node_modules/antd-mobile/dist/font_4q1fp5troyo/iconfont.css'
class FmTitle extends Component {
 
    render() {
        return (
            <div className='FmTitle'>
                <ul>
                    <li>
                        <span className='iconfont icon-shouyinji'>
                        </span>
                        <p>私人FM</p>
                    </li>
                    <li>
                        <span className='iconfont icon-2222222222222222
'>
                        </span>
                        <p>每日歌曲推荐</p>
                    </li>
                    <li>
                        <span className='iconfont icon-yinlang'>
                        </span>
                        <p>排行榜</p>
                    </li>
                </ul>
            </div>
        )
    }
}
export default FmTitle