/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import GetAPOD from '../service/getAPOD';
import Seo from '../components/Seo';
const getAPOD = new GetAPOD();
const Index = () => {
  const [results, setResults] = useState({});
  const [date, setDate] = useState('');
  const [dateNow, setDateNow] = useState('');
  const [loading, setLoading] = useState(true);
  const [imgLoading, setImgLoading] = useState(false);
  // Get current date as 2 digit format
  useEffect(() => {
    (() => {
      const dt = new Date();
      const thisYear = dt.getFullYear();
      const thisMonth = (dt.getMonth() + 1).toString().padStart(2, '0');
      const thisDay = dt.getDate().toString().padStart(2, '0');
      const date = `${thisYear}-${thisMonth}-${thisDay - 1}`;
      setDateNow(date);
      setDate(date);
    })();
  }, []);
  // Get APOD
  useEffect(() => {
    (async () => {
      setImgLoading(true);
      setLoading(true);
      const res = await getAPOD.getOneday(date);
      setResults(res);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);
  return (
    <>
      <Seo title={'APOD'} />
      <div className="container">
        <>
          <div className="info">
            <h1>APOD: Astronomy Picture of the Day</h1> You can see the photos
            or videos that Nasa posts every day. Check the description of the
            photo, and also check the previous data. All copyrights belong to
            NASA, and I just provide content using the API. It does not generate
            any revenue.
          </div>
          {loading && <div className="loading">Loading</div>}

          {results.msg || loading || (
            <div className="result">
              <>
                <input
                  id="date"
                  type="date"
                  min="1995-06-17"
                  max={dateNow}
                  value={date}
                  onChange={e => {
                    setDate(e.currentTarget.value);
                  }}
                />
                <div className="title">{results.title}</div>
                {results.media_type === 'image' && (
                  <div className="img">
                    {imgLoading && <div className="imgLoading"></div>}
                    <img
                      src={results.url}
                      alt="img"
                      onLoad={() => setImgLoading(false)}
                    />
                  </div>
                )}
                {results.media_type === 'video' && (
                  <iframe className="iframe" src={results.url}></iframe>
                )}

                <div className="explanation">{results.explanation}</div>
              </>
            </div>
          )}
        </>
      </div>
      {/* style */}
      <style jsx>
        {`
          .loading {
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 56px;
          }
          .container {
            width: 80%;
            height: 100%;
            left: 0;
            right: 0;
            margin: auto;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .info {
              font-size: 24px;
              h1 {
                color: royalblue;
              }
            }
            input {
              margin-top: 2rem;
              font-size: 18px;
              padding: 10px;
              border-radius: 10px;
              outline: none;
              box-shadow: none;
              box-sizing: border-box;
              appearance: none;
              &:focus {
                outline: none;
              }
            }
            .result {
              font-size: 24px;
              .title {
                margin-top: 1rem;
                margin-bottom: 2rem;
                font-size: 56px;
                color: royalblue;
              }
              .img {
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                  width: 100%;
                  height: auto;
                  margin-bottom: 2rem;
                }
                .imgLoading {
                  position: absolute;
                  width: 5em;
                  height: 5em;
                  background-color: transparent;
                  border-radius: 50%;
                  border: 10px solid white;
                  border-top: 10px solid royalblue;
                  animation: spinner 1s infinite linear;
                  z-index: 2;
                }
              }
              .iframe {
                width: 100%;
                height: 80vh;
                margin-bottom: 2rem;
              }
              .explanation {
                margin-bottom: 5rem;
              }
            }
          }
          @keyframes spinner {
            0% {
              transform: rotate(0);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </>
  );
};
export default Index;
