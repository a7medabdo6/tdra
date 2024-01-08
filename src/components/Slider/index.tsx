import React, { useState } from "react";
import ReactSimplyCarousel from "react-simply-carousel";
import CardSlider from "./CardSlider";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
interface ResponsiveProps {
  itemsToShow: number;
  itemsToScroll: number;
  minWidth: number;
}

function ReactSimplyCarouselExample() {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  return (
    <div>
      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={1}
        itemsToScroll={1}
        forwardBtnProps={{
          style: {
            alignSelf: "center",
            border: "none",
            borderRadius: "50%",
            color: "black",
            cursor: "pointer",
            fontSize: "20px",
            height: 30,
            lineHeight: 1,
            textAlign: "center",
            width: 30,
            position: "absolute",
            top: "15px",
            right: "15px",
          },
          children: <ArrowForwardIosIcon />,
        }}
        backwardBtnProps={{
          style: {
            alignSelf: "center",
            border: "none",
            borderRadius: "50%",
            color: "black",
            cursor: "pointer",
            fontSize: "20px",
            height: 30,
            lineHeight: 1,
            textAlign: "center",
            width: 30,
            position: "absolute",
            top: "15px",
            right: "40px",
          },
          children: <ArrowBackIosNewIcon />,
        }}
        responsiveProps={[
          {
            itemsToShow: 6,
            itemsToScroll: 2,
            minWidth: 768,
          } as ResponsiveProps,
        ]}
        speed={400}
        easing="linear"
      >
        <CardSlider />
        <CardSlider />
        <CardSlider />
        <CardSlider />
        <CardSlider />
        <CardSlider />
        <CardSlider />
        <CardSlider />
        <CardSlider />
      </ReactSimplyCarousel>
    </div>
  );
}

export default ReactSimplyCarouselExample;
