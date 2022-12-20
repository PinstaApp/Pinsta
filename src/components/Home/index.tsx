import MetaTags from '@components/Common/MetaTags'
import Curated from '@components/Home/Curated'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <>
      <MetaTags />
      <Curated />
    </>
  )
}

export default Home