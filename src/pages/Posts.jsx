import { useEffect, useState } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Posts.css';

const Posts = () => {
  const [state, setState] = useState({
    posts: [],
    loading: false,
  });
  // const datas = JSON.stringify(state.posts);

  const performAPICall = async () => {
    // console.log(url);

    setState(preState => ({
      ...preState,
      loading: true,
    }));
    await fetch('https://a0329568-71ba-47b1-b1af-8da6856391c7.mock.pstmn.io/posts')
      .then(res => res.json())
      .then(response => {
        console.log(response.posts);
        setState(() => ({
          posts: response.posts,
          loading: false,
        }));
      })
      .catch(error => {
        console.log(error);
        alert('some error occured');
        setState(preState => ({
          ...preState,
          loading: false,
        }));
      });

    // await fetch('./Fakedata.js')

    //       .then(function(response){
    //         console.log(response)

    //       })
    //       .then(function(myJson) {
    //         console.log(myJson);
    //       });

    //         fetch("https://a0329568-71ba-47b1-b1af-8da6856391c7.mock.pstmn.io/posts")
    // .then(res => res.json())
    // .then(data => console.log(data))
    // .catch(error=>console.log(error))

    // console.log(state.videos);
    // console.log(state.loading);
  };

  useEffect(() => {
    performAPICall();
  }, []);

  return (
    <div>
      <h2>POSTS</h2>
      <div className="row">
        {state.posts.map(data => (
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="tile" id="singapore">
              <div className="tile-text">
                <img alt="cover" className="tile img  img-responsive" src={data.image} />
                <div className="author">
                  <h4>
                    {data.firstName} {data.lastName}
                  </h4>
                  <img alt="author" className="avatar" src={data.avatar} />
                </div>
                <p>{data.writeup}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
