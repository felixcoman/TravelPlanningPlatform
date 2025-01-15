import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import useFetchData from "../../hooks/useFetchData";
import Attributions from "../Attributions/Attributions";
import { DeleteButton } from "../CityCard/CityCard.style";
import { ImgWrapper } from "../DestinationCard/DestinationCard.style";

function LandmarkCard({
  name,
  index,
  handleDelete,
  show,
  setShow,
  setShowId,
  clicked,
  setClicked,
}) {
  console.log("name", name, "index", index);

  const url = `https://travel-planning-platform.vercel.apphttps://travel-planning-platform.vercel.app/api/destinations?name=${name}`;
  console.log("url", url);

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
          <p>Are you sure you want to DELETE "{name}" ?</p>
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
              <Card.Img
                variant="top"
                src={card.image}
                alt="Image of landmark"
              />
              {card.attributions && (
                <Attributions
                  variant="card"
                  attributions={card.attributions[0]}
                />
              )}
            </ImgWrapper>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
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
export default LandmarkCard;
