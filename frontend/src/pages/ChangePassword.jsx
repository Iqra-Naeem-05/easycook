// import React, { useState } from 'react';
// import axios from 'axios';
// import { Form, Button, Alert } from 'react-bootstrap';

// const ChangePassword = () => {
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     // Basic validation
//     if (!oldPassword || !newPassword || !confirmPassword) {
//       setError('All fields are required');
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setError('New password and confirm password must match');
//       return;
//     }

//     try {
//       const response = await axios.post(
//         'http://127.0.0.1:8000/api/change-password/', 
//         { old_password: oldPassword, new_password: newPassword },
//         { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
//       );
//       setSuccess('Password changed successfully');
//       setOldPassword('');
//       setNewPassword('');
//       setConfirmPassword('');
//     } catch (err) {
//       setError('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="change-password-form">
//       <h2 className="text-center">Change Password</h2>
//       {error && <Alert variant="danger">{error}</Alert>}
//       {success && <Alert variant="success">{success}</Alert>}

//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="oldPassword">
//           <Form.Label>Current Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Enter current password"
//             value={oldPassword}
//             onChange={(e) => setOldPassword(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="newPassword">
//           <Form.Label>New Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Enter new password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="confirmPassword">
//           <Form.Label>Confirm New Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Confirm new password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Button variant="primary" type="submit" block>
//           Change Password
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default ChangePassword;


import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [showCurrentPassword, setCurrentPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const { old_password, new_password, confirm_password } = formData;

    if (new_password !== confirm_password) {
      setError({ confirm_password: ["Passwords do not match."] });
      return;
    }

    if (new_password.length < 8 || !/\d/.test(new_password)) {
      setError({
        new_password: ["Password must be at least 8 characters and contain a number."],
      });
      return;
    }

    try {
      const response = await axios.post("/change-password/", {
        old_password,
        new_password,
      });
      // setMessage("Password changed successfully.");
      setMessage("Password changed successfully. Redirecting to login...");
      setTimeout(() => {
        logout();
        navigate("/login");
      }, 2000);
      setFormData({ old_password: "", new_password: "", confirm_password: "" });


      // setTimeout(() => navigate("/"), 2000); // Redirect after a brief delay
    } catch (err) {
      if (err.response?.data) {
        setError(err.response.data);
      } else {
        setError({ detail: "Something went wrong. Try again!" });
      }
    }
  };

  const toggleCurrentPassword = () => setCurrentPassword((prev) => !prev);
  const togglePassword = () => setShowPassword((prev) => !prev );
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev );

  return (
    <div className="container my-5">
      <div className="card shadow p-4 border-0 " style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 className="text-center text-navyBlue mb-4">Change Your Password</h2>

        {message && <p className="text-success fw-semibold text-center">{message}</p>}

        <form onSubmit={handleSubmit}>

          {/* Old Password */}
          <div className="mb-3 position-relative">
            <label className="form-label">Current Password</label>
            <input
              type={showCurrentPassword ? "text" : "password"}
              name="old_password"
              value={formData.old_password}
              onChange={handleChange}
              className="form-control form-control-sm "
              placeholder="Current Password"
              required
            />
             <span
              onClick={toggleCurrentPassword}
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              style={{ cursor: "pointer" }}
            >
              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
            {error?.old_password && <p className="ms-1 text-danger fw-light">{error.old_password[0]}</p>}

          {/* New Password */}
          <div className="mb-3 position-relative">
            <label className="form-label">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="new_password"
              value={formData.new_password}
              onChange={handleChange}
              className="form-control form-control-sm "
              placeholder="New Password"
              required
            />
            <span
              onClick={togglePassword}
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              style={{ cursor: "pointer" }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
            {error?.new_password && <p className="ms-1  text-danger fw-light">{error.new_password[0]}</p>}

          {/* Confirm Password */}
          <div className="mb-3 position-relative">
            <label className="form-label ">Confirm New Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="form-control form-control-sm "
              placeholder="Confirm New Password"
              required
            />
            <span
              onClick={toggleConfirmPassword}
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              style={{ cursor: "pointer" }}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
            {error?.confirm_password && <p className="ms-1 text-danger fw-light">{error.confirm_password[0]}</p>}

          {/* Backend error (general) */}
          {error?.detail && <p className="text-danger  text-center fw-light">{error.detail}</p>}

          <button type="submit" className="btn btn-navyBlue w-50 mx-6 fw-semibold">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
