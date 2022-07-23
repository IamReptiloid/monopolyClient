import React, {FC} from 'react';
import './dice.scss'

interface IProps {
    dice: [number, number]
}

const Dice: FC<IProps> = ({dice}) => {
    return (
    <div className='dice'>
        <section className="cube" style={{marginRight: '100px'}}>
            <article className="back">
                <img src={require('../../assets/SixDOT.png')} alt="" />
            </article>
            <article className="top">
                <img src={require('../../assets/FourDOTS.png')} alt=""/>
            </article>
            <article className="front">
                <img src={require('../../assets/OneDOT.png')} alt=""/>
            </article>
            <article className="bottom">
                <img src={require('../../assets/ThreeDOT.png')} alt=""/>
            </article>
            <article className="left">
                <img src={require('../../assets/FiveDOT.png')} alt=""/>
            </article>
            <article className="right">
                <img src={require('../../assets/TwoDOT.png')} alt=""/>
            </article>
        </section>    
        <section className="cube cube_4" style={{marginLeft: '165px'}}>
            <article className="back">
                <img src={require('../../assets/SixDOT.png')} alt=""/>
            </article>
            <article className="top">
                <img src={require('../../assets/FourDOTS.png')} alt=""/>
            </article>
            <article className="front">
                <img src={require('../../assets/OneDOT.png')} alt=""/>
            </article>
            <article className="bottom">
                <img src={require('../../assets/ThreeDOT.png')} alt=""/>
            </article>
            <article className="left">
                <img src={require('../../assets/FiveDOT.png')} alt=""/>
            </article>
            <article className="right">
                <img src={require('../../assets/TwoDOT.png')} alt=""/>
            </article>
        </section>  
    </div>
  );
}

export default Dice;