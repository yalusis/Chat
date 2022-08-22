import React from 'react'

export default function Search({ user, full_talk, message }) {

    const array_message = message.message.filter(message => message.user_id === user.id);
    const last_message = array_message.slice(-1)
    let short_message = ''
    console.log(last_message[0].message)
    if(last_message[0].message.length > 50){
        short_message = last_message[0].message.slice(0, 50)
        short_message = short_message.concat('...')
    }

  return (
    <div onClick={() => full_talk(user)} className='item_user' key={user.id}>
    <img className='image' src={user.image} alt={user.name} />
    <div className='info_user'>
    <span className='user_name'>{user.name}</span>
    <span className='time'>{last_message[0].data.join(' ')}</span>
    <div className='last_message'>{short_message === '' ? last_message[0].message : short_message }</div>
    </div>
</div>
  )
}
