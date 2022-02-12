import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document'
import React from 'react'

import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />),
    );

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags };
  }

  render() {
    return (
      <Html lang="pt-BR">
        <Head >
          {(this.props as any).styleTags}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}


// import Document, {
//   DocumentContext,
//   Head,
//   Html,
//   Main,
//   NextScript
// } from 'next/document'
// import React from 'react'

// import { ServerStyleSheet } from 'styled-components'
// import { TConfig } from 'types/config'

// export default class MyDocument extends Document {
//   static async getInitialProps(ctx: DocumentContext) {
//     const sheet = new ServerStyleSheet()
//     const originalRenderPage = ctx.renderPage

//     try {
//       ctx.renderPage = () =>
//         originalRenderPage({
//           enhanceApp: (App) => (props) =>
//             sheet.collectStyles(<App {...props} />)
//         })

//       const initialProps = await Document.getInitialProps(ctx)
//       return {
//         ...initialProps,
//         styles: (
//           <>
//             {initialProps.styles}
//             {sheet.getStyleElement()}
//           </>
//         )
//       }
//     } finally {
//       sheet.seal()
//     }
//   }

//   render() {
//     return (
//       <Html lang="pt-BR">
//         <Head>
//           <link rel="preconnect" href="https://ingresso-a.akamaihd.net/" />
//           <link
//             href={`https://ingresso-a.akamaihd.net/sitenovo-2017/checkout/css/reset.css`}
//             rel="stylesheet"
//           />
//           <link
//             rel="icon"
//             type="image/png"
//             href="https://ingresso-a.akamaihd.net/sitenovo-2017/comum/img/favicon-32x32.png"
//           />
//           <link
//             rel="shortcut icon"
//             type="image/x-icon"
//             href="https://ingresso-a.akamaihd.net/sitenovo-2017/comum/img/favicon-32x32.ico"
//           />
//         </Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     )
//   }
// }
