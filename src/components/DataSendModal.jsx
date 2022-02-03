const DataSendModal = (props) => {
  return (
    <div className="modalOut">
      <div
        className={props.success === "success" ? "modalInSuccess" : "modalInFail"}
      >
        {props.success === "success" ? (
          <div>Adatok elmentve</div>
        ) : (
          <div>
            <div>Hibás adat</div>
            <div>Kérlek pontosan töltsd ki a mezőket</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataSendModal;
