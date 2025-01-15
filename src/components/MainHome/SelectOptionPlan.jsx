import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import useFetchData from "../../hooks/useFetchData";
import useLocalStorage from "../../hooks/useLocalStorage";
import {
  ErrorHome,
  FormBody,
  HomeBtn,
  LoadingHome,
  Option,
  SelectContainer,
  SelectPlan,
} from "./MainHome.style";

function SelectOptionPlan() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [clicked, setClicked] = useState(false);

  const url = selectedCountry
    ? `https://travel-planning-platform.vercel.apphttps://travel-planning-platform.vercel.app/api/${selectedCountry}`
    : null;

  const { data, error, loading, setData } = useFetchData(
    url,
    clicked,
    setClicked
  );

  const { localData } = useLocalStorage("user");
  console.log("localData", localData);

  const handleDropdownChangeCountry = (e) => {
    setSelectedCountry(e.target.value);

    setClicked(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setClicked(true);
  };

  return (
    <>
      <SelectContainer loc="SelectContainer">
        <FormBody loc="FormBody" onSubmit={(e) => handleSubmit(e)}>
          <SelectPlan loc="SelectPlan" onChange={handleDropdownChangeCountry}>
            <Option loc="Option" value="">
              Pick a country
            </Option>
            <Option loc="Option" value="italy">
              Italy
            </Option>
            <Option loc="Option" value="france">
              France
            </Option>
            <Option loc="Option" value="romania">
              Romania
            </Option>
            <Option loc="Option" value="spain">
              Spain
            </Option>
          </SelectPlan>

          {data && (
            <HomeBtn
              loc="HomeBtn"
              type="submit"
              to={`/city-region/${selectedCountry}/${localData}`}
            >
              Let's Begin To Travel!
            </HomeBtn>
          )}
        </FormBody>
      </SelectContainer>
      {loading && (
        <LoadingHome loc="LoadingHome">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          Loading... Waiting for landing...
        </LoadingHome>
      )}
      {error && (
        <ErrorHome loc="ErrorHome">
          Error: {error.message}! Our team is called from the coffee break and
          will take care of the problem!
        </ErrorHome>
      )}
    </>
  );
}

export default SelectOptionPlan;
