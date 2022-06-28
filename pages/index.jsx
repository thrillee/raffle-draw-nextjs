import Head from 'next/head'

// import ManualHeader from "../components/ManualHeader"
import Header from '../components/Header'
import LotteryEntrance from "../components/LotteryEntrance"

export default function Home() {
  return (
    <div >
      <Head>
        <title>Thrillee Smart Contract Lottery</title>
        <meta name="description" content="Thrillee Smart contract lottery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <ManualHeader /> */}
      <Header />
      <LotteryEntrance />
    </div>
  )
}
