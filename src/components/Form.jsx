import { useState, useEffect } from "react";
import { carDataValidator } from "../services/dataValidator";

import DataSendModal from "./DataSendModal";

import dateToEpoch from "../services/dateToEpoch";
import datastructure from "../datas/datastructure.json";
import inputValidates from "../services/inputValidator";

const FormComponent = (props) => {
  const [isValid, setValid] = useState(false);
  const [isCarDatas, setCarDatas] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

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

  const responseProtocol = (carsArray, errors) => {
    setTimeout(() => {
      setModalOpen(false);
    }, 3000);

    if (errors.length === 0) {
      setModalOpen("success");
      sendDatasToParent(carsArray);
    } else {
      setModalOpen("fail");
    }
  };

  const sendDatasToValidate = () => {
    if (isValid) {
      const [datas, errors] = carDataValidator(isCarDatas);
      responseProtocol(datas, errors);
    }
  };

  useEffect(() => {
    setInputToDefault();
  }, []);

  useEffect(() => {
    arrayValidator(isCarDatas);
  }, [isCarDatas]);

  return (
    <div className="formOut">
      <div className="formHead">Kérem az Adatokat</div>
      <div className="form">
        {isCarDatas &&
          datastructure &&
          datastructure.map((data, iterator) => (
            <div className="inputField" key={`fi${iterator}`}>
              <div>{data[1]}</div>

              <input
                type={data[2]}
                placeholder={data[3] ? "required" : ""}
                onChange={(e) => inputChange(e.target, iterator)}
                value={
                  data[3] && isCarDatas[iterator] === "required"
                    ? ""
                    : data[2] === "date"
                    ? "01-01-2022"
                    : isCarDatas[iterator]
                }
              />
            </div>
          ))}
      </div>
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
        {isModalOpen && <DataSendModal success={isModalOpen} />}
      </div>
    </div>
  );
};

export default FormComponent;
