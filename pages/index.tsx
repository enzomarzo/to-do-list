import Head from 'next/head'
import { Montserrat } from '@next/font/google'

import Menu from '../src/components/commons/Menu'
import Note from '../src/components/commons/Note'
import useNotes, { IUseNotes } from '../src/hooks/useNotes'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function Home() {
  const noteActions = useNotes()
  return (
    <>
      <Head>
        <title>To do List App</title>
        <meta name="description" content="your memories in one place" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={montserrat.className}>
        <Menu noteActions={noteActions} />
        <Note noteActions={noteActions} />
      </main>
    </>
  )
}
