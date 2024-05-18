import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
function Transactions() {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Abhijeet', email: 'abhijeet@example.com', balance: 1000 },
    { id: 2, name: 'Ankush', email: 'ankush@example.com', balance: 1500 },
    { id: 3, name: 'Abhi', email: 'abhi@example.com', balance: 2000 },
    { id: 4, name: 'Dilip', email: 'dilip@example.com', balance: 1200 },
    { id: 5, name: 'Vinayak', email: 'vinayak@example.com', balance: 800 },
    { id: 6, name: 'Romil', email: 'romil@example.com', balance: 2500 },
    { id: 7, name: 'Dhruv', email: 'dhruv@example.com', balance: 3000 },
    { id: 8, name: 'Dhruvi', email: 'dhruvi@example.com', balance: 900 },
    { id: 9, name: 'Lalit', email: 'lalit@example.com', balance: 1800 },
    { id: 10, name: 'Lalita', email: 'lalita@example.com', balance: 2100 },
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [transactionAmount, setTransactionAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [transfers, setTransfers] = useState([]);
  const [view, setView] = useState('home');
  const [suggestions, setSuggestions] = useState([]);

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setView('customer');
  };

  const handleTransaction = () => {
    if (!selectedCustomer || !recipient || isNaN(transactionAmount)) {
      return;
    }

    const updatedCustomers = customers.map((customer) => {
      if (customer.id === selectedCustomer.id) {
        return {
          ...customer,
          balance: customer.balance - parseFloat(transactionAmount),
        };
      } else if (customer.name === recipient) {
        return {
          ...customer,
          balance: customer.balance + parseFloat(transactionAmount),
        };
      } else {
        return customer;
      }
    });

    setCustomers(updatedCustomers);
    setTransfers([...transfers, { from: selectedCustomer.name, to: recipient, amount: parseFloat(transactionAmount) }]);
    setSelectedCustomer(null);
    setTransactionAmount('');
    setRecipient('');
    setView('customers');
  };

  const handleRecipientChange = (e) => {
    const value = e.target.value;
    setRecipient(value);

    if (value) {
      const filteredSuggestions = customers.filter((customer) =>
        customer.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (name) => {
    setRecipient(name);
    setSuggestions([]);
  };

  const renderHome = () => (
    <div className="text-center mt-5">
      <h2 className="text-2xl font-bold">View all Customers</h2>
      <button className="btn btn-primary mt-3" onClick={() => setView('customers')}>
        Transactions
      </button>
    </div>
  );

  const renderCustomers = () => (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Our Customers</h2>
            <div className="card mt-3 shadow">
              <ul className="list-group list-group-flush">
                {customers.map((customer) => (
                  <li key={customer.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{customer.name} - {customer.email}</span>
                    <span>Balance: {customer.balance}</span>
                    <button className="btn btn-link" onClick={() => handleSelectCustomer(customer)}>
                      Select
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button className="btn btn-secondary mt-3" onClick={() => setView('home')}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCustomerDetails = () => (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">{selectedCustomer.name}'s Details</h2>
            <div className="card mt-3 shadow">
              <div className="card-body">
                <p className="card-text">Name: {selectedCustomer.name}</p>
                <p className="card-text">Email: {selectedCustomer.email}</p>
                <p className="card-text">Balance: {selectedCustomer.balance}</p>
                <div className="d-flex justify-content-between mt-3">
                  <button className="btn btn-primary" onClick={() => setView('transfer')}>
                    Transfer Funds
                  </button>
                  <button className="btn btn-secondary" onClick={() => setView('customers')}>
                    Back to Customers
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTransfer = () => (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Transfer Funds</h2>
            <div className="card mt-3 shadow">
              <div className="card-body">
                <p className="card-text">
                  Transfer funds from {selectedCustomer.name} (Balance: {selectedCustomer.balance}) to:
                </p>
                <input
                  className="form-control mb-2"
                  type="text"
                  placeholder="Recipient's Name"
                  value={recipient}
                  onChange={handleRecipientChange}
                />
                {suggestions.length > 0 && (
                  <ul className="list-group mb-2">
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.id}
                        className="list-group-item list-group-item-action"
                        onClick={() => selectSuggestion(suggestion.name)}
                      >
                        {suggestion.name}
                      </li>
                    ))}
                  </ul>
                )}
                <input
                  className="form-control mb-2"
                  type="number"
                  placeholder="Enter amount"
                  value={transactionAmount}
                  onChange={(e) => setTransactionAmount(e.target.value)}
                />
                <div className="d-flex justify-content-between mt-3">
                  <button className="btn btn-primary" onClick={handleTransaction}>
                    Transfer
                  </button>
                  <button className="btn btn-secondary" onClick={() => setView('customers')}>
                    Back to Customers
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTransfers = () => (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Transfer History</h2>
            <div className="card mt-3 shadow">
              <ul className="list-group list-group-flush">
                {transfers.map((transfer, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>From: {transfer.from}</span>
                    <span>To: {transfer.to}</span>
                    <span>Amount: {transfer.amount}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button className="btn btn-secondary mt-3" onClick={() => setView('customers')}>
              Back to Customers
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen py-5">
      <div className="container">
        {view === 'home' && renderHome()}
        {view === 'customers' && renderCustomers()}
        {view === 'customer' && renderCustomerDetails()}
        {view === 'transfer' && renderTransfer()}
        {view === 'transfers' && renderTransfers()}
      </div>
    </div>
  );
}

export default Transactions;
