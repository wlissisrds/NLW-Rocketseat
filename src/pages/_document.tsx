
//criando a parte HTML do next
import Document, { Html, Head, Main, NextScript } from "next/document";

//extend o Document que é onde fica os conteudos html do next
export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2? family = Lexend: wght @ 500 & display = swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }

}