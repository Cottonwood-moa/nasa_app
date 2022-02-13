import Seo from '../components/Seo';
const About = () => {
  return (
    <div>
      <Seo title="About" />
      <div className="container">
        <h1 className="about">ABOUT</h1>
        <div className="thumb"></div>
        <div className="name">Cottonwood</div>
        <div className="mail">geon0529@gmail.com</div>
        <div className="blog">https://cottonwood-moa.tistory.com/</div>
        <div className="number">+82-10-2831-6735</div>
      </div>
      <style jsx>
        {`
          .container {
            width: 80%;
            height: auto;
            left: 0;
            right: 0;
            margin: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            color: white;
            div {
              margin: 1rem;
            }
            .about {
              font-size: 64px;
            }
            .thumb {
              outline: 10px solid royalblue;
              width: 20rem;
              height: 20rem;
              border-radius: 50%;
              background: url('https://media1.giphy.com/media/IU4z4sZ3BZ3zO/giphy.gif?cid=790b761156d61faf76f267d8c9870c038fbc7f2ad31776f6&rid=giphy.gif&ct=s')
                no-repeat center center white;
              background-size: 100% 100%;
            }
            .name {
              font-size: 48px;
            }
            .mail {
              font-size: 36px;
            }
            .blog {
              font-size: 36px;
            }
            .number {
              font-size: 36px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default About;
