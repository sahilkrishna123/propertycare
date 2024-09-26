import React from "react";

function Footer() {
  return (
    <footer>
      <div className="footer" >
        <div className="container-fluid custom_footer" style={{backgroundColor:"rgb(19 67 162)"}}>
          <div className="row footer_row_1">
            <center>
              <h3>
                <br />
                SUBSCRIBE TO OUR NEWSLETTER
              </h3>
            </center>
            <form className="newsletter">
              <div className="row">
                <div className="col-lg-8 col-md-8 col-sm-12 form_div_1">
                  <input
                    className="form-control footer_input"
                    placeholder="Your Email Address"
                    name="email"
                    type="email"
                  />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 form_div_2">
                  <button className="btn footer-btn" type="submit">
                    SUBSCRIBE
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="row footer_row_2 " style={{marginTop:"-80px"}}>
            <div className="col-lg-3">
              <h4 className="text-center">Company</h4>
              <ul>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Help &amp; Support</a>
                </li>
                <li>
                  <a href="#">Advertise on Property Care</a>
                </li>
                <li>
                  <a href="#">Terms of Use</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3">
              <h4 className="text-center">Connect</h4>
              <ul>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">News</a>
                </li>
                <li>
                  <a href="#">Forum</a>
                </li>
                <li>
                  <a href="#">Real Estate Agents</a>
                </li>
                <li>
                  <a href="#">Add Property</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3">
              <h4 className="text-center">Head Office</h4>
              <ul>
                <li>
                  <p>
                    <i className="fa-solid fa-location-dot" />
                    Pearl One, 94-B/I, MM Alam Road,
                    <br />
                    Gulberg III, Lahore, Pakistan
                  </p>
                </li>
                <li>
                  <p>
                    <i className="fas fa-phone " />
                    <a className="cell" href="tel:+92-3231993780">
                      {" "}
                      &nbsp;+92 3231993780
                    </a>
                    <br />
                    Monday To Sunday 9AM To 6PM
                  </p>
                </li>
              </ul>
            </div>
            <div className="col-lg-3">
              <h4 className="text-center">Follow Us</h4>
              <ul>
                <li>
                  <i className="fa-brands fa-facebook" />
                  <a href="#"> Facebook</a>
                </li>
                <li>
                  <i className="fa-brands fa-instagram" />
                  <a href="#"> Instagram</a>
                </li>
                <li>
                  <i className="fa-brands fa-linkedin" />
                  <a href="#"> LinkedIn</a>
                </li>
                <li>
                  <i className="fa-brands fa-twitter" />
                  <a href="#"> Twitter</a>
                </li>
                <li>
                  <i className="fa-brands fa-youtube" />
                  <a href="#"> Youtube</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 text-center pt-5">
              <h5>© 2023. Property Care. All rights reserved.</h5>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
