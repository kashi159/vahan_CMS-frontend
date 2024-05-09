import axios from "axios";
import React, { useState } from "react";

const EntityTable = ({ entities }) => {
  const [selectedEntityType, setSelectedEntityType] = useState("");
  const [selectedEntityData, setSelectedEntityData] = useState([]);

  const deleteEntityHandler = async (name, id) => {
    try {
      await axios.delete(
        `http://localhost:3000/entities/${name}/${id}`
      );
      console.log(`Entity with ID ${id} deleted successfully`);
      setSelectedEntityData(
        selectedEntityData.filter((entity) => entity.id !== id)
      );
    } catch (error) {
      console.error(`Error deleting entity with ID ${id}:`, error);
    }
  };

  const handleEntityTypeChange = async (e) => {
    const selectedType = e.target.value;
    setSelectedEntityType(selectedType);
    try {
      const response = await axios.get(
        `http://localhost:3000/entities/${selectedType}`
      );
      setSelectedEntityData(response.data);
    } catch (error) {
      console.error("Error fetching entity details:", error);
    }
  };

  const renderTableRows = () => {
    if (!selectedEntityData || selectedEntityData.length === 0) return null;

    return selectedEntityData.map((data, index) => (
      <tr key={index}>
        {Object.keys(data).map((key, index) => (
          <td key={index} className="px-6 py-4 whitespace-nowrap">
            {data[key]}
          </td>
        ))}
        <td className="px-6 py-4 whitespace-nowrap">
          <a
            href={`/edit-entity/${selectedEntityType}/${data.id}`}
            className="text-indigo-600 hover:bg-indigo-600 px-1 rounded hover:text-white"
          >
            Edit
          </a>
          <button
            onClick={() => deleteEntityHandler(selectedEntityType, data.id)}
            className="ml-2 text-red-600 hover:bg-red-600 px-1 rounded hover:text-white"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
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
      {selectedEntityType && (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-100">
            <tr>
              {selectedEntityData.length > 0 &&
                Object.keys(selectedEntityData[0]).map(
                  (attributeName, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {attributeName}
                    </th>
                  )
                )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {renderTableRows()}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EntityTable;
