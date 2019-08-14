import React, { Component } from 'react'
import Link from 'umi/Link'
class Gexing extends Component {
    render() {
        return (
            
            <div className='gexing'>
                
                <ul>
                    <li><Link to='/'>个性推荐</Link></li>
                    <li><Link to='/'>歌单</Link></li>
                    <li> <Link to='/' >主播电台</Link></li>
                    <li><Link to={{pathname:'/' }}>排行榜</Link></li>
                </ul>
               
            </div>
        )
    }
}
export default Gexing