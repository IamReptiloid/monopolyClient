import React, {FC, useRef, useState} from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { createSessionId } from '../utils/createSessionId';
import playerState from '../store/PlayerState';
import sessionState from '../store/SessionState';
import '../style/registration.scss';

const Registration: FC = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const history = useHistory();
    const [validated, setValidated] = useState<boolean>(false);

    const createAsExpression = () => {
        const namePlayer = inputRef.current?.value;
        if (namePlayer) {
            const sessionId = createSessionId();
            sessionState.setSessionId(sessionId);
            playerState.setPlayer(namePlayer, sessionId);
            history.push(sessionId);
        }
        setValidated(true);
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
            <Button onClick={createAsExpression} variant="primary">
                Создать сессию
            </Button>
        </Form>
    </div>
}

export default Registration;