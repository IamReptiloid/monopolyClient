import React, {FC} from 'react';

interface IProps {
    dice: [number, number]
}

const Dice: FC<IProps> = ({dice}) => {
    console.log(dice)
    return (
    <div className='dice'>
        <section className={`cube cube_${dice[0]}`} style={{marginRight: '100px'}}>
            <article className="back">
                <img src='/assets/SixDOT.png' alt="" />
            </article>
            <article className="top">
                <img src='/assets/FourDOTS.png' alt=""/>
            </article>
            <article className="front">
                <img src='/assets/OneDOT.png' alt=""/>
            </article>
            <article className="bottom">
                <img src='/assets/ThreeDOT.png' alt=""/>
            </article>
            <article className="left">
                <img src='/assets/FiveDOT.png' alt=""/>
            </article>
            <article className="right">
                <img src='/assets/TwoDOT.png' alt=""/>
            </article>
        </section>    
        <section className={`cube cube_${dice[1]}`} style={{marginLeft: '165px'}}>
            <article className="back">
                <img src='/assets/SixDOT.png' alt=""/>
            </article>
            <article className="top">
                <img src='/assets/FourDOTS.png' alt=""/>
            </article>
            <article className="front">
                <img src='/assets/OneDOT.png' alt=""/>
            </article>
            <article className="bottom">
                <img src='/assets/ThreeDOT.png' alt=""/>
            </article>
            <article className="left">
                <img src='/assets/FiveDOT.png' alt=""/>
            </article>
            <article className="right">
                <img src='/assets/TwoDOT.png' alt=""/>
            </article>
        </section>  
    </div>
  );
}

export default Dice;