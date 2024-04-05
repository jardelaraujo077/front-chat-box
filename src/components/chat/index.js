import * as React from 'react';
import '../../css/App.css';
import Message from '../menssage';
import Send from '../menssage/send';
import { useEffect, useState } from 'react'
import axios from "axios";
import api from '../../api';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
export default function Chat() {

    const [text, setTexto] = useState([{ msg: '', resp: '' }])
    const [way, setWay] = useState('/static/JardelAraujo.jpg')
    const [progress, setStatus] = useState(false);
    const [limit, setLimit] = useState(false);
    const visibleChat = async (res) => {
        await setStatus(true)
        try {
            // Atualize o estado do texto do chat
            await setTexto([...text, { msg: res.menssagem }]);

            // Faça uma solicitação POST para /audio
            const response = await api.post(`/audio`, res, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, GET',
                    'Access-Control-Allow-Headers': '*',
                },
                responseType: 'arraybuffer' // Indique que você espera um array buffer como resposta
            });
            console.log('aqui', response)
            // Extraia o conteúdo do áudio da resposta
            const audioBuffer = response.data;

            // Crie um Blob a partir do buffer de áudio
            const blob = new Blob([audioBuffer], { type: 'audio/wav' });

            // Crie uma URL temporária para o áudio
            const audioUrl = URL.createObjectURL(blob);

            // Reproduza o áudio
            await responseChat(res.menssagem, audioUrl);
            await setStatus(false)
        } catch (error) {
            if (error.response.status == 429) {
                await setStatus(true)
                await setLimit(true)
            }

        }
    };
    const responseChat = async (pergunta, resposta) => {
        await setTexto([...text, { msg: pergunta, resp: resposta }]);

    }
    useEffect(() => {


    }, [])

    return (
        <div className='box-send'>

            <div className='container-top'>
                <div className='container-header'>
                    <a href="https://www.linkedin.com/in/jardel-marinho-a15157138/">
                        <Stack direction="row" spacing={2}>
                            <Avatar alt="Jardel Araujo" src={way} />
                            <span ><b>Jardel Araujo</b></span>

                        </Stack>
                    </a>

                </div>


            </div>
            <div className='container-chat'>

                <div className='content-box'>

                    {


                        text.map((item) => {

                            return (
                                <div className='box-chat'>
                                    <Message text={item.msg} resp={item.resp} />

                                </div>
                            )
                        })
                    }

                </div>
            </div>
            <div className='container-bottom'>
                {
                    progress ?
                        <>
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                            {
                                limit &&
                                <div className='container-text'>
                                    <span className='text-limit'> Desculpe, parece que você atingiu o limite de interações permitidas por enquanto. Por favor, volte mais tarde para continuar nossa conversa.
                                        Enquanto isso, sinta-se à vontade para visitar meu perfil no LinkedIn clicando na minha foto. Estou ansioso para continuar nossa conversa quando você retornar.
                                    </span>
                                </div>
                            }

                        </>
                        :

                        <Send visibleChat={(res) => visibleChat(res)} />
                }

            </div>
        </div>

    );
}

