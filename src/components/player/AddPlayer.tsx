import React, { useState, useRef, FC, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import sessionState from '../../store/SessionState';
import playerState from '../../store/PlayerState';
import { sendAddPlayer } from '../../backend';
import './addPlayer.scss';
import { observer } from 'mobx-react-lite';
import { getColour } from '../../utils/getColour';


const AddPlayer: FC = observer(() => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [show, setShow] = useState(playerState.isAdd);
    const [validated, setValidated] = useState<boolean>(false);

	useEffect(() => {
		setShow(playerState.isAdd)
	})

  const handleClose = () => {
      const playerName = inputRef.current?.value;
      const idUniq = !playerState.players.find(el => el.name === playerName)
      if (playerName && idUniq) { // todo
          sendAddPlayer({
              sessionId: sessionState.sessionId,
              playerName,
              colour: getColour(playerState.players)
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
                        Поле обязательно и должно быть уникально
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
})

export default AddPlayer;