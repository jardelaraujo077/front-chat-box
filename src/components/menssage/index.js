import * as React from 'react';
import '../../css/App.css';
import AudioPlayer from 'react-audio-player';
export default function Message(props) {
    const { text = "", resp = "" } = props


   
    return (

        <>
        
                <div   className={text != ''  ? `container-menssage-left` : ''} >
                    <span className='text'>{text}</span>
                 

                </div>
            

            {
                resp != '' && 
                <div  className={ resp != '' ? 'container-menssage-right' : ''} >
                        <AudioPlayer src={resp} autoPlay controls />
                  
                </div>
            }
                
            

        </>

    );
}

