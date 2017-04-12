import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const page = renderPage()
	return { ...page };
  }

  render () {
    return (
     <html>
       <Head>
         <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"></link>
       </Head>
       <body>
         <Main />
         <NextScript />
       </body>
     </html>
    )
  }
}