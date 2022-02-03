import { useState, useEffect } from "react";
import { carDataValidator } from "../services/dataValidator";
import dateToEpoch from "../services/dateToEpoch";
import datastructure from "../datas/datastructure.json";
import inputValidates from "../services/inputValidator";

const FormComponent = (props) => {
  const [isValid, setValid] = useState(false);
  const [isCarDatas, setCarDatas] = useState([]);

  const inputChange = (e, iterator) => {
    setDatasInArray(inputValidates(e.value, iterator), iterator);
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
    dataArray.forEach((data, iterator) => {
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
