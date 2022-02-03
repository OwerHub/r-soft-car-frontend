import "./App.css";
import { useState, useEffect } from "react";

import { carDataValidator } from "./services/dataValidator";

import FormComponent from "./components/Form";
import TableComponent from "./components/Table";

function App() {
  const [isFormOpen, setFormOpen] = useState(false);
  const [isAllCars, setAllCars] = useState([]);

  const fetchAllCarDatas = async () => {
    const result = await fetch("http://localhost:8000/carDatas", {
      method: "GET",
      mode: "cors",
      "Content-Type": "application/json",
    });

    const jsonData = await result.json();
    localStorage.setItem("rsoft-carlist", JSON.stringify(jsonData));
    setAllCars(jsonData);
  };

  const deleteLocalStorage = () => {
    localStorage.removeItem("rsoft-carlist");
  };

  const buildUpProtocol = () => {
    const carDatas = JSON.parse(localStorage.getItem("rsoft-carlist"));

    let errors = [];

    carDatas.forEach((car) => {
      const carArray = Object.values(car);
      const [data, error] = carDataValidator(carArray);

      if (error.length !== 0) {
        errors.push(error);
      }
    });

    if (errors.length === 0) {
      setAllCars(carDatas);
    } else {
      fetchAllCarDatas();
    }
  };

  useEffect(() => {
    if (localStorage.getItem("rsoft-carlist")) {
      buildUpProtocol();
    } else {
      fetchAllCarDatas();
    }
  }, []);

  const addNewCar = (object) => {
    setAllCars([...isAllCars, object]);
    localStorage.setItem("rsoft-carlist", JSON.stringify([...isAllCars, object]));
  };

  return (
    <div className="App">
      <header>Car Datas</header>
      <section>
        {isFormOpen && <FormComponent addNewCar={addNewCar} />}

        <article>
          <div onClick={() => setFormOpen(!isFormOpen)}>
            ${isFormOpen ? "bezár" : "kinyit"}
          </div>
        </article>
        {isAllCars && <TableComponent tableDatas={isAllCars} />}
      </section>
      <div className="clearStorageButton" onClick={() => deleteLocalStorage()}>
        dev: clear storage
      </div>
    </div>
  );
}

export default App;
