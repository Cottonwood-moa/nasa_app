import Seo from '../components/Seo';
const Custom404 = () => {
  return (
    <div className="container">
      <Seo title="404" />
      <div className="notfound">404 NotFound</div>
      <div className="wty">What are you doing here?</div>
      <style jsx>
        {`
          .container {
            width: 80%;
            height: calc(100vh - 5rem);
            background-color: #333;
            color: white;
            left: 0;
            right: 0;
            margin: auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .notfound {
              font-size: 56px;
            }
            .wty {
              font-size: 48px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Custom404;
