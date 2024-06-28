import styled from "styled-components";
import {
  DARK_BLUE,
  ORANGE,
  WHITE_NEUTRAL,
  YELLOW,
  MIDDLE_BLUE,
} from "../../constants/Colors";
import { TEXT_SIZE_MEDIUM, TEXT_SIZE_SMALL } from "../../constants/Dimensions";

export const SectionItineraryData = styled.div`
  display: grid;
  gap: 10px;
  width: 90vw;
  margin: auto;
  grid-template-columns: repeat(auto-fit, minmax(calc(50vw / 3), 1fr));
  margin-bottom: 20px;
  justify-items: center;
`;
