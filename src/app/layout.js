import { Inter, Inria_Sans } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./globals.css";
import { Header } from "@components/Header";
import { Footer } from "@components/Footer";


const inter = Inter({ subsets: ["latin"] });
const inria = Inria_Sans({ subsets: ["latin"], weight: ["300","400","700"] });

export const metadata = {
  title: "Media Eye News - Latest News & Updates",
  description: "Get the latest news from around the world. Stay informed with breaking stories, analysis, and insights at MediaEye News.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body  className={`${inter.className} ${inria.className}`}>
         <Header />
        <main>
          {children}
        </main>
        <Footer />

        {/* AdPlugg Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(ac) {
                var d = document, s = 'script', id = 'adplugg-adjs';
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id; js.async = 1;
                js.src = '//www.adplugg.com/serve/' + ac + '/js/1.1/ad.js';
                fjs.parentNode.insertBefore(js, fjs);
              }('A48224134'));
            `,
          }}
        />
      </body>
    </html>
  );
}
