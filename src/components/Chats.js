import React, { useEffect, useState } from 'react'

export default function Chats(props) {

  const [render_talks, set_render_talks] = useState(false)

  const make_user = () => {
    let user = props.state.map((user) => {
      const array_message = props.message.message.filter(message => message.user_id === user.id);
      const last_message = array_message.slice(-1)
      let short_message = '';
      if(last_message[0].message.length > 50){
       short_message = last_message[0].message.slice(0, 50)
       short_message = short_message.concat('...')
      }
   
       return(
           <div onClick={() => props.full_talk(user)} className='item_user' key={user.id}>
               <img className='image'  src={user.image} alt={user.name} />
               <div className='info_user'>
               <span className='user_name'>{user.name}</span>
               <span className='time'>{last_message[0].data.join(' ')}</span>
               <div className='last_message'>{short_message === '' ? last_message[0].message : short_message }</div>
               </div>
           </div>
       )})

       return user
  }

  function change_list() {
    let last_message_id = props.message.message[props.message.message.length - 1].user_id
    props.state.forEach(user => {
      if(user.id == last_message_id){
        props.state.splice(props.state.indexOf(user), 1)
        props.state.unshift(user)
      }
    });
    
  }

  useEffect(() => {
    change_list()
    set_render_talks(!render_talks)
    
  }, [props.submit])

  //set_render_talks(!render_talks)

  return (
    <div>
    <div className='title_chats'>
        <div className='chats'>Chats</div>
        </div>
     { render_talks ? make_user() : make_user() } 
    </div>
  )
 }

