/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

const LibImg = ({ src, imgId, clickEvent }) => {
  const [loading, setLoading] = useState(true);
  return (
    <div className="img">
      {loading && <div className="loading"></div>}
      <img
        src={src}
        alt="image"
        loading="lazy"
        className="nasaImg"
        onClick={() => clickEvent(imgId)}
        onLoad={() => setLoading(false)}
      />
      <style jsx>
        {`
          .img {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
          }
          .loading {
            position: absolute;
            width: 3em;
            height: 3em;
            background-color: transparent;
            border-radius: 50%;
            border: 5px solid white;
            border-top: 5px solid royalblue;
            animation: spinner 1s infinite linear;
            z-index: 2;
          }
          .nasaImg {
            width: 12rem;
            height: 12rem;
            margin: 10px;
            border-right: 5px solid black;
            border-bottom: 5px solid black;
            cursor: pointer;
            &:hover {
              border: none;
              outline: 5px solid royalblue;
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
    </div>
  );
};

export default LibImg;
