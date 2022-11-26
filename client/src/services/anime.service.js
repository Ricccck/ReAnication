import axios from "axios"

import utilService from "./util.services";

const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

const currentAnimeInfo = async() => {
  const season = utilService.getCurrentSeason()
  return await axios.get(`https://api.annict.com/v1/works?filter_season=${season}&access_token=${ACCESS_TOKEN}`).then(res => {
    return res.data
  }
  )
}

const infoService = {
  currentAnimeInfo,
}

export default infoService