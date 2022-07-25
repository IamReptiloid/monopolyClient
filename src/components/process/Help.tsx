import { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import HelpSlider from "./HelpSlider";

const Help = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
    <>
      <Button variant="secondary" onClick={handleShow} className="me-2">
        Обучение
      </Button>
      <Offcanvas show={show} onHide={handleClose} style={{width: '40vw', minWidth: '375px'}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Обучение</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <HelpSlider/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
    )
}

export default Help