import Document, { Head, Main, NextScript } from 'next/document'
import Navbar from '../src/components/navbar'

export default class MyDocument extends Document {
  static async getInitialProps ({ renderPage }) {
    const page = renderPage()
    return { ...page };
  }

  render () {
    return (
      <html>
        <Head>
				  <title>Snail</title>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"></link>
          <style>{`
            #__next { padding-top: 7em; }
            body, document { background-color: rgba(158, 158, 158, 0.11); }
            @-webkit-keyframes scale-up-center{0%{-webkit-transform:scale(.5);transform:scale(.5)}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes scale-up-center{0%{-webkit-transform:scale(.5);transform:scale(.5)}100%{-webkit-transform:scale(1);transform:scale(1)}}
            `}</style>
        </Head>
        <body>
          <Navbar />  
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}