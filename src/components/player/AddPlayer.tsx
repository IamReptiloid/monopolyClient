import React, { useState, useRef, FC } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import sessionState from '../../store/SessionState';
import playerState from '../../store/PlayerState';
import { sendAddPlayer } from '../../backend';
import './addPlayer.scss';


const AddPlayer: FC = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [show, setShow] = useState(true);
    const [validated, setValidated] = useState<boolean>(false);

    const handleClose = () => {
        const playerName = inputRef.current?.value;
        if (playerName) { // todo
            sendAddPlayer({
                sessionId: sessionState.sessionId,
                playerName,
                colour: "red"
            });
            playerState.setNewName(playerName, sessionState.sessionId);
            setShow(false);
        } else {
            setValidated(true);
        }
    };

    return (
        <>
          <Modal show={show}>
            <Modal.Header>
              <Modal.Title>Присоединиться к игре</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Имя игрока</Form.Label>
                    <Form.Control isInvalid={validated} as="input" ref={inputRef} placeholder="Введите имя" />
                    <Form.Control.Feedback type="invalid">
                        Обязательное поле
                    </Form.Control.Feedback>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                Сохранить
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default AddPlayer;