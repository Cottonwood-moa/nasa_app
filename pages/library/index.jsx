import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import LibImg from '../../components/libImg';
import Seo from '../../components/Seo';
const Library = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [years, setYears] = useState([]);
  const [startYear, setStartYear] = useState('2020');
  const [endYear, setEndYear] = useState('2022');
  const [page, setPage] = useState(1);
  const [totalhits, setTotalhits] = useState();
  const [test, setTest] = useState(false);
  const router = useRouter();
  const getData = async () => {
    if (startYear > endYear) {
      alert('Start Year cannot be greater than End Year.');
      return;
    } else {
      setLoading(true);
      const data = await fetch(
        `https://images-api.nasa.gov/search?page=${page}&q=${searchQuery}&media_type=image&year_start=${startYear}&year_end=${endYear}`,
      );
      const {
        collection: {
          items,
          metadata: { total_hits },
        },
      } = await data.json();
      console.log(parseInt(total_hits / 100));
      setTotalhits(parseInt(total_hits / 100));
      setImages(items);
      setLoading(false);
    }
  };
  const onKeypress = async e => {
    if (e.key === 'Enter') {
      setPage(1);
      if (searchQuery === e.target.value) {
        await getData();
      } else {
        setSearchQuery(e.target.value);
      }
    }
  };
  const onClick = id => {
    router.push(`/library/${id}`);
  };
  useEffect(() => {
    if (test) {
      (async () => {
        await getData();
      })();
    }
    setTest(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, page]);
  useEffect(() => {
    const years = [];
    const thisYear = new Date().getFullYear();
    for (let i = thisYear; i >= 1985; i -= 1) {
      years.push(i);
    }
    setYears(years);
  }, []);

  return (
    <>
      <div className="container">
        <Seo title={'Library'} />
        <h1>
          <span>NASA</span> Image and Video Library
        </h1>
        <div className="info">
          You can check the huge number of photos provided by NASA, by keyword
          or by year. You can also see a description of the photo by clicking on
          it. Start Year&acute;s default value is 2020 and End Year&acute;s
          default value is 2022. All copyrights belong to NASA, and I just
          provide content using the API. It does not generate any revenue.
        </div>
        <div className="search">
          <input
            type="text"
            onKeyPress={e => onKeypress(e)}
            placeholder='Seacrh for... (e.g "Orion")'
          />
          <select
            name="start_year"
            onChange={e => setStartYear(e.target.value)}
          >
            <option value="2020">Start Year</option>
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select name="end_year" onChange={e => setEndYear(e.target.value)}>
            <option value="2022">End Year</option>
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="images">
          {loading && <div className="loading">Loading</div>}
          {loading ||
            images.map((image, index) => {
              return (
                <LibImg
                  key={index}
                  src={image.links[0].href}
                  imgId={image.data[0].nasa_id}
                  clickEvent={onClick}
                />
              );
            })}
        </div>
        <div className="pagination">
          <span
            className="arrow"
            onClick={() => {
              if (page === 1) {
                return;
              } else {
                setPage(page - 1);
              }
            }}
          >
            Prev
          </span>
          <span className="page">{page}</span>
          <span
            className="arrow"
            onClick={() => {
              if (page <= totalhits) {
                window.scrollTo(0, 0);
                setPage(page + 1);
              } else {
                return;
              }
            }}
          >
            Next
          </span>
        </div>
      </div>

      <style jsx>
        {`
          .container {
            width: 80%;
            height: 100%;
            min-height: 1200px;
            background-color: #333;
            right: 0;
            left: 0;
            margin: auto;
            display: flex;
            flex-wrap: wrap;
            color: white;
            h1 {
              span {
                font-size: 56px;
                color: royalblue;
              }
            }
            .info {
              font-size: 24px;
              margin-bottom: 2rem;
            }
            .search {
              width: 100%;
              display: flex;
              justify-content: space-evenly;
              input {
                width: 60%;
                height: 4rem;
                font-size: 36px;
                &:focus {
                  outline: 5px royalblue solid;
                }
              }
              select {
                width: 15%;
                height: 4rem;
                font-size: 24px;
                color: #888;
                &:focus {
                  outline: 5px royalblue solid;
                }
              }
            }
            .loading {
              width: 100%;
              font-size: 56px;
              text-align: center;
              margin-top: 5rem;
            }
            .images {
              width: 100%;
              height: auto;
              background-color: #444;
              min-height: 800px;
              border-radius: 10px;
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              margin-top: 2rem;
            }
            .pagination {
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 36px;
              .page {
                font-size: 64px;
                color: royalblue;
              }
              .arrow {
                cursor: pointer;
                margin: 0 2rem 0 2rem;
              }
            }
          }
        `}
      </style>
    </>
  );
};

export default Library;
