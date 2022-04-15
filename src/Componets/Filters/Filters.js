import React from "react";
import "./Filters.css";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const Filters = () => {
  const customStyles = {
    option: (provided) => ({
      ...provided,
      padding: 5,
    }),
    container: (provided) => ({
      ...provided,
      width: 250,
    }),
    control: (base) => ({
      ...base,
      border: "1px solid var(--classic-color)",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid var(--classic-color)",
      },
    }),
  };
  return (
    <div className="filter">
      <div className="filter-subdiv">
        <span className="by-author">By Author</span>
        <div>
          <Select
            placeholder="Select Authors"
            styles={customStyles}
            options={options}
            isMulti
          />
        </div>
      </div>

      <div>
        <span className="by-author">By Creator</span>
        <div>
          <Select
            placeholder="Select Creator"
            styles={customStyles}
            options={options}
            isMulti
          />
        </div>
      </div>
      <div>By Category</div>
    </div>
  );
};

export default Filters;
