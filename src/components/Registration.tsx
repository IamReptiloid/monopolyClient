import React, {FC, useRef, useState, MouseEvent} from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { createSession } from '../backend';
import { createSessionId } from '../utils/createSessionId';
import playerState from '../store/PlayerState';
import sessionState from '../store/SessionState';
import style from './Registration.module.scss';
import { getColour } from '../utils/getColour';
import { useRouter } from 'next/router';
import Head from 'next/head';

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

    return <>
    <Head><title>Создание игры</title></Head>
    <div className={style.registration}>
        <Form className={style.registration__form}>
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
            <Button onClick={submit} variant="primary">
                Создать сессию
            </Button>
        </Form>
    </div>
</>
    
}

export default Registration;