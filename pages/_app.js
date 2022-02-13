import Layout from '../components/Layout';
export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <style jsx global>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Nanum+Brush+Script&display=swap');
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: 'Do Hyeon', sans-serif;
            background-color: #333;
            overflow-x: hidden;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          * {
            box-sizing: border-box;
          }
        `}
      </style>
    </>
  );
}
