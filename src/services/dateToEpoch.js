const dateToEpoch = (date, reverse = false) => {
  if (reverse) {
    const a = new Date(date * 1000);
    const time = a.getDate() + "-" + a.getMonth() + "-" + a.getFullYear();
    return time;
  } else {
    const array = date.split("-");
    const d = new Date(`${array[0]}/${array[1]}/${array[2]}`);
    const time = d.getTime() / 1000;
    return time;
  }
};

export default dateToEpoch;
