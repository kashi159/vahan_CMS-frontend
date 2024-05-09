import React, { useEffect, useState } from "react";
import axios from "axios";
import EntityTable from "./EntityTable";

const EntityList = () => {
  const [entities, setEntities] = useState([]);

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
  // console.log(entities);

  return (
    <div className="container mx-auto size-full">
      <h1 className="text-3xl font-bold text-center my-4">Entity List</h1>
      <EntityTable entities={entities} />
    </div>
  );
};

export default EntityList;
