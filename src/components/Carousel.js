import React, { Component } from 'react'
import { Carousel, WingBlank } from 'antd-mobile';
import {getCarousel} from '../servers/getMusic'
class Carousel1 extends React.Component {
   state = {
    data: [],
    
    imgHeight: 176,
  }
  componentDidMount(){
    getCarousel(1).then(res=>{
      this.setState({
          data:res.data.banners
      })
     // console.log(res.data.banners)
       })
    //res.data.pic 歌曲图片
    // res.data.song.id 歌曲id
   
  }
  toPay(bannerId){
    //console.log(bannerId)
    alert('该专辑为：'+bannerId)
  }
  render() {
  
    return (
      <WingBlank 
      >
        <Carousel
          autoplay={true}
          infinite={true}
          beforeChange={(from, to) => {}}
          afterChange={index => {}}
        >
          {this.state.data.map(val => (
             
            <a
              key={val}
              href='javascript:void(0)'
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={`${val.pic}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
                onClick={()=>this.toPay(val.bannerId)}
              />
            </a>
          ))}
        </Carousel>
      </WingBlank>
    );
  }
}

export default  Carousel1


// http://p1.music.126.net/ojuXpfpUhU_F1t08E7BIFQ==/109951164270661530.jpg
// 
// // 