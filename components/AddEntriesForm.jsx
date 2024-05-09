import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEntriesForm = () => {
  const navigate = useNavigate();
  const [entities, setEntities] = useState([]);
  const [selectedEntityType, setSelectedEntityType] = useState("");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/entities`
        );
        setEntities(response.data.entities);
      } catch (error) {
        console.error("Error fetching entities:", error);
      }
    };

    fetchEntities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEntityTypeChange = (e) => {
    setSelectedEntityType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:3000/entities/${selectedEntityType}`,
        { attributes: formData }
      );
      alert("Entity created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating entity:", error);
      alert("Error creating entity. Please try again.");
    }
  };

  const renderInputFields = () => {
    const selectedEntity = entities[selectedEntityType];
    if (!selectedEntity) return null;

    return Object.keys(selectedEntity).map(
      (attributeName) =>
        attributeName != "id" && (
          <div key={attributeName} className="mb-5">
            <label
              htmlFor={attributeName}
              className="mb-3 block text-base font-medium text-[#07074D] capitalize"
            >
              {attributeName}
            </label>
            <input
              type="text"
              name={attributeName}
              id={attributeName}
              placeholder={`Enter ${attributeName}`}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              value={formData[attributeName] || ""}
              onChange={handleChange}
            />
          </div>
        )
    );
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center my-2">Add Entries</h1>
      <div className="flex flex-col items-center justify-center p-12">
        <div className="my-4">
          <label htmlFor="entityType" className="mr-2 font-bold">
            Select Entity Type:
          </label>
          <select
            id="entityType"
            value={selectedEntityType}
            onChange={handleEntityTypeChange}
            className="px-2 py-1 border border-gray-300 rounded capitalize"
          >
            <option value="">Select Entity Type</option>
            {Object.keys(entities).map((entityName) => (
              <option key={entityName} value={entityName}>
                {entityName}
              </option>
            ))}
          </select>
        </div>
        <hr className="my-2" />
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleSubmit}>
            {renderInputFields()}
            <div>
              <button className="hover:shadow-form rounded-md bg-blue-800 py-3 px-8 text-base font-semibold text-white outline-none">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEntriesForm;