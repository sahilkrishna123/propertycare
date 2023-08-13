// import React from "react";

// function Section3() {
//   return (

// <>
// <style
//   dangerouslySetInnerHTML={{
//     __html:
//       "\n\n\n.wrapper{\n  display: grid;\n  margin: 200px 90px auto;\n  grid-gap: 20px;\n  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));\n    margin: auto;\n    margin-top: 300px;\n  grid-template-columns: 300px 300px 300px;\nwidth: 100%;\n\n}\n\n.wrapper .box{\n  width: 350px;\n  margin: 0 auto;\n  position: relative;\n  perspective: 1000px;\n}\n.wrapper .box .front-face{\n  background: #fff;\n  height: 220px;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  box-shadow: 0px 5px 20px 0px rgba(0, 81, 250, 0.1);\n  transition: all 0.5s ease;\n}\n.box .front-face .icon{\n  height: 80px;\n}\n.box .front-face .icon i{\n  font-size: 65px;\n}\n.box .front-face span,\n.box .back-face span{\n  font-size: 22px;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.box .front-face .icon i,\n.box .front-face span{\n  background: linear-gradient(-135deg, #c850c0, #4158d0);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n}\n.box .back-face{\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1;\n  height: 220px;\n  width: 100%;\n  padding: 30px;\n  color: #fff;\n  opacity: 0;\n  transform-style: preserve-3d;\n  backface-visibility: hidden;\n  background: linear-gradient(-135deg, #c850c0, #4158d0);\n  transform: translateY(110px) rotateX(-90deg);\n  box-shadow: 0px 5px 20px 0px rgba(0, 81, 250, 0.1);\n  transition: all 0.5s ease;\n}\n.box .back-face p{\n  margin-top: 10px;\n  text-align: justify;\n}\n.box:hover .back-face{\n  opacity: 1;\n  transform: rotateX(0deg);\n}\n.box:hover .front-face{\n  opacity: 0;\n  transform: translateY(-110px) rotateX(90deg);\n}\n\nh1{\n\ncolor: white;\nfont-family: cursive;\nfont-size: 6em;\nmargin-top: 50px;\n}\n"
//   }}
// />



// <section>
//   <h1>Our Services</h1>
//   <div className="wrapper">
//     <div className="box">
//       <div className="front-face">
//         <div className="icon">
//           <i className="fas fa-code" />
//         </div>
//         <span>Home for Sale</span>
//       </div>
//       <div className="back-face">
//         <span>Home for Sale</span>
//         <p>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem in
//           deleniti vitae beatae veritatis aliquid porro perspiciatis dolores
//           impedit ad.
//         </p>
//       </div>
//     </div>
//     <div className="box">
//       <div className="front-face">
//         <div className="icon">
//           <i className="fas fa-chart-line" />
//         </div>
//         <span>Builders</span>
//       </div>
//       <div className="back-face">
//         <span>Builders</span>
//         <p>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem in
//           deleniti vitae beatae veritatis aliquid porro perspiciatis dolores
//           impedit ad.
//         </p>
//       </div>
//     </div>
//     <div className="box">
//       <div className="front-face">
//         <div className="icon">
//           <i className="fas fa-rocket" />
//         </div>
//         <span>Home for Rent</span>
//       </div>
//       <div className="back-face">
//         <span>Home for Rent</span>
//         <p>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem in
//           deleniti vitae beatae veritatis aliquid porro perspiciatis dolores
//           impedit ad.
//         </p>
//       </div>
//     </div>
//   </div>
// </section>

// </>


//   );
// }
// export default Section3;