function BasicModal(props) {
  const { children, showModal, setShowModal, mh, mf } = props;

  if (showModal === false) {
    return null;
  }

  return (
    <div className="w3-modal">
      <div className="w3-modal-content w3-card-4">
        <header className="w3-container w3-teal">
          <span
            onClick={() => setShowModal(false)}
            className="w3-button w3-display-topright"
          >
            &times;
          </span>
          <h2>{mh}</h2>
        </header>
        <div className="w3-container">{children}</div>
        <footer className="w3-container w3-teal">
          <p>{mf}</p>
        </footer>
      </div>
    </div>
  );
}

export default BasicModal;
