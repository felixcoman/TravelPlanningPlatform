import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import useFetchData from "../../hooks/useFetchData";
import Slider from "../About/Slider";
import { AttributionsSection } from "../Attributions/Attributions.style";
import { Error, Loading } from "../Contact/Contact.style";
import {
  MainContainer,
  MainHomeGalleryItem,
  SectionMainContainer,
} from "./MainHome.style";

function MainHome() {
  const [clicked, setClicked] = useState(true);

  const urlPicture = `https://travel-planning-platform.vercel.apphttps://travel-planning-platform.vercel.app/api/Pictures`;

  const {
    data: images,
    error,
    loading,
  } = useFetchData(urlPicture, clicked, setClicked);

  return (
    <SectionMainContainer loc="SectionMainContainer">
      <MainContainer loc="MainContainer">
        {images &&
          images.map((image, index) => (
            <MainHomeGalleryItem
              loc="MainHomeGalleryItem"
              key={index}
              src={image.image}
              alt={"presentation image ".concat(image.id)}
            />
          ))}
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
      </MainContainer>
      {images && (
        <Slider
          loc="Slider"
          className="carousel-home"
          images={images}
          error={error}
          loading={loading}
        />
      )}
      <AttributionsSection loc="AttributionsSection">
        Copyright: Images from <a href="https://picsum.photos/">Lorem Picsum</a>
      </AttributionsSection>
    </SectionMainContainer>
  );
}

export default MainHome;
