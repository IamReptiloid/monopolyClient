import React, {FC, useRef, useState} from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { createSession } from '../backend';
import { createSessionId } from '../utils/createSessionId';
import playerState from '../store/PlayerState';
import sessionState from '../store/SessionState';
import './registration.scss';
import { getColour } from '../utils/getColour';

const Registration: FC = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const history = useHistory();
    const [validated, setValidated] = useState<boolean>(false);

    const createRoom = async (playerName: string) => {
        const sessionId = createSessionId();
        sessionState.setSessionId(sessionId);
        const colour = getColour(playerState.players);
        await createSession(sessionId, playerName, colour);
        playerState.setName(playerName);
        history.push(sessionId);
    }

    const submit = () => {
        const playerName = inputRef.current?.value;
        if (playerName) {
            createRoom(playerName)
        } else {
            setValidated(true);
        }
    }

    return <div className='registration'>
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
            <Button onClick={submit} variant="primary">
                Создать сессию
            </Button>
        </Form>
    </div>
}

export default Registration;