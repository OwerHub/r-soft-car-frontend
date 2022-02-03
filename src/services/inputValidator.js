import datastructure from "../datas/datastructure.json";
import dateToEpoch from "./dateToEpoch";

const inputValidates = (value, iterator) => {
  const type = datastructure[iterator][4];
  const required = datastructure[iterator][3];

  if (required & (value.length === 0)) {
    return "required";
  }

  if ((type === "number") & !new RegExp("^[0-9]*$").test(value)) {
    return "required";
  }

  if (type === "web") {
    try {
      new URL(value);
    } catch (_) {
      console.log("Nem valid url");
    }
  }

  if (type === "date") {
    console.log("timevalue", value);
    const inputDate = dateToEpoch(value);
    const currentDate = Date.now();

    if (currentDate >= inputDate) {
      console.log("date Okay");

      return inputDate;
    } else {
      console.log("date too much");
      return "required";
    }
    // console.log(dateToEpoch(1643760000000, true));
  }

  /*   console.log("inputValidates");
	console.log(type, required); */

  return value;
};

export default inputValidates;
