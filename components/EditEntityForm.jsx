import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditEntityForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [entity, setEntity] = useState([]);

  useEffect(() => {
    const fetchEntityDetails = async () => {
      try {
        const entityId = location.pathname.split("/").pop();
        const entityName = location.pathname.split("/")[2];
        const response = await axios.get(
          `http://localhost:3000/entities/${entityName}/${entityId}`
        );
        setEntity([response.data]);
        const initialFormData = {};
        Object.keys(response.data).forEach((key) => {
          initialFormData[key] = response.data[key].value || "";
        });
        setFormData(initialFormData);
      } catch (error) {
        console.error("Error fetching entity details:", error);
      }
    };

    fetchEntityDetails();
  }, [location.pathname]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
            {entity.map((attribute) =>
              Object.keys(attribute).map(
                (key) =>
                  key != "id" && (
                    <div key={key} className="mb-5">
                      <label htmlFor={key} className="mb-3 block font-medium">
                        {key}
                      </label>
                      <input
                        type="text"
                        name={key}
                        id={key}
                        value={formData[key] || attribute[key]}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 py-3 px-4"
                      />
                    </div>
                  )
              )
            )}
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