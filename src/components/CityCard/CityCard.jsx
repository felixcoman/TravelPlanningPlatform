import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import useFetchData from "../../hooks/useFetchData";
import Attributions from "../Attributions/Attributions";
import { DeleteButton } from "../CityCard/CityCard.style";
import { ImgWrapper } from "../DestinationCard/DestinationCard.style";

function CityCard({
  country,
  city,
  index,
  handleDelete,
  show,
  setShow,
  setShowId,
  clicked,
  setClicked,
}) {
  console.log("country", country, "city", city, "index", index);

  const url = `https://travel-planning-platform.vercel.apphttps://travel-planning-platform.vercel.app/api/${country}?city=${city}`;
  console.log("url", url, "clicked", clicked);

  const { data, error, loading } = useFetchData(url, clicked, setClicked);
  console.log("data", "error", "loading", data, error, loading);

  const handleCloseShow = () => {
    setShow(!show), setShowId(index);
  };
  return (
    <>
      <Modal show={show} onHide={handleCloseShow}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to DELETE "{city}" ?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={() => handleDelete(index)}>
            YES
          </Button>
          <Button variant="secondary" onClick={handleCloseShow}>
            NO
          </Button>
        </Modal.Footer>
      </Modal>
      {data &&
        data?.map((card, ind) => (
          <Card key={ind} className="tangerine-bold">
            <ImgWrapper loc="ImgWrapper">
              <Card.Img variant="top" src={card.image} alt="Image of city" />
              {card.attributions && (
                <Attributions
                  variant="card"
                  attributions={card.attributions[0]}
                />
              )}
            </ImgWrapper>
            <Card.Body>
              <Card.Title>{city}</Card.Title>
              <Card.Text>{card.description}</Card.Text>
              <DeleteButton
                loc="DeleteButton"
                onClick={() => handleCloseShow()}
              >
                Remove from My Itinerary
              </DeleteButton>
            </Card.Body>
          </Card>
        ))}
    </>
  );
}
export default CityCard;
