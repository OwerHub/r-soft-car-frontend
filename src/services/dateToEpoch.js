const dateToEpoch = (date, reverse = false) => {
  //console.log("epochFunct", date);
  if (reverse) {
    let time = new Date(date * 1000).toLocaleDateString("en-US").replace(/\//g, "-");

    return time;
  } else {
    return new Date(date).getTime();
  }

  //console.log(dateEpoch);
};

export default dateToEpoch;
