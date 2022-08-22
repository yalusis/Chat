import React, { useState } from 'react'
import { AiOutlineSend } from "react-icons/ai";

export default function FullTalk({ user, all_message, submit }) {
  const[message, set_message] = useState('')
  const[answer, set_answer] = useState('')
  if(user == null) {
    return <div></div>
  } else {
  const Url = 'http://localhost:3001/'
  const answer_url = 'https://api.chucknorris.io/jokes/random'
  const full_talk = user.full_talk

  const array_message = all_message.message.filter(message => message.user_id === full_talk.id);
  const all_talks = array_message.map((message) => {
    if(message.who === 'companion') {
     return(
      <div key={message.id}>
      
      <img className='image_in_chat' src={message.image} alt={""}/>
      <div className='message_left'>{message.message}</div>
      <div className='message-data'>{message.date_for_message.join('/')} {message.time.join(':')}</div>
      </div>
     )} else if(message.who === 'I'){
      return (
         <div className='right'>
        <div className='message_right'>{message.message}</div>
        <div className='message-data-right'>{message.date_for_message.join('/')} {message.time.join(':')}</div>
        </div>
      )}
    })

    let arr=[
      'Січня',
      'Лютого',
      'Березня',
      'Квітня',
      'Травня',
      'Червня',
      'Липня',
      'Серпня',
      'Вересня',
      'Жовтня',
      'Листопада',
      'Грудня',
   ];

  let date = new Date();

    function Change_input(event){
      set_message(event.target.value)
    }

    let take_answer = () => {
      fetch(answer_url)
      .then(response => response.json())
      .then(response => set_answer(response))

      if(answer !== ''){
        const newAnswer = {
        id: all_message.length,
        user_id: full_talk.id,
        who: "companion",
        data: [ date.getDate(), arr[new Date().getMonth()], date.getFullYear() ],
        date_for_message: [ date.getDate(),  date.getMonth()+1, date.getFullYear() ],
        time: [ date.getHours(), date.getMinutes() ],
        message: answer.value,
        image: full_talk.image
    };
  
    fetch(Url + 'message', {
        method: "POST",
        body: JSON.stringify(newAnswer),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .catch(error =>  { console.log('post answer', error.message); alert('Your answer could not be posted\nError: '+ error.message); });
    set_answer('')
    submit()
    }
    }
  
    function sendMessage() {
    
    const newMessage = {
        id: all_message.length,
        user_id: full_talk.id,
        who: "I",
        message: message,
        data: [ date.getDate(), arr[new Date().getMonth()], date.getFullYear() ],
        date_for_message: [ date.getDate(),  date.getMonth()+1, date.getFullYear() ],
        time: [ date.getHours(), date.getMinutes() ],
        image: full_talk.image
    };
  
    fetch(Url + 'message', {
        method: "POST",
        body: JSON.stringify(newMessage),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .catch(error =>  { console.log('post message', error.message); alert('Your message could not be posted\nError: '+ error.message); });
    set_message('')
    submit()

    setTimeout(() => {
      take_answer()
    }, 10000)

  }

  return (
    <div>
    <span className="full_talk">
         <img className='image_full' src={full_talk.image} alt={full_talk.name} />
         <div className='info_full_talk'>
         <span className='user_name'>{full_talk.name}</span>
         </div>
    </span>
    <div className='talk'>
       {all_talks}
    </div>
    <div className='write-message'>
      <div className='div_message'>
      <span className='span_message'>
      <input type="text" spellCheck="false" value={message} onChange={Change_input} className='input_2' placeholder='Type your message' />
      <AiOutlineSend onClick={sendMessage} className='icon-send'/>
      </span>
      </div>
    </div>
    </div>
  )}
}