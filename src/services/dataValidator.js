import { datastructure } from "../datas/datastucture";

const dataValidatorByTypes = (data, type, require) => {
  let errors = [];
  let response;

  if (require & (data.length === 0)) {
    errors.push("required-data-need");
    response = "n.a";
  } else {
    switch (type) {
      case "text":
        if (data.length === 0) {
          response = "n.a";
        } else {
          response = data;
        }
        break;

      case "number":
        if (!new RegExp("^[0-9]*$").test(data)) {
          response = data;
        } else {
          response = 0;
          errors.push("numbers-required");
        }
        break;

      case "date": // elkészíteni
        response = data;
        break;

      case "web": // elkészíteni
        response = data;
        break;

      default:
        response = data;
        errors.push("not find a type");
        break;
    }
  }

  return [response, errors];
};

const carDataValidator = (dataArray) => {
  let responseArray = [];
  let errorArray = [];

  dataArray.map((data, i) => {
    const [response, error] = dataValidatorByTypes(
      data,
      datastructure[i][4],
      datastructure[i][3]
    );

    responseArray.push(response);
    errorArray.push(error);
  });

  return [responseArray, errorArray.flat()];
};

export { carDataValidator };
