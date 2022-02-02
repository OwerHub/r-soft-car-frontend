import { useState, useEffect } from "react";
import { carDataValidator } from "../datas/datastucture";

const FormComponent = () => {
  const [isValid, setValid] = useState(false);
  const [isCarDatas, setCarDatas] = useState([]);
  const [isTry, setTry] = useState(["sdad", "asdasd"]);

  const arrayValidator = (array) => {
    //console.log("array = ", array);
    if (array.includes("required")) {
      setValid(false);
      // console.log("nem valid");
    } else {
      setValid(true);
      // console.log("valid");
    }
  };

  const setDatasInArray = (value, iterator) => {
    let tempArray = [...isCarDatas];
    tempArray[iterator] = value;
    setCarDatas(tempArray);
    //console.log(isCarDatas);
  };

  const validates = {
    types: (e, iterator) => {
      // console.log("types", e.value);
      setDatasInArray(e.value, iterator);
      return e.value;
    },
    numbers: (e, iterator) => {
      if (e.value) {
        // console.log("numbers: ", e.value);
        setDatasInArray(e.value, iterator);
        return e.value;
      } else {
        return "required";
      }
    },
  };

  const inputs = [
    ["Gyártó", "text", true, validates.types],
    ["Típus", "text", true, validates.types],
    ["Hengerűrtartalom", "number", true, validates.numbers],
    ["Szín", "text", false, validates.types],
    ["Kiwitel", "text", false, validates.types],
    ["Gyártási időpont", "date", true, validates.types],
    ["Gyártó Weboldala", "text", false, validates.types],
  ];

  const setInputToDefault = () => {
    let defaultDatas = [];
    inputs.forEach((element) => {
      defaultDatas.push(element[2] ? "required" : "");
    });
    setCarDatas(defaultDatas);
  };

  const sendDatas = () => {
    console.log("save me");
    const [datas, errors] = carDataValidator(isCarDatas);

    if (errors.length === 0) {
      console.log(datas);
    } else {
      console.log(errors);
    }
  };

  useEffect(() => {
    setInputToDefault();
  }, []);

  useEffect(() => {
    arrayValidator(isCarDatas);
    console.log("isCarData CHange");
  }, [isCarDatas]);

  return (
    <div>
      FormKomponent
      <div className="form">
        {isCarDatas &&
          inputs.map((data, iterator) => (
            <div key={`fi${iterator}`}>
              <div>{data[0]}</div>
              <input
                type={data[1]}
                placeholder={data[2] ? "required" : ""}
                onChange={(e) => data[3](e.target, iterator)}
                value={
                  data[2] && isCarDatas[iterator] === "required"
                    ? ""
                    : isCarDatas[iterator]
                }
                /*  value={data[2] ? "" : isCarDatas[iterator]} */
                /*  onChange={(e) => {
                  let tryValue = [...isTry];
                  tryValue[1] = e.target.value;
                  console.log(tryValue);
                  setTry(tryValue);
                }}
                value={isTry[1]} */
              />

              {/* <div>
                data
                {data[2] && isCarDatas[iterator] === "required"
                  ? ""
                  : isCarDatas[iterator]}
              </div> */}
            </div>
          ))}
      </div>
      <div>átmeneti: {isValid ? "gomb valid" : "gomb nem valid"}</div>
      <div className="formButtons">
        <div className="formButton" onClick={() => setInputToDefault()}>
          alaphelyzet
        </div>
        <div className="formButton" onClick={() => sendDatas()}>
          Mentés
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
