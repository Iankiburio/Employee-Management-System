import React from "react";

class LeaveAllocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveBalances: {
        "Annual leave": 30,
        "Study leave": 10,
        "Sick leave": 20,
        Vacation: 10,
        "Paternity leave": 14,
        "Maternity leave": 90,
      },
    };
  }

  componentDidMount() {
    // Allocate leave balances based on employee gender
    const { gender } = this.props;
    if (gender === "female") {
      delete this.state.leaveBalances["Paternity leave"];
    } else if (gender === "male") {
      delete this.state.leaveBalances["Maternity leave"];
    }
    this.setState({ leaveBalances: this.state.leaveBalances });
  }

  render() {
    const { leaveBalances } = this.state;

    return (
      <div>
        <h2>Leave Allocation Balances</h2>
        <ul>
          {Object.entries(leaveBalances).map(([leaveType, balance]) => (
            <li key={leaveType}>
              {leaveType}: {balance} days
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default LeaveAllocation;
