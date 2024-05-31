import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About Us"}>
      <div className="row contactus ">
        <div className="col-md-6">
          <img src="/images/about.jpeg" alt="contactus" className="rounded" style={{ width: "100%" }} />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Welcome to <span className="fw-bold">TheBookNook</span>, your ultimate online destination for an unparalleled literary shopping experience. At TheBookNook, we believe in the transformative
            power of books and the joy they bring to readers of all ages. Our extensive collection spans across genres, including novels, poetry, and classic literature, ensuring there's something for
            every book lover. We are dedicated to providing a seamless and enjoyable shopping experience, with detailed book descriptions. Whether you're seeking the latest bestseller, a timeless
            classic, or a hidden gem, TheBookNook is here to connect you with the stories that inspire and captivate. Join our community of readers and discover your next great read today.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
