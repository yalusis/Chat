import Chats from './components/Chats';
import { useEffect, useMemo, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { IoSearchOutline } from 'react-icons/io5'
import Search from './components/Search';
import FullTalk from './components/Full_Talk';

function App() {
  const [correspondence, set_correspondence] = useState(null)
  const [submit, set_submit] = useState(true)
  const [message, set_message] = useState(null)
  const [full_talk, set_talk] = useState(null)
  const [true_search, set_true_search] = useState('')
  const [search, set_search] = useState( "" );

  const Url = 'http://localhost:3001/'

  useEffect(() => {
    fetch(Url + 'users')
      .then(response => response.json())
      .then((response) => set_correspondence({correspondence : response}));
  }, [])
  useEffect(() => {
    fetch(Url + 'message')
      .then(response => response.json())
      .then((response) => set_message({message : response}));
  }, [submit])

  function Change_input(event) {
    set_search(event.target.value) 
    set_true_search('')
  }

  function memoValue() {
  if (correspondence == null) {
    return 
  } else {
    for(let i = 0; i < correspondence.correspondence.length; i++){
      if(correspondence.correspondence[i].name === search) {
      set_true_search(correspondence.correspondence[i])
    }
  }
  }
  }

  const memo_value = useMemo(() => memoValue(), [search])


    if(correspondence == null || message == null) {
      return <div></div>
    } else {

    return (
    <div className="App">
      <FullTalk user={full_talk} all_message={message} submit={() => set_submit({ submit: !submit})}/>
      <header>
      <FaUserCircle className='user-icon' color='silver'/>
      <div className='input-div'>
        <span className='span'>
        <IoSearchOutline />
        <input type="text" spellCheck="false" value={search} onChange={Change_input} className='input' placeholder='Search or start a new chat'/>
        </span>
      </div>
      </header>
    { search === '' ? <Chats submit={submit} full_talk={(item) => set_talk({ full_talk: item })} message={message} state={correspondence.correspondence} /> : true_search === '' ? <div></div> : <Search full_talk={(item) => set_talk({ full_talk: item }) } message={message} user={true_search}/>}
    </div>
  )};
}


export default App;
