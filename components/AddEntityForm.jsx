import React, { useState } from "react";
import axios from "axios";
import SQLDataTypes from "./SQLDataTypes";
import { useNavigate } from "react-router-dom";

const AddEntityForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    entityName: "",
    attributes: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAttributeChange = (index, e) => {
    const newAttributes = [...formData.attributes];
    newAttributes[index][e.target.name] = e.target.value;
    setFormData({ ...formData, attributes: newAttributes });
  };

  const addAttribute = () => {
    setFormData({
      ...formData,
      attributes: [...formData.attributes, { name: "", type: "" }],
    });
  };

  const removeAttribute = (indexToRemove) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      attributes: prevFormData.attributes.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedAttributes = formData.attributes.reduce(
        (acc, attribute) => {
          acc[attribute.name] = attribute.type;
          return acc;
        },
        {}
      );

      await axios.post(`http://localhost:3000/entity`, {
        name: formData.entityName,
        attributes: formattedAttributes,
      });
      alert("Entity created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating entity:", error);
      alert("Error creating entity. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center my-2">Create Entity</h1>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleSubmit}>
            <div className="mb-5 bg-blue-100 p-2 rounded border border-blue-200">
              <label
                htmlFor="entityName"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Entity Name
              </label>
              <input
                type="text"
                name="entityName"
                id="entityName"
                placeholder="Entity Name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.entityName}
                onChange={handleChange}
              />
            </div>
            <hr className="my-2" />
            {formData.attributes.map((attribute, index) => (
              <div
                key={index}
                className="mb-5 bg-blue-50 p-2 rounded border border-blue-200"
              >
                <div className="w-full flex justify-between items-center">
                  <label
                    htmlFor={`attribute-${index}`}
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Attribute {index + 1}
                  </label>
                  <button
                    type="button"
                    onClick={() => removeAttribute(index)}
                    className="rounded bg-red-500 py-1 px-2 text-xs font-semibold text-white outline-none"
                  >
                    Remove Attribute
                  </button>
                </div>
                <input
                  type="text"
                  name="name"
                  id={`attribute-${index}`}
                  placeholder="Attribute Name"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  value={attribute.name}
                  onChange={(e) => handleAttributeChange(index, e)}
                />
                <select
                  name="type"
                  id={`type-${index}`}
                  className="mt-3 w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  value={attribute.type}
                  onChange={(e) => handleAttributeChange(index, e)}
                >
                  <option value="">Select Type</option>
                  {SQLDataTypes.map((data) => (
                    <option key={data.id} value={data.type}>
                      {data.type}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <div>
              <button
                type="button"
                onClick={addAttribute}
                className="mb-5 hover:shadow-form rounded-md bg-blue-800 py-2 px-4 text-sm font-semibold text-white outline-none"
              >
                Add Attribute
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="hover:shadow-form rounded-md bg-blue-800 py-3 px-8 text-base font-semibold text-white outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEntityForm;
