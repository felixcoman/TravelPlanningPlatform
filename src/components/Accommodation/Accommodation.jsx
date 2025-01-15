import { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import { useLocation } from "react-router-dom";
import { Error, Loading } from "../Contact/Contact.style";
import { InfoUser, Title } from "../Explore/Explore.style";
import {
  AccommodationContainer,
  AccommodationDescription,
  AccommodationMain,
  DisplayContainer,
  HighlightText,
  Iframe,
  ItemLink,
  LocationTitle,
  PlaceholderAcc,
  Sidebar,
} from "./Accommodation.style";

function Accommodation() {
  const location = useLocation();
  const accommodationArray = location.state || [];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const fetchData = async (country, city) => {
      if (country !== undefined && city !== undefined) {
        try {
          const response = await fetch(
            `https://travel-planning-platform.vercel.apphttps://travel-planning-platform.vercel.app/api/${country}?city=${city}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const dataCity = await response.json();
          return { country, city, dataCity };
        } catch (error) {
          return { country, city, error: "Error 808" };
        }
      } else return;
    };

    const fetchAllData = async () => {
      try {
        const promises = accommodationArray.map((element) =>
          fetchData(element.country, element.city)
        );
        const results = await Promise.all(promises);
        setData(results);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [accommodationArray]);

  if (loading) {
    return (
      <Loading loc="Loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        Loading... Waiting for landing...
      </Loading>
    );
  }

  if (error) {
    return <Error loc="Error">Error: {error}</Error>;
  }

  if (data.length === 0 || !data[0].dataCity) {
    return <Error loc="Error">No data available</Error>;
  }

  const compactDataCity = data[0].dataCity;
  const budgetKeys = Object.keys(compactDataCity[0].budget);
  const searchTerm = "Budget";

  const indexOfFirst = (arr, term) => {
    return arr.indexOf(term);
  };

  const transformedBudgetKeys = budgetKeys.map((key) => {
    const slicePosition = key.length - indexOfFirst(key, searchTerm);
    return (
      key.slice(0, -slicePosition) +
      " " +
      key.slice(-slicePosition).toLowerCase()
    );
  });

  const getKeyDisplay = (key, city) => {
    console.log("GET");
    const originalKey = budgetKeys[transformedBudgetKeys.indexOf(key)];
    setSelectedBudget(originalKey);
    setSelectedCity(city);
    console.log("city", city);
  };

  const getHotelDescription = (description) => {
    const descriptionSlicePos =
      description[1].length - indexOfFirst(description[1], "web:");
    const hotelNameSlice = description[1].slice(0, -descriptionSlicePos - 2);
    const hotelWebSlice = description[1].slice(-descriptionSlicePos + 5);
    return [`${hotelNameSlice}\nwebpage:\xa0${hotelWebSlice}`];
  };

  const getIframe = (description) => {
    const descriptionSlicePos =
      description[1].length - indexOfFirst(description[1], "web:");
    const hotelWebSlice = description[1].slice(-descriptionSlicePos + 5);
    return hotelWebSlice;
  };

  return (
    <>
      <Title loc="Title">
        Feel free to explore accommodation for the options you have selected
      </Title>
      <AccommodationMain loc="AccommodationMain">
        {data && (
          <Sidebar loc="Sidebar">
            {data.map(
              (dataItem, index) =>
                dataItem.dataCity && (
                  <ListGroup as="ul" key={index}>
                    <LocationTitle loc="LocationTitle">
                      City: {dataItem.city}
                    </LocationTitle>
                    {transformedBudgetKeys.map((key, idx) => (
                      <ListGroup.Item as="li" key={idx}>
                        <ItemLink
                          loc="ItemLink"
                          onClick={() => getKeyDisplay(key, dataItem.city)}
                        >
                          {key}
                        </ItemLink>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )
            )}
          </Sidebar>
        )}
        {selectedBudget &&
          selectedCity &&
          data.map((dataItem, index) => {
            if (selectedCity === dataItem.city && dataItem.dataCity) {
              return (
                <DisplayContainer loc="DisplayContainer" key={index}>
                  {Object.entries(
                    dataItem.dataCity[0].budget[selectedBudget]
                  ).map((description, idx) => (
                    <AccommodationContainer
                      loc="AccommodationContainer"
                      key={idx}
                    >
                      <AccommodationDescription loc="AccommodationDescription">
                        <HighlightText loc="HighlightText">
                          Option {idx + 1}
                        </HighlightText>
                        {getHotelDescription(description)}
                      </AccommodationDescription>
                      <Iframe
                        loc="Iframe"
                        src={getIframe(description)}
                        height="300px"
                        width="100%"
                        title="accommodation for your selection"
                      ></Iframe>
                    </AccommodationContainer>
                  ))}
                </DisplayContainer>
              );
            }
            return null;
          })}
        {data && !selectedCity && (
          <PlaceholderAcc loc="PlaceholderAcc">
            <InfoUser loc="InfoUser">
              No buget from the side navbar selected
            </InfoUser>
          </PlaceholderAcc>
        )}
      </AccommodationMain>
    </>
  );
}

export default Accommodation;
