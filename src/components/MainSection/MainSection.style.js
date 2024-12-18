import styled from "styled-components";

//section is important for providing controled top padding to ensure that navbar is not hiding content underneath

export const MainSection = styled.section`
  padding-top: 15vh;
  min-height: 85vh;

  @media screen and (max-width: 900px) {
    padding-top: 17vh;
    min-height: 83vh;
  }
`;
