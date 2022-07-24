import React, {FC, useRef, useState, MouseEvent} from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { createSession } from '../backend';
import { createSessionId } from '../utils/createSessionId';
import playerState from '../store/PlayerState';
import sessionState from '../store/SessionState';
import { getColour } from '../utils/getColour';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Help from './process/Help';

const Registration: FC = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter()
    const [validated, setValidated] = useState<boolean>(false);

    const createRoom = async (playerName: string) => {
        const sessionId = createSessionId();
        sessionState.setSessionId(sessionId);
        const colour = getColour(playerState.players);
        await createSession(sessionId, playerName, colour);
        playerState.setNewName(playerName, sessionId);
        router.push(`table/${sessionId}`);
    }

    const submit = (e: MouseEvent<HTMLButtonElement>) => {
        const playerName = inputRef.current?.value;
        if (playerName) {
            e.preventDefault()
            createRoom(playerName)
        } else {
            e.preventDefault()
            setValidated(true);
        }
    }

    return <div>
    <Head>
        <title>Создание игры</title>
        <link rel="shortcut icon" href="/assets/logo.ico" type="image/x-icon"/>
    </Head>
    <div className='registration'>
        <Form className='registration__form'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Имя</Form.Label>
                <Form.Control isInvalid={validated} as="input" ref={inputRef} placeholder="Введите имя" />
                <Form.Control.Feedback type="invalid">
                    Обязательное поле
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                    Имя будет использоваться во время игры
                </Form.Text>
            </Form.Group>
            <div className='reg'>
                <Help/>

                <Button onClick={submit} variant="primary">
                    Создать сессию
                </Button>
            </div>
        </Form>
    </div>
</div>
    
}

export default Registration;