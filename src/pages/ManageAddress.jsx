import { useState } from "react";
import { Link } from "react-router-dom";
import "./ManageAddress.css";

const emptyForm = {
  fullName: "",
  phone: "",
  addressLine: "",
  city: "",
  state: "",
  pincode: "",
};

const ManageAddresses = () => {
  // TODO: replace this with addresses fetched from GET /api/addresses
  const [addresses, setAddresses] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null); // null = adding new, else editing existing
  const [formData, setFormData] = useState(emptyForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNewClick = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (address) => {
    setFormData({
      fullName: address.fullName,
      phone: address.phone,
      addressLine: address.addressLine,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
    });
    setEditingId(address.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: validate fields (required, phone format, pincode format, etc.)

    if (editingId) {
      // TODO: call PUT /api/addresses/:id with formData
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingId ? { ...addr, ...formData } : addr
        )
      );
    } else {
      // TODO: call POST /api/addresses with formData
      const newAddress = { id: Date.now(), ...formData };
      setAddresses((prev) => [...prev, newAddress]);
    }

    setShowForm(false);
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    // TODO: call DELETE /api/addresses/:id
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  return (
    <div className="manage-addresses-page">
      <div className="manage-addresses-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">Manage Addresses</h2>
          {!showForm && (
            <button className="btn btn-primary btn-sm" onClick={handleAddNewClick}>
              + Add New Address
            </button>
          )}
        </div>

        {/* Inline Add/Edit Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="address-form shadow-sm mb-4">
            <h5 className="fw-semibold mb-3">
              {editingId ? "Edit Address" : "Add New Address"}
            </h5>

            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="col-12">
                <label htmlFor="addressLine" className="form-label">
                  Address Line
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="addressLine"
                  name="addressLine"
                  value={formData.addressLine}
                  onChange={handleChange}
                  placeholder="House no, street, locality"
                />
              </div>

              <div className="col-12 col-md-4">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                />
              </div>

              <div className="col-12 col-md-4">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                />
              </div>

              <div className="col-12 col-md-4">
                <label htmlFor="pincode" className="form-label">
                  Pincode
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                />
              </div>
            </div>

            <div className="d-flex gap-2 mt-4">
              <button type="submit" className="btn btn-primary">
                {editingId ? "Update Address" : "Save Address"}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Address List */}
        {addresses.length === 0 && !showForm && (
          <p className="text-secondary text-center py-5">
            No saved addresses yet. Click "Add New Address" to add one.
          </p>
        )}

        <div className="address-list">
          {addresses.map((address) => (
            <div key={address.id} className="address-card shadow-sm">
              <div className="address-card-body">
                <h6 className="fw-bold mb-1">{address.fullName}</h6>
                <p className="mb-1 text-secondary small">{address.phone}</p>
                <p className="mb-0 address-text">
                  {address.addressLine}, {address.city}, {address.state} -{" "}
                  {address.pincode}
                </p>
              </div>
              <div className="address-card-actions">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleEditClick(address)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(address.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <Link to="/" className="back-to-home-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManageAddresses;
