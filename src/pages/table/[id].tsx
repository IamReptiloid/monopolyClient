import { getCard } from "../../backend";
import Monopoly from "../../components/Monopoly";
import { ICardData } from "../../interface";

export default function({cardData}: {cardData: ICardData}) {
    return <div className="app">
        <Monopoly cardData={cardData}/>
    </div>
}

export async function getServerSideProps() {
    const cardData: ICardData = await getCard();
    return {
      props: { cardData },
    }
  }