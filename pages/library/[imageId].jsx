/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ImageId = () => {
  const router = useRouter();
  const [resData, setResData] = useState({});
  const [imageSrc, setImageSrc] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetch(
        `https://images-api.nasa.gov/search?nasa_id=${router.query.imageId}`,
      );
      const results = await data.json();
      router.query.imageId && setResData(results.collection.items[0].data[0]);
      router.query.imageId &&
        setImageSrc(results.collection.items[0].links[0].href || '');
      setLoading(false);
    })();
  }, [router.query.imageId]);
  return (
    <>
      <div className="container">
        {loading && <h1>Loading</h1>}
        {loading || (
          <>
            <img className="image" src={imageSrc} alt="img" />
            <div>
              <h1 className="title">
                {resData.title || 'title does not exist'}
              </h1>
              <div className="date">
                {resData.date_created || 'date_created does not exist'}
              </div>
              <div className="des">
                {resData.description || 'description does not exist'}
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>
        {`
          .container {
            width: 80%;
            height: 100%;
            right: 0;
            left: 0;
            margin: auto;
            color: white;
            overflow: hidden;
            display: flex;
            .title {
              color: royalblue;
              margin: 4rem;
            }
            .des {
              font-size: 24px;
              margin: 4rem;
            }
            .date {
              font-size: 36px;
              margin: 4rem;
            }
            .image {
              width: 50rem;
              height: 50rem;
              display: inline;
              margin: 4rem;
            }
          }
        `}
      </style>
    </>
  );
};

export default ImageId;
