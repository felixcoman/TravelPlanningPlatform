import { useContext, useState } from "react";
import { List, X } from "react-bootstrap-icons";
import Badge from "react-bootstrap/Badge";
import { ChoiceContext } from "../../global/choice/context";
import { ItineraryContext } from "../../global/itinerary/context";
import { UserContext } from "../../global/user/UserContext";
import isObjectEmpty from "../../global/utilities/isObjectEmpty";
import MobileDropdown from "./MobileDropdown";
import NavLinks from "./NavLinks";
import {
  AlertWrap,
  BadgeBox,
  ButtonDropdown,
  Icon,
  IconBox,
  LinkContainerDesktop,
  Logo,
  NavbarContainer,
  NavbarContent,
} from "./Navbar.style";

export const routes = [
  { title: "Home", href: "home" },
  { title: "About", href: "about" },
  { title: "My Itinerary", href: "itinerary" },
  { title: "My Choices", href: "my-choices" },
  { title: "Contact", href: "contact" },
  { title: "Account", href: "account" },
];

function NavBar() {
  const { user } = useContext(UserContext);
  const [displayDropdown, setDisplayDropdown] = useState(false);

  const handleDisplayDropdown = () => {
    setDisplayDropdown(!displayDropdown);
  };

  const { stateGlobalItinerary } = useContext(ItineraryContext);
  const { stateGlobalChoice } = useContext(ChoiceContext);

  console.log("user", user);

  return (
    <NavbarContainer loc="NavbarContainer">
      <NavbarContent loc="NavbarContent">
        <Logo
          loc="Logo"
          src="data:image/jpeg;base64,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"
        ></Logo>
        <AlertWrap loc="AlertWrap">
          {user && !isObjectEmpty(user) && (
            <IconBox loc="IconBox">
              Welcome
              <Icon loc="Icon" className="bi bi-person">
                {" "}
                {user.Email}
              </Icon>
            </IconBox>
          )}
          <BadgeBox loc="BadgeBox">
            My Itinerary:{" "}
            <Badge className="itinerary-badge" bg="primary">
              {stateGlobalItinerary.itineraryValue?.length +
                stateGlobalItinerary.itineraryLandmarkValue?.length}
            </Badge>
          </BadgeBox>
          <BadgeBox loc="BadgeBox">
            My Choices:{" "}
            <Badge className="choice-badge" bg="primary">
              {stateGlobalChoice.choiceValue?.length}
            </Badge>
          </BadgeBox>
        </AlertWrap>
        <LinkContainerDesktop loc="LinkContainerDesktop">
          {routes.map((el, index) => (
            <NavLinks key={index} title={el.title} href={el.href} />
          ))}
          {!displayDropdown && (
            <>
              <Badge className="itinerary-badge" bg="primary">
                {stateGlobalItinerary.itineraryValue?.length +
                  stateGlobalItinerary.itineraryLandmarkValue?.length}
              </Badge>
              <Badge className="choice-badge" bg="primary">
                {stateGlobalChoice.choiceValue?.length}
              </Badge>
            </>
          )}
        </LinkContainerDesktop>

        <ButtonDropdown loc="ButtonDropdown" onClick={handleDisplayDropdown}>
          {!displayDropdown ? <List size={40} /> : <X size={40} />}
        </ButtonDropdown>
        {displayDropdown && (
          <MobileDropdown handleDisplayDropdown={handleDisplayDropdown} />
        )}
      </NavbarContent>
    </NavbarContainer>
  );
}

export default NavBar;
