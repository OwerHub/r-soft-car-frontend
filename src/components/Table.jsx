import { useState, useEffect } from "react";

const TableComponent = (props) => {
  const [isCarList, setCarlist] = useState([]);

  /*  useEffect(() => {
    setCarlist(props.tableDatas);
    console.log("iscarlist", isCarList.length);
  }, [props.tableDatas]); */

  console.log(props.tableDatas);

  const typesTemp = [
    "manufacturer",
    "model",
    "engine-capacity",
    "color",
    "version",
    "date-of-manufakture",
    "manufacturer-webpage",
  ];

  /// ---- map elé ellenőrizni

  return (
    <div>
      TableComponent
      <div className="table">
        <table>
          <thead>
            <tr>
              {typesTemp.map((data, iterator) => (
                <th key={iterator}>{data}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.tableDatas.map((car, iterator) => (
              <tr key={`tc${iterator}`}>
                {typesTemp.map((dataType, iterator2) => (
                  <td key={`td${iterator2}`}>{car[dataType]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
