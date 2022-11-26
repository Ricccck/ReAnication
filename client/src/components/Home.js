import React, { useState, useEffect } from "react";

import Popup from "./Popup";

import { Container } from "@mui/material";
import { Paper } from "@mui/material";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";

import infoService from "../services/anime.service";

const Home = (props) => {
  const { username, setShowNavbar } = props;

  const [popupView, setPopupView] = useState(false);
  const [currentAnimeArr, setCurrentAnimeArr] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState("");
  const [favoriteAnimeArr, setFavoriteAnimeArr] = useState([]);

  useEffect(() => {
    infoService.currentAnimeInfo().then((res) => {
      setCurrentAnimeArr(res.works);
    });
  }, [setShowNavbar]);

  const openPopup = () => {
    setPopupView(true);
  };

  return (
    <Container>
      {popupView === true && (
        <Popup
          username={username}
          selectedAnime={selectedAnime}
          setShowNavbar={setShowNavbar}
          setPopupView={setPopupView}
        />
      )}
      
      <Paper>
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          initialSlide={currentAnimeArr[0]}
        >
          {currentAnimeArr.map((data) => (
            <SwiperSlide key={data.id}>
              <Box
                component={"img"}
                sx={{
                  width: "100%",
                }}
                src={data.images.facebook.og_image_url}
                alt={data.title}
                onClick={(e) => {
                  openPopup();
                  setSelectedAnime(data);
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Paper>
      <Paper>
        {favoriteAnimeArr.map((data, i) => (
          <Grid />
        ))}
      </Paper>
    </Container>
  );
};

export default Home;
