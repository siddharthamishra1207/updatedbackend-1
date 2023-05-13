import React, { useState, useEffect } from "react";
import "./gig.scss";
import ReactSimplyCarousel from "react-simply-carousel";
import newRequest from "../../utils/newRequest";
export const Gig = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [data, setData] = useState([]);
  const [user,setUser]=useState('');
  const [gig,setgig]=useState('');
  useEffect(() => {
    const url = new URL(window.location.href);
    const queryParams = url.searchParams;
    let id = queryParams.get("id")
    console.log(id)
    fetch('http://34.131.221.158:8800/api/gigs/single?id=' + id)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data)
        setgig(data.title)
      })
      .catch(error => {
        console.error(error);
      });

      const currentUser=JSON.parse((localStorage.getItem("currentUser")));
      setUser(currentUser.username)
  }, [])

  const handlePayment = async () => {
    const response = await fetch('http://34.131.221.158:8800/api/payment/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: parseInt(data.revenue), // The amount to be charged in paisa
        currency: 'INR', // The currency code
        payment_capture: 1, // Whether to capture the payment immediately
      }),
    });
    const { order_id } = await response.json();
    const options = {
      key: 'rzp_test_IG7UyFkck9IH0W',
      amount: parseInt(data.revenue) * 100, // The amount to be charged in paisa
      currency: 'INR', // The currency code
      name: 'beCreator', // The name of your company
      description: 'Payment for your order', // The description of the payment
      order_id, // The ID of the order returned by the server
      handler: function (response) {
        console.log('Payment successful!', response);
        newRequest.post("/gigs/update", {
          title:gig,
          username:user
        });
      },
      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '9999999999',
      }, // The default values for the user's name, email, and contact number
      notes: {
        address: 'Razorpay Corporate Office',
      }, // Additional information to be sent to Razorpay
      theme: {
        color: '#F37254', // The color of the payment button
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };
  return (
    <div className="gig">
      <div className="container">
        <div className="left">
          <span className="breadcrumbs">{data.title}</span>
          <h1>{data.desc}</h1>
          <div className="user">
            <img
              className="pp"
              src={data.cover}
              alt=""
            />
            <span>{data.title}</span>
            {/* <div className="stars">
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <span>5</span>
            </div> */}
          </div>

          <h2>About This Creator Fund</h2>
          <p>
            {data.desc}
          </p>
          <div className="seller">
            <h2>About The Creator</h2>
            <div className="user">
              <img
                src={data.cover}
                alt=""
              />
              <div className="info">
                <span>{data.title}</span>
                {/* <div className="stars">
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <span>5</span>
                </div> */}
                {/* <button>Contact Me</button> */}
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">USA</span>
                </div>
                <div className="item">
                  <span className="title">Vesting Time</span>
                  <span className="desc">{data.vestingTime}</span>
                </div>
                <div className="item">
                  <span className="title">Avg. Monthly Revenue</span>
                  <span className="desc">{data.revenue}</span>
                </div>
                {/* <div className="item">
                  <span className="title"></span>
                  <span className="desc">1 day</span>
                </div> */}
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
              <p>
                {data.desc}
              </p>
            </div>
          </div>


          {/* <div className="reviews">
            <h2>Reviews</h2>
            <div className="item">
              <div className="user">
                <img
                  className="pp"
                  src="https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <div className="info">
                  <span>Garner David</span>
                  <div className="country">
                    <img
                      src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                      alt=""
                    />
                    <span>United States</span>
                  </div>
                </div>
              </div>
              <div className="stars">
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <span>5</span>
              </div>
              <p>
                I just want to say that art_with_ai was the first, and after
                this, the only artist Ill be using on Fiverr. Communication was
                amazing, each and every day he sent me images that I was free to
                request changes to. They listened, understood, and delivered
                above and beyond my expectations. I absolutely recommend this
                gig, and know already that Ill be using it again very very soon
              </p>
              <div className="helpful">
                <span>Helpful?</span>
                <img src="/img/like.png" alt="" />
                <span>Yes</span>
                <img src="/img/dislike.png" alt="" />
                <span>No</span>
              </div>
            </div>
            <hr />
            <div className="item">
              <div className="user">
                <img
                  className="pp"
                  src="https://images.pexels.com/photos/4124367/pexels-photo-4124367.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <div className="info">
                  <span>Sidney Owen</span>
                  <div className="country">
                    <img
                      src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1ea.png"
                      alt=""
                    />
                    <span>Germany</span>
                  </div>
                </div>
              </div>
              <div className="stars">
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <span>5</span>
              </div>
              <p>
                The designer took my photo for my book cover to the next level!
                Professionalism and ease of working with designer along with
                punctuality is above industry standards!! Whatever your project
                is, you need this designer!
              </p>
              <div className="helpful">
                <span>Helpful?</span>
                <img src="/img/like.png" alt="" />
                <span>Yes</span>
                <img src="/img/dislike.png" alt="" />
                <span>No</span>
              </div>
            </div>
            <hr />
            <div className="item">
              <div className="user">
                <img
                  className="pp"
                  src="https://images.pexels.com/photos/842980/pexels-photo-842980.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <div className="info">
                  <span>Lyle Giles </span>
                  <div className="country">
                    <img
                      src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                      alt=""
                    />
                    <span>United States</span>
                  </div>
                </div>
              </div>
              <div className="stars">
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <span>5</span>
              </div>
              <p>
                Amazing work! Communication was
                amazing, each and every day he sent me images that I was free to
                request changes to. They listened, understood, and delivered
                above and beyond my expectations. I absolutely recommend this
                gig, and know already that Ill be using it again very very soon
              </p>
              <div className="helpful">
                <span>Helpful?</span>
                <img src="/img/like.png" alt="" />
                <span>Yes</span>
                <img src="/img/dislike.png" alt="" />
                <span>No</span>
              </div>
            </div>
          </div> */}
        </div>
        <div className="right">
          <div className="price">
            <h3>Funds raising</h3>
            <h2>Rs{data.revenue}</h2>
          </div>
          <p>
            {data.shortDesc}
          </p>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="" />
              <span>2 Months Vesting</span>
            </div>
            <div className="item">
              <img src="/img/recycle.png" alt="" />
              <span>3 Revisions</span>
            </div>
          </div>
          <div className="features">
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Fast</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Reliable</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Image upscaling</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Secure</span>
            </div>
          </div>
          <button onClick={handlePayment} >Continue</button>
        </div>
      </div>
    </div>
  );
}

