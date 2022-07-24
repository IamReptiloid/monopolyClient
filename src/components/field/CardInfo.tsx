import React, {FC, useEffect, useRef} from 'react';
import { colourStreet } from '../../const/clour';
import { ICardInfoResponse } from '../../interface';
import Button from 'react-bootstrap/Button';
import sessionState from '../../store/SessionState';
import playerState from '../../store/PlayerState';
import { getCollection } from '../../utils/getCollection';
import fieldState from '../../store/FieldState';
import { sendSellCard, sendUpdateCad } from '../../backend';
import { observer } from 'mobx-react-lite';

interface IProps {
    isTop: boolean,
    isBottom: boolean,
    isLeft: boolean,
    isRight: boolean,
    cardId: number,
    cardLevel: number,
    data: ICardInfoResponse | null,
    setInfo: (bool: boolean) => void
}

const CardInfo: FC<IProps> = observer((props) => {
    const ref = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        const handle = (e: any) => {
            if(!ref.current) return;
            if(!ref.current.contains(e.target)) {
                props.setInfo(false);
            }
        };

        document.addEventListener('click', handle);

        return () => {
            document.removeEventListener('click', handle)
        }
    }, [])

    if(!props.data) {
        return(<></>)
    }

    function getSpan(numb: number) {
        if(numb === 0) {
            return <span>Базовая рента</span>
        } else if(numb === 5) {
            return <span className='megaStar'>★</span>
        } else {
            return <span>{'★'.repeat(numb)}</span>
        }
    }

    function isDisabled() {
        if(props.data && props.data.star_price && playerState.player) {
            const collection = getCollection(props.data.collectionNumber);
            const isOwner = collection.every(el => playerState.playerName === fieldState.cardStates[el].ownerName)
            const level = collection.map(el => fieldState.cardStates[el].level);
            const isMinLevel = Math.min(...level) === props.cardLevel;
            return props.data.star_price >= playerState.player.balance || !isOwner || !isMinLevel;
        }
        return true;
    }

    function sell() {
        if(playerState.playerName) {
            sendSellCard(sessionState.sessionId, playerState.playerName, props.cardId)
        }
    }

    function update() {
        if(playerState.playerName) {
            sendUpdateCad(sessionState.sessionId, playerState.playerName, props.cardId)
        }
    }

    function isChange() {
        if(props.data) {
            return (
                sessionState.currentPlayer === playerState.playerName 
                && playerState.playerName === fieldState.cardStates[props.cardId].ownerName 
                && props.data.star_price 
                && playerState.player
            )
        }
        return false;
    }

    return(
        <div 
        className='cardInfo' 
        ref={ref}
        style={{
            right: props.isRight? '65px': null || props.isBottom? '100px': '',
            transform: props.isBottom || props.isTop? 'rotate(270deg)': '',
            left: props.isTop? '100px': null || props.isLeft? '65px' : ''
        }}>
            <div 
                className='cardInfo__header' 
                style={{
                    backgroundColor: colourStreet[props.data.collectionNumber - 1],
                }}
            >
                <div className="cardInfo__title">
                    {props.data.title}
                </div>
                <div className="cardInfo__sphere">
                    {props.data.sphere}
                </div>
            </div>
            <div className="cardInfo__description">
                Стройте, чтобы увеличивать ренту
            </div>
            <div className="cardInfo__rent">
                {props.data.fines.map((el, i) => {
                    return <div className='cardInfo__start'>
                        {getSpan(i)}
                        {el}K
                    </div>
                })}
            </div>
            <div className="cardInfo__info" style={{marginTop: !isChange()? '5px':'0px'}}>
                <div>Продать поле</div>
                <div>{props.data.sale_price}K</div>
            </div>
            <div className="cardInfo__info">
                <div>Стоимость поля</div>
                <div>{props.data.price}K</div>
            </div>
            <div className="cardInfo__info">
                <div>Стоимость филиала</div>
                <div>{props.data.star_price}K</div>
            </div>
            {isChange()
                ?<div className="cardInfo__buttons">
                    <Button 
                        disabled={isDisabled()} 
                        style={{
                            width: '50px', 
                            height: '10px', 
                            fontSize: '8px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center'
                        }} 
                        onClick={update}
                        variant="success"
                    >Улучшить</Button>
                    <Button 
                        style={{
                            width: '50px', 
                            height: '10px', 
                            fontSize: '8px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center'
                        }} 
                        onClick={sell}
                        variant="danger"
                    >Продать</Button>
                </div>
                :''
            }
        </div>
    )
})

export default CardInfo;