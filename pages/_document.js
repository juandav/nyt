import Document, { 
  Html, 
  Head, 
  Main, 
  NextScript 
} from 'next/document'
import './_pages.less'

class NYTDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/x-icon" href="/static/img/nyt.ico" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
          {/*<style jsx global>{`
            *, ::before, ::after {
              box-sizing: content-box;
            }
          `}</style>*/}
        </body>
      </Html>
    )
  }
}

export default NYTDocument