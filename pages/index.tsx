import Head from 'next/head'
import { Inter } from '@next/font/google'
import Nav from '../src/components/commons/Nav'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>To do List App</title>
        <meta name="description" content="your memories in one place" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Nav />
      </main>
    </>
  )
}
