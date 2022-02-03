import { useState, useEffect } from "react";
import dateToEpoch from "../services/dateToEpoch";
import datastructure from "../datas/datastructure.json";

const TableComponent = (props) => {
  //const [isCarList, setCarlist] = useState([]);
  const [isTypesHead, setTypesHead] = useState([]);
  const [isTypesName, setTypesName] = useState([]);

  const epochStamp = (date) => {
    const chopped = date.toString().substring(0, 8);
    /*     console.log("chopped is", chopped); */
    const translatedDate = dateToEpoch(chopped, true);

    return translatedDate;
  };

  const createTypes = () => {
    let typesHead = [];
    let typesNames = [];
    datastructure.forEach((element) => {
      typesHead.push(element[1]);
      typesNames.push(element[0]);
    });
    setTypesHead(typesHead);
    setTypesName(typesNames);
  };

  useEffect(() => {
    console.log(createTypes());
  }, []);

  return (
    <div>
      <div className="table">
        <div className="tableHead">Autók listája</div>
        {isTypesName && isTypesHead && (
          <table>
            <thead>
              <tr>
                {isTypesHead.map((data, iterator) => (
                  <th key={iterator}>{data}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {props.tableDatas.map((car, iterator) => (
                <tr key={`tc${iterator}`}>
                  {isTypesName.map((dataType, iterator2) => (
                    <td key={`td${iterator2}`}>
                      {dataType === "date-of-manufakture"
                        ? dateToEpoch(car[dataType], true)
                        : car[dataType]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
