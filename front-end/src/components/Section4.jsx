import React from "react";
import "../styles/gallery_css.css";
import img1 from "../assets/vil3.jpg";
import img2 from "../assets/b3.jpg";
import img3 from "../assets/s5.jpg";
import img4 from "../assets/b4.jpeg";
import img5 from "../assets/2.jpg";
import img6 from "../assets/3.jpg";

export default function Section4() {
  const handleNextClick = () => {
    const lists = document.querySelectorAll(".item1");
    document.getElementById("slide1").appendChild(lists[0]);
  };

  const handlePrevClick = () => {
    const lists = document.querySelectorAll(".item1");
    const slide1 = document.getElementById("slide1");
    slide1.prepend(lists[lists.length - 1]);
  };
  return (
    <>
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
      <div className="container1">
        <div id="slide1">
          <div className="item1" style={{ backgroundImage: `url(${img1})` }}>
            <div className="content1">
              <div className="name1">Property Care</div>
              <div className="des1">
              Transforming Homes, Enriching Lives: Your Trusted Partner in Property Care. Discover Excellence in Maintenance with Property Care.
              </div>
              <button>See more</button>
            </div>
          </div>
          <div className="item1" style={{ backgroundImage: `url(${img2})` }}>
            <div className="content1">
            <div className="name1">Property Care</div>
              <div className="des1">
              Transforming Homes, Enriching Lives: Your Trusted Partner in Property Care. Discover Excellence in Maintenance with Property Care.
              </div>
              <button>See more</button>
            </div>
          </div>
          <div className="item1" style={{ backgroundImage: `url(${img3})` }}>
            <div className="content1">
            <div className="name1">Property Care</div>
              <div className="des1">
              Transforming Homes, Enriching Lives: Your Trusted Partner in Property Care. Discover Excellence in Maintenance with Property Care.
              </div>
              <button>See more</button>
            </div>
          </div>
          <div className="item1" style={{ backgroundImage: `${img4}` }}>
            <div className="content1">
            <div className="name1">Property Care</div>
              <div className="des1">
              Transforming Homes, Enriching Lives: Your Trusted Partner in Property Care. Discover Excellence in Maintenance with Property Care.
              </div>
              <button>See more</button>
            </div>
          </div>
          <div className="item1" style={{ backgroundImage: `url(${img5})` }}>
            <div className="content1">
            <div className="name1">Property Care</div>
              <div className="des1">
              Transforming Homes, Enriching Lives: Your Trusted Partner in Property Care. Discover Excellence in Maintenance with Property Care.
              </div>
              <button>See more</button>
            </div>
          </div>
          <div className="item1" style={{ backgroundImage: `url(${img6})` }}>
            <div className="content1">
            <div className="name1">Property Care</div>
              <div className="des1">
              Transforming Homes, Enriching Lives: Your Trusted Partner in Property Care. Discover Excellence in Maintenance with Property Care.
              </div>
              <button>See more</button>
            </div>
          </div>
        </div>
        <div className="buttons">
          <button id="prev" onClick={handlePrevClick}>
            <i className="fa-solid fa-angle-left" />
          </button>

          <button id="next" onClick={handleNextClick}>
            <i className="fa-solid fa-angle-right" />
          </button>
        </div>
      </div>
    </>
  );
}
