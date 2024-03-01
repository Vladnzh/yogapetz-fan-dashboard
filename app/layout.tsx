import { Providers } from '@/app/providers';
import '@/public/styles/globals.css';
import { Nunito_Sans } from 'next/font/google'
const nunitoFont = Nunito_Sans({preload: false})

export default function RootLayout(props: React.PropsWithChildren) {
   return (
      <Providers>
         <html lang='en'>
         <body>
         <section>
            <main className={nunitoFont.className}>{props.children}</main>
         </section>
         </body>
         </html>
      </Providers>
   );
}
