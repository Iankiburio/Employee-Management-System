const Notification = ({status, msg}) => {
    return (
      <div style={{color: status === 'success' ? 'green' : 'red', backgroundColor: status === 'success' ? 'lightgreen' : 'lightcoral', padding: '10px', borderRadius: '5px'}}>
        <div className="text">{status}</div>
        <div className="text">{msg}</div>
      </div>
    )
  }

export default Notification