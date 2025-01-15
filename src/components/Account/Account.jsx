import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addAllChoice, removeAllChoice } from "../../global/choice/actions";
import { ChoiceContext } from "../../global/choice/context";
import {
  addAllItinerary,
  addAllItineraryLandmark,
  removeAllItinerary,
} from "../../global/itinerary/actions";
import { ItineraryContext } from "../../global/itinerary/context";
import { useToast } from "../../global/toast/ToastContext";
import { UserContext } from "../../global/user/UserContext";
import useFetchUsers from "../../hooks/useFetchUsers";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Error } from "../Contact/Contact.style";
import { InfoUser } from "../Explore/Explore.style";
import { Buttons } from "../MainHome/MainHome.style";
import ToastComponent from "../Toast/ToastComponent";
import {
  AccountActionButton,
  AccountContainer,
  AccountSection,
  AccountText,
  ButtonsContainerAccount,
  InputContainerAccount,
} from "./Account.style";
import AccountForm from "./AccountForm";

const Account = () => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  let id = "";

  const { user, setUser } = useContext(UserContext); // destructurare UserContext

  const { users, error, loading, setError } = useFetchUsers(
    id,
    clicked,
    setClicked
  );

  console.log("users", users, "loading", loading, "error", error);

  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [splitContainer, setSplitContainer] = useState(false);
  const [message, setMessage] = useState("");
  const [isFound, setIsFound] = useState([]);
  const [errorInput, setErrorInput] = useState({
    Email: undefined,
  });
  const [isValid, setIsValid] = useState(true);

  const { stateGlobalChoice, dispatchChoice } = useContext(ChoiceContext);
  const { stateGlobalItinerary, dispatchItinerary } =
    useContext(ItineraryContext);

  const { localData, handleLocalData, resetLocalData } =
    useLocalStorage("user");

  console.log(
    "localData",
    localData,
    "stateGlobalChoice",
    stateGlobalChoice,
    "stateGlobalItinerary",
    stateGlobalItinerary
  );

  const { showToast, hideToast } = useToast();

  //enter login section
  const handleGetAccount = () => {
    setIsVisible1(!isVisible1);
    setSplitContainer(!splitContainer);
    setIsVisible2(false);
    setError(false);
    setIsFound(true);
    setMessage("");
    setInputObj({ Email: "" }); //reset input field
  };

  //enter create account section
  const handleNewAccount = () => {
    setIsVisible2(!isVisible2);
    setSplitContainer(!splitContainer);
    setIsVisible1(false);
    setError(false);
    setIsFound(false);
    setInputObj({ Email: "" }); //reset input field
  };

  const [inputObj, setInputObj] = useState({
    Email: "",
  });

  const handleChange = (e, name) => {
    setError(false);
    setClicked(true);
    const value = e.target.value;
    setInputObj({ ...inputObj, [name]: value });
    handleError(value, name);

    const foundUser = users?.find((element) => element.Email === value);

    if (users && users.length > 0) {
      setIsFound(foundUser !== undefined);
    } else {
      setIsFound(false);
    }
  };

  const handleSubmit = async () => {
    console.log(inputObj);
    const add = await fetch(
      `https://travel-planning-platform.vercel.apphttps://travel-planning-platform.vercel.app/api/users`,
      {
        method: "POST",
        body: JSON.stringify(inputObj),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await add.json();
    console.log("S-a adaugat un user cu acest id pe server", response[0].id);

    return response[0].id;
  };

  //function for create new account now action button
  const addNewId = async () => {
    if (!inputObj.Email) {
      showToast(
        "New Account",
        "Please enter a valid e-mail!",
        "my-warning-toast"
      );
    } else {
      dispatchChoice(removeAllChoice());
      dispatchItinerary(removeAllItinerary());
      const idul = await handleSubmit();
      handleLocalData("user", JSON.stringify(idul));
      console.log("S-a adagat un user cu acest id in local storage", idul);
      setUser({ Email: inputObj.Email, idul });
      navigate(`/users/${idul}`);
    }
  };

  //function for login action button
  const getUserData = () => {
    if (!inputObj.Email) {
      showToast("Login", "Please enter a valid e-mail!", "my-warning-toast");
    } else {
      setClicked(true);
      const userData = users?.find(
        (element) => element.Email === inputObj.Email
      );
      console.log("users", users);
      console.log("inputObj", inputObj);
      console.log("userData", userData);

      handleLocalData("user", JSON.stringify(userData.id));
      setUser(userData);

      if (userData.choices) {
        dispatchChoice(addAllChoice(userData.choices));
        console.log("userData.choices", userData.choices);
      }

      if (userData.itinerarycity) {
        dispatchItinerary(addAllItinerary(userData.itinerarycity));
        console.log("userData.itinerarycity", userData.itinerarycity);
      }

      if (userData.itinerarylandmark) {
        dispatchItinerary(addAllItineraryLandmark(userData.itinerarylandmark));
        console.log("userData.itinerarylandmark", userData.itinerarylandmark);
      }

      if (
        !userData.choices &&
        !userData.itinerarycity &&
        !userData.itinerarylandmark
      ) {
        setMessage("No travel options yet!");
        setSplitContainer(false);
      }
    }
  };

  //direct logout user
  const logoutUser = () => {
    setIsVisible1(false); //closes login form
    setIsVisible2(false); //closes new account form
    setSplitContainer(false);
    resetLocalData();
    setUser(null);
    dispatchChoice(removeAllChoice());
    dispatchItinerary(removeAllItinerary());
    showToast("Logout", `Logout success, ${user.Email} !`, "my-info-toast");
  };

  const handleError = (value, name) => {
    const isEmailValid = (email) => {
      const formulaEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return formulaEmail.test(email);
    };

    if (!isEmailValid(value)) {
      setErrorInput({
        ...errorInput,
        [name]: "Invalid email format.",
      });
      setIsValid(false);
    } else if (value === "Email") {
      setErrorInput({ ...errorInput, [name]: "Error" });
    } else {
      setErrorInput({ ...errorInput, [name]: undefined });
      setIsValid(true);
    }
  };

  return (
    <AccountSection loc="AccountSection">
      <ButtonsContainerAccount
        loc="ButtonsContainerAccount"
        split={splitContainer ? "true" : "false"}
      >
        <Buttons
          loc="Buttons"
          variant="account" //prop for css
          onClick={() => handleGetAccount()}
        >
          Login
        </Buttons>
        <Buttons
          loc="Buttons"
          variant="account" //prop for css
          onClick={() => handleNewAccount()}
        >
          Create account
        </Buttons>
        <Buttons
          loc="Buttons"
          variant="account" //prop for css
          onClick={() => logoutUser()}
        >
          Logout
        </Buttons>
      </ButtonsContainerAccount>
      <InputContainerAccount
        loc="InputContainerAccount"
        split={splitContainer ? "true" : "false"}
      >
        {isVisible1 && (
          <AccountContainer loc="AccountContainer">
            <AccountText loc="AccountText">Enter e-mail to login</AccountText>
            {Object.keys(inputObj).map((el, index) => (
              <AccountForm
                key={index}
                name={el}
                type={el}
                value={inputObj[el]}
                handleChange={handleChange}
                error={errorInput[el]}
              />
            ))}
            {isValid && isFound && (
              <AccountActionButton
                loc="AccountActionButton"
                onClick={() => {
                  getUserData();
                }}
              >
                Press to login
              </AccountActionButton>
            )}
            {isValid && isFound && message && (
              <>
                <InfoUser loc="InfoUser">{message}</InfoUser>
                <AccountActionButton loc="AccountActionButton" to={`/home`}>
                  Take me to view offers!
                </AccountActionButton>
              </>
            )}
            {!isValid && <Error loc="Error">Not valid</Error>}
            {!isFound && isVisible1 && (
              <Error loc="Error">No such user found</Error>
            )}
          </AccountContainer>
        )}
        {isVisible2 && (
          <AccountContainer loc="AccountContainer">
            <AccountText loc="AccountText">
              Enter e-mail to create account
            </AccountText>
            {Object.keys(inputObj).map((el, index) => (
              <AccountForm
                key={index}
                name={el}
                type={el}
                value={inputObj[el]}
                handleChange={handleChange}
                error={errorInput[el]}
              />
            ))}
            {isValid && !isFound && (
              <AccountActionButton
                loc="AccountActionButton"
                onClick={() => {
                  addNewId();
                }}
              >
                Create new account now
              </AccountActionButton>
            )}
            {!isValid && <Error loc="Error">Not valid</Error>}
            {isFound && isVisible2 && (
              <Error loc="Error">Email already exists</Error>
            )}
          </AccountContainer>
        )}
      </InputContainerAccount>
      <ToastComponent />
    </AccountSection>
  );
};

export default Account;
