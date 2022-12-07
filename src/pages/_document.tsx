import Document, { Head, Html, Main, NextScript } from 'next/document';
class MyDocument extends Document {
	// Only uncomment if you need to customize this behaviour
	// static async getInitialProps(ctx: DocumentContext) {
	//   const initialProps = await Document.getInitialProps(ctx)
	//   return {...initialProps}
	// }
	render() {
		return (
			<Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500;900&display=swap" rel="stylesheet" />
        </Head>
        <body >
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
