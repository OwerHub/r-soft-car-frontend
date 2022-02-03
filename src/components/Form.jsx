import { useState, useEffect } from "react";
import { carDataValidator } from "../services/dataValidator";
import dateToEpoch from "../services/dateToEpoch";
import datastructure from "../datas/datastructure.json";

const FormComponent = (props) => {
  const [isValid, setValid] = useState(false);
  const [isCarDatas, setCarDatas] = useState([]);

  // kiszervezni

  //-------date
  /*  const dateToEpoch = (date, reverse = false) => {
    //console.log("epochFunct", date);
    if (reverse) {
      let time = new Date(date * 1000)
        .toLocaleDateString("en-US")
        .replace(/\//g, "-");

      return time;
    } else {
      return new Date(date).getTime();
    }

    //console.log(dateEpoch);
  }; */

  //----

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
      let url;
      try {
        url = new URL(value);
      } catch (_) {
        console.log("Nem valid url");
      }
    }

    if (type === "date") {
      const inputDate = dateToEpoch(value);
      const currentDate = Date.now();
      if (currentDate > inputDate) {
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

  //--------------marad--------------------------

  const inputChange = (e, iterator) => {
    //inputValidates(e.value, iterator);

    setDatasInArray(inputValidates(e.value, iterator), iterator);
    //console.log(isCarDatas);
  };

  const arrayValidator = (array) => {
    if (array.includes("required")) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  const setDatasInArray = (value, iterator) => {
    let tempArray = [...isCarDatas];
    tempArray[iterator] = value;
    setCarDatas(tempArray);
    //console.log(isCarDatas);
  };

  const setInputToDefault = () => {
    let defaultDatas = [];
    datastructure.forEach((element) => {
      defaultDatas.push(element[3] ? "required" : "");
    });
    setCarDatas(defaultDatas);
  };

  const datasToObject = (dataArray) => {
    let object = {};
    dataArray.map((data, iterator) => {
      object[datastructure[iterator][0]] = data;
    });

    return object;
  };

  const sendDatasToParent = (carObject) => {
    props.addNewCar(datasToObject(carObject));
  };

  const sendDatasToValidate = () => {
    //console.log("saving");
    if (isValid) {
      const [datas, errors] = carDataValidator(isCarDatas);
      if (errors.length === 0) {
        sendDatasToParent(datas);
      } else {
        console.log(errors);
      }
    }
  };

  useEffect(() => {
    setInputToDefault();
    console.log("timereverse", dateToEpoch("1643860138", true));
  }, []);

  useEffect(() => {
    arrayValidator(isCarDatas);
    //console.log("isCarData CHange");
    //console.log(isCarDatas);
  }, [isCarDatas]);

  return (
    <div>
      FormKomponent
      <div className="form">
        {isCarDatas &&
          datastructure &&
          datastructure.map((data, iterator) => (
            <div key={`fi${iterator}`}>
              <div>{data[1]}</div>
              <input
                type={data[2]}
                placeholder={data[3] ? "required" : ""}
                onChange={(e) => inputChange(e.target, iterator)}
                value={
                  data[3] && isCarDatas[iterator] === "required"
                    ? ""
                    : isCarDatas[iterator]
                }
              />
            </div>
          ))}
      </div>
      <div>átmeneti: {isValid ? "gomb valid" : "gomb nem valid"}</div>
      <div className="formButtons">
        <div className="formButtonValid" onClick={() => setInputToDefault()}>
          alaphelyzet
        </div>
        <div
          className={isValid ? "formButtonValid" : "formButtonInvalid"}
          onClick={() => sendDatasToValidate()}
        >
          Mentés
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
