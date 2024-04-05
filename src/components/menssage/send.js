import * as React from 'react';
import '../../css/App.css';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
export default function Send(props) {
    const { text = "",visibleChat } = props
    const [textDigit, setDigit] = useState({menssagem: ''})
    const onchange = async (e) => {
        let { name, value } = e.target
        await setDigit({ ...textDigit, [name]: value })

    }
    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {            
            await visibleChat(textDigit);
            await setDigit({menssagem: ''})
        }
      };
      const click = async()=>{
        await visibleChat(textDigit);
        await setDigit({menssagem: ''})
      }

    return (
        <>
            <div className='container-send'>
                 <TextField id="standard-basic" label="Mensagem" /* disabled={maps ? true : false} */ variant="standard" name="menssagem" value={textDigit.menssagem} onChange={onchange}  onKeyDown={handleKeyDown}/>
               <SendIcon onClick={click}/> 
            </div>
            
        </>

    );
}

