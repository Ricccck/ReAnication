import React, { useState, userEffect, useEffect } from "react";

import Popup from "./Popup";

import { useTheme } from "@mui/material/styles";
import { Container } from "@mui/material";
import { Paper } from "@mui/material";
import { Box } from "@mui/material";
import { MobileStepper } from "@mui/material";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import infoService from "../services/info.service";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Home = (props) => {
  const { socket, username, setNavState, setShowNavbar } = props;
  const theme = useTheme();

  const [popupView, setPopupView] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [currentAnimeArr, setCurrentAnimeArr] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState("");
  const [favoriteAnimeArr, setFavoriteAnimeArr] = useState([]);
  const maxSteps = currentAnimeArr.length;

  useEffect(() => {
    infoService.currentAnimeInfo().then((res) => {
      setCurrentAnimeArr(res.works);
    });
  }, []);

  const openPopup = () => {
    setPopupView(true);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Container sx={{ width: 1 }}>
      {popupView === true && (
        <Popup
          socket={socket}
          username={username}
          selectedAnime={selectedAnime}
          setNavState={setNavState}
          setShowNavbar={setShowNavbar}
          setPopupView={setPopupView}
        />
      )}

      <Paper>
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {currentAnimeArr.map((data, i) => (
            <div key={data.id}>
              <Box
                component={"img"}
                sx={{
                  width: "100%",
                }}
                src={data.images.facebook.og_image_url}
                alt={data.title}
                onClick={(e) => {
                  openPopup();
                  console.log(data);
                  setSelectedAnime(data);
                }}
              />
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          variant="progress"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </Button>
          }
        />
      </Paper>
      <Paper>
        {favoriteAnimeArr.map((data, i) => (
          <Grid
            component={"img"}
            // src={data.images.facebook.og_image_url}
            // alt={data.title}
          />
        ))}
      </Paper>
    </Container>
  );
};

export default Home;
