import styled from "styled-components";
import { DARK_BLUE, WHITE_NEUTRAL } from "../../constants/Colors";
import { TEXT_SIZE_SMALL } from "../../constants/Dimensions";

export const FooterContainer = styled.footer`
  width: 100%;
  height: 15vh;
  align-content: center;
  background-color: ${DARK_BLUE};
`;

export const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  height: 15vh;
  padding: 15px 15px;
  margin: auto;
  background-color: transparent;
  color: ${WHITE_NEUTRAL};
  font-size: ${TEXT_SIZE_SMALL};

  @media screen and (max-width: 840px) {
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 0;
  }
`;

export const FooterInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin: 5px;
`;

export const FooterInfo = styled.p`
  margin: 5px;
  @media screen and (max-width: 840px) {
  }
`;

export const Copyrights = styled.p`
  margin: 5px;

  @media screen and (max-width: 840px) {
  }
`;
