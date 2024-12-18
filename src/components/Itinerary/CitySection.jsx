import { useContext, useState } from "react";
import { itineraryMinus } from "../../global/itinerary/actions";
import { ItineraryContext } from "../../global/itinerary/context";
import useLocalStorage from "../../hooks/useLocalStorage";
import useRemoveData from "../../hooks/useRemoveData";
import CityCard from "../CityCard/CityCard";

function CitySection() {
  const { stateGlobalItinerary, dispatchItinerary } =
    useContext(ItineraryContext);

  const { localData } = useLocalStorage("user");

  const itineraryValueArray = stateGlobalItinerary.itineraryValue || [];
  console.log("itineraryValueArray", itineraryValueArray);

  const [clicked, setClicked] = useState(true);
  const [show, setShow] = useState(false);
  const [showId, setShowId] = useState(0);
  const [indexServer, setIndexServer] = useState(null);

  const { error, loading } = useRemoveData(
    localData,
    indexServer,
    setIndexServer,
    "itinerarycity"
  );
  console.log("error HOOK", error, "loading HOOK", loading);

  const handleDelete = (index) => {
    setClicked(true);
    setShow(false);
    dispatchItinerary(itineraryMinus(index));
    //specifying index server because element sequence is reversed from that of the global array (first added element is on last position in global array but on first position on server)
    setIndexServer(stateGlobalItinerary.itineraryValue.length - 1 - index);
  };

  return (
    <>
      {stateGlobalItinerary &&
        itineraryValueArray?.map((element, index) => (
          <CityCard
            key={index}
            index={index}
            handleDelete={() => handleDelete(index)}
            show={show && showId === index}
            setShow={setShow}
            setShowId={setShowId}
            clicked={clicked}
            setClicked={setClicked}
            {...element}
          />
        ))}
    </>
  );
}
export default CitySection;
