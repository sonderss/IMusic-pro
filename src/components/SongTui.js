import React, { Component,useState,useEffect } from 'react'
import Link from 'umi/Link'
import {getIndexMusic} from '../servers/getMusic'


function SongTui() {
    const [list,setList] = useState([])
    useEffect(function(){
        getIndexMusic().then(res=>{
            setList(res.data.result)
        })
    },[])
    return (
        <div className='SongTj'>
            
            <ul>
                {list.map(item=>{
                  return  <li key={item.id}>
                            <Link to={{pathname:'/SongDetail',search:`id=${item.id}`}}>
                            <img src={item.picUrl} alt={item.id} />
                            </Link>
                            <p >{item.name}</p>
                          </li>
                })}
                
            </ul>
        </div>
    )
}

export default SongTui



