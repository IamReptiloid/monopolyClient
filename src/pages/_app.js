import '../style/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../components/process/dice.scss'
import '../components/process/process.scss'
import '../components/player/addPlayer.scss'
import '../components/player/playerCards.scss'
import '../components/player/playerCard.scss'
import '../components/player/token.scss'
import '../components/field/cardInfo.scss'
import '../components/field/field.scss'
import '../components/field/rectangularCard.scss'
import '../components/field/squareCard.scss'
import '../components/chat/chat.scss'
import 'simplebar-react/dist/simplebar.min.css';
import '../components/Monopoly.module.scss'
import '../components/Registration.module.scss'

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}