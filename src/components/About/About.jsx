import { AttributionsSection } from "../Attributions/Attributions.style";
import {
  AboutText,
  AboutTextCenter,
  AboutTitle,
  MainAbout,
} from "./About.style";
import Slider from "./Slider";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import useFetchData from "../../hooks/useFetchData";
import { Error, Loading } from "../Contact/Contact.style";

function About() {
  const [clicked, setClicked] = useState(true);

  const urlPicture = `https://travel-planning-platform.vercel.apphttps://travel-planning-platform.vercel.app/api/Pictures`;

  const {
    data: images,
    error,
    loading,
  } = useFetchData(urlPicture, clicked, setClicked);

  return (
    <MainAbout loc="MainAbout">
      <AboutTitle loc="AboutTitle">About Us</AboutTitle>
      <AboutText loc="AboutText">
        Welcome to our tourism web page, your ultimate gateway to a world of
        travel possibilities. Our platform is designed to make your travel
        planning seamless, personalized, and enjoyable. Whether you're looking
        to explore specific destinations or prefer a tailored travel program,
        we've got you covered.
      </AboutText>
      {images && (
        <Slider loc="Slider" images={images} error={error} loading={loading} />
      )}
      {loading && (
        <Loading loc="Loading">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          Loading... Waiting for landing...
        </Loading>
      )}
      {error && (
        <Error loc="Error">
          Error: {error.message} Our team is called from the coffee break and
          will take care of the problem!
        </Error>
      )}
      <AttributionsSection loc="AttributionsSection">
        Copyright: Images from <a href="https://picsum.photos/">Lorem Picsum</a>
      </AttributionsSection>
      <AboutText loc="AboutText">
        Our website offers two main pathways for your travel planning. You can
        choose to explore specific travel destinations by selecting the country
        and city you're interested in. Once you make your selection, you'll be
        redirected to our Explore page where you can read detailed information
        about the city and select further objectives if available. From here,
        you can directly choose your accommodation options, or add the city and
        its objectives to your Itinerary for later review. The Itinerary tab
        allows you to visualize your selections as cards, making it easy to
        organize and finalize your travel plans. You can then opt for
        accommodation, with choices ranging from low to high budget based on
        your selections.{" "}
      </AboutText>{" "}
      <AboutText loc="AboutText">
        Alternatively, if you prefer ready-made travel options, you can select a
        country from the homepage and be redirected to a page where you can
        choose between cities or regions. You'll then select your travel
        period—3, 5, or 7 days—and your budget preference. These selections can
        be saved to the Choices tab, where you can easily visualize or delete
        them as needed.{" "}
      </AboutText>{" "}
      <AboutText loc="AboutText">
        Our About page provides a comprehensive overview of our website and
        acknowledges the copyright credits that protect our content.
      </AboutText>{" "}
      <AboutText loc="AboutText">
        In the Contact page, you have the opportunity to register and provide
        feedback, helping us improve your user experience.
      </AboutText>{" "}
      <AboutText loc="AboutText">
        The Account page allows you to manage your login details, create a new
        account, or logout. Existing users can retrieve their saved travel
        options from our server, while new users can easily create an account to
        start their travel planning journey.{" "}
      </AboutText>{" "}
      <AboutTextCenter loc="AboutTextCenter">
        <em>
          Thank you for choosing our platform. We are committed to making your
          travel dreams a reality!
        </em>
      </AboutTextCenter>
    </MainAbout>
  );
}

export default About;
