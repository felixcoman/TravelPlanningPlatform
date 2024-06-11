import {
  TextChoice,
  MainContainerChoice,
  DataContainerChoice,
  TextOrangeChoice,
  ButtonPlanTravel,
  PageContainerTravel,
} from "../MyTravelCity/MyTravel.style";
import ThreeDays from "../MyTravelRecommend/ThreeDays";
import FiveDays from "../MyTravelRecommend/FiveDays";
import SevenDays from "../MyTravelRecommend/SevenDays";
import LowBuget from "../MyTravelRecommend/LowBuget";
import MediumBuget from "../MyTravelRecommend/MediumBuget";
import HighBuget from "../MyTravelRecommend/HighBuget";

function MyChoicesBox({
  country,
  city,
  region,
  buget,
  period,
  data,
  handleDelete,
}) {
  const bugetTravelNoSpace = buget.replace(/ /g, "").toLowerCase();
  const periodTravelNoSpace = period.replace(/ /g, "").toLowerCase();

  const keyBuget = Object.keys(data[0].buget);
  const keyPeriod = Object.keys(data[0].period);

  const equalBugetLow =
    bugetTravelNoSpace == keyBuget[0].toLowerCase() ? true : false;
  const equalBugetMedium =
    bugetTravelNoSpace == keyBuget[1].toLowerCase() ? true : false;
  const equalBugetHigh =
    bugetTravelNoSpace == keyBuget[2].toLowerCase() ? true : false;

  const equalPeriodThree =
    periodTravelNoSpace == keyPeriod[0].toLowerCase() ? true : false;
  const equalPeriodFive =
    periodTravelNoSpace == keyPeriod[1].toLowerCase() ? true : false;
  const equalPeriodSeven =
    periodTravelNoSpace == keyPeriod[2].toLowerCase() ? true : false;

  return (
    <>
      <PageContainerTravel loc="PageContainerTravel">
        <DataContainerChoice loc="DataContainerChoice">
          <TextOrangeChoice loc="TextOrangeChoice"> Country:</TextOrangeChoice>
          <TextChoice loc="TextChoice">{country}</TextChoice>
        </DataContainerChoice>

        {city ? (
          <DataContainerChoice loc="DataContainerChoice">
            <TextOrangeChoice loc="TextOrangeChoice"> City:</TextOrangeChoice>
            <TextChoice loc="TextChoice">{city}</TextChoice>
          </DataContainerChoice>
        ) : (
          <DataContainerChoice loc="DataContainerChoice">
            <TextOrangeChoice loc="TextOrangeChoice"> Region:</TextOrangeChoice>
            <TextChoice loc="TextChoice">{region}</TextChoice>
          </DataContainerChoice>
        )}

        {period ? (
          <MainContainerChoice loc="MainContainerChoice">
            <DataContainerChoice loc="DataContainerChoice">
              <TextOrangeChoice loc="TextOrangeChoice">
                Period:
              </TextOrangeChoice>
              <TextChoice loc="TextChoice">{period} </TextChoice>
            </DataContainerChoice>
            {equalPeriodThree
              ? data.map((e, index) => <ThreeDays key={index} {...e} />)
              : null}
            {equalPeriodFive
              ? data.map((e, index) => <FiveDays key={index} {...e} />)
              : null}
            {equalPeriodSeven
              ? data.map((e, index) => <SevenDays key={index} {...e} />)
              : null}
          </MainContainerChoice>
        ) : null}

        {buget ? (
          <MainContainerChoice loc="MainContainerChoice">
            <DataContainerChoice loc="DataContainerChoice">
              <TextOrangeChoice loc="TextOrangeChoice">Buget:</TextOrangeChoice>
              <TextChoice loc="TextChoice">{buget}</TextChoice>
            </DataContainerChoice>
            {equalBugetLow
              ? data.map((e, index) => <LowBuget key={index} {...e} />)
              : null}
            {equalBugetMedium
              ? data.map((e, index) => <MediumBuget key={index} {...e} />)
              : null}

            {equalBugetHigh
              ? data.map((e, index) => <HighBuget key={index} {...e} />)
              : null}
          </MainContainerChoice>
        ) : null}
        <ButtonPlanTravel loc="ButtonPlanTravel" onClick={handleDelete}>
          Delete my choice
        </ButtonPlanTravel>
      </PageContainerTravel>
    </>
  );
}

export default MyChoicesBox;