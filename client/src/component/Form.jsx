import React, { useState } from "react";
import axios from "axios";
import "./Form.css";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "", // Add phone field
    selectedBatch: "",
  });

  const [error, setError] = useState("");
  const [payment, setPayment] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showPayment = () => {
    setTimeout(() => {
      setPayment(true);
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (
      !formData.name ||
      !formData.age ||
      !formData.email ||
      !formData.phone || // Add phone field validation
      !formData.selectedBatch
    ) {
      setError("All fields are required");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email address");
      return;
    }

    if (isNaN(formData.age) || formData.age < 18 || formData.age > 65) {
      setError("Age must be a number between 18 and 65");
      return;
    }

    // Clear previous errors
    setError("");

    try {
      // Send data to the backend using Axios
      const response = await axios.post(
        "http://localhost:5000/saveUserData",
        formData
      );

      // Handle the response from the server (if needed)
      alert(response.data.message);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Admission Form</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="text"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="selectedBatch">Select Batch:</label>
          <select
            id="selectedBatch"
            name="selectedBatch"
            value={formData.selectedBatch}
            onChange={handleChange}
          >
            <option value="">Select Batch</option>
            <option value="6-7AM">6-7AM</option>
            <option value="7-8AM">7-8AM</option>
            <option value="8-9AM">8-9AM</option>
            <option value="5-6PM">5-6PM</option>
          </select>
        </div>

        <div className="form-group">
          <div className="payment-button" onClick={showPayment}>
            Proceed To Pay
          </div>
        </div>

        {payment && !error && (
          <>
            <div className="payment">
              <div>Make Payment Here</div>
              <input type="text" placeholder="Enter Your Upi Id" />
            </div>
            <button type="submit"> Pay $500 </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Form;
