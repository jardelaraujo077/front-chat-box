import * as React from 'react';
import '../../css/App.css';
export default function MessageResp(props) {
    const { text = "" } = props
   
 
    return (
        <div className='container-menssage-resp'>
           <span className='text-resp'>{text}</span> 


        </div>
        
    );
}

