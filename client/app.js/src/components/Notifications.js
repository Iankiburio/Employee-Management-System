import React from 'react';

function Notifications() {
  return (
    <div className = 'notifications'>

      <p>Notifications</p>

    </div>
  )
}

export default Notifications;

/**const Notifications = () => {
  const [open, setOpen] = useState(true);
  if (open)
    return (
      <div
        className="notifications-container"
        style={{
          background: variant.mainColor,
          border: "0.1rem solid ",
        }}
      >
        <div
          className="symbol-container"
          style={{ background: variant.secondaryColor }}
        >
          <span class="material-symbols-outlined symbol">{variant.symbol}</span>{" "}
        </div>
        <div className="description-container">
          <span className="description-title">{variant.title}:</span>
          <span className="description-text">{variant.text}</span>
        </div>
        <a className="symbol-close-link" onClick={() => setOpen(false)}>
          <span class="material-symbols-outlined ">close</span>
        </a>
      </div>
    );
}*/

