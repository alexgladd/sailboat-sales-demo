import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="min-h-screen bg-gradient-to-b from-white to-yellow-100 text-gray-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
