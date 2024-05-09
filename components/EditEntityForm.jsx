import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditEntityForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [selectedEntityData, setSelectedEntityData] = useState([]);

  useEffect(() => {
    const fetchEntityDetails = async () => {
      try {
        const entityId = location.pathname.split("/").pop();
        const entityName = location.pathname.split("/")[2];
        const response = await axios.get(
          `http://localhost:3000/entities/${entityName}/${entityId}`
        );
        setSelectedEntityData(response.data);
        const initialFormData = {};
        Object.keys(response.data).forEach((key) => {
          initialFormData[key] = "";
        });
        setFormData(initialFormData);
      } catch (error) {
        console.error("Error fetching entity details:", error);
      }
    };

    fetchEntityDetails();
  }, [location.pathname]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const entityId = location.pathname.split("/").pop();
      const entityName = location.pathname.split("/")[2];
      await axios.put(
        `http://localhost:3000/entities/${entityName}/${entityId}`,
        formData
      );
      navigate("/");
    } catch (error) {
      console.error("Error updating entity:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-4">Edit Entity</h1>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleSubmit}>
            {selectedEntityData.map((attribute) => (
              <div key={attribute.name} className="mb-5">
                <label
                  htmlFor={attribute.name}
                  className="mb-3 block font-medium"
                >
                  {attribute.name}
                </label>
                <input
                  type="text"
                  name={attribute.name}
                  id={attribute.name}
                  value={formData[attribute.name] || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 py-3 px-4"
                />
              </div>
            ))}
            <div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEntityForm;
