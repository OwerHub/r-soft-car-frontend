import "./App.css";
import { useState, useEffect } from "react";

import FormComponent from "./components/Form";
import TableComponent from "./components/Table";

function App() {
  const [isFormOpen, setFormOpen] = useState(false);
  const [isAllCars, setAllCars] = useState([]);

  const fetchAllCarDatas = async () => {
    fetch("http://localhost:8000/carDatas", {
      method: "GET",
      mode: "cors",
      "Content-Type": "application/json",
    }).then((response) =>
      response
        .json()
        .then((data) => localStorage.setItem("rsoft-carlist", JSON.stringify(data)))
    );
  };

  const deleteLocalStorage = () => {
    localStorage.removeItem("rsoft-carlist");
  };

  useEffect(() => {
    if (localStorage.getItem("rsoft-carlist")) {
      //setAllCars(localStorage.getItem("rsoft-carlist"));
      console.log("találtam");
      setAllCars(JSON.parse(localStorage.getItem("rsoft-carlist")));
    } else {
      console.log("még nincs");
      fetchAllCarDatas();
    }
  }, []);

  const addNewCar = (object) => {
    setAllCars([...isAllCars, object]);
  };

  console.log(isAllCars);
  return (
    <div className="App">
      <header>Car Datas</header>
      <section>
        {isFormOpen && <FormComponent addNewCar={addNewCar} />}

        <article>
          <div onClick={() => setFormOpen(!isFormOpen)}>Open Form</div>
        </article>
        <TableComponent tableDatas={isAllCars} />
      </section>
      <div onClick={() => deleteLocalStorage()}>deleteStorage</div>
    </div>
  );
}

export default App;
