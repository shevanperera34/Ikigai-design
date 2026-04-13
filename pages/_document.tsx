import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="The Ikigai Project is a human-first digital studio building brand systems, intelligent web infrastructure, and growth architecture."
        />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.theikigaiproject.com/" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />

        <title>The Ikigai Project | Brand, Web & Growth</title>

        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js");' }} />

        <style>{`
          .js .seo-fallback { display: none; }
          .seo-fallback {
            font-family: Outfit, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
            line-height: 1.6;
            max-width: 960px;
            margin: 32px auto;
            padding: 0 16px;
            color: #111;
          }
          .seo-fallback h1 { font-size: 28px; margin: 0 0 12px; }
          .seo-fallback p { margin: 0 0 12px; }
          .seo-fallback ul { margin: 0 0 12px; padding-left: 18px; }
        `}</style>

        <script
          defer
          data-domain="theikigaiproject.com"
          data-api="https://plausible.io/api/event"
          src="https://plausible.io/js/script.js"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '5146881882202550');
              fbq('track', 'PageView');
            `,
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window._linkedin_partner_id = "8410546";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(window._linkedin_partner_id);
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(l) {
                if (!l) {
                  window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                  window.lintrk.q=[];
                }
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript";
                b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);
              })(window.lintrk);
            `,
          }}
        />
      </Head>
      <body>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=5146881882202550&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=8410546&fmt=gif"
          />
        </noscript>

        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
