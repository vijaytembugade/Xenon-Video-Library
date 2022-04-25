import React, { useState } from "react";
import "./Filters.css";
import Select from "react-select";
import { useFilter } from "../../Contexts";
import { BY_AUTHOR, BY_CATEGORY, BY_CREATOR } from "../../Constants";

const Filters = () => {
  const { state, dispatch, allAuthors, allCategories, allCreator } =
    useFilter();

  console.log(state);

  const [selectedAuthors, setSelectedAuthor] = useState([]);
  const [selectedCreator, setSelectedCreator] = useState([]);

  const authorOptions = allAuthors.map((author) => ({
    value: author,
    label: author,
  }));
  const creatorOptions = allCreator.map((creator) => ({
    value: creator,
    label: creator,
  }));

  function handleAuthorChange(select) {
    setSelectedAuthor(select);
    dispatch({ type: BY_AUTHOR, payload: select.map((value) => value.value) });
  }

  function handleSelectorChange(select) {
    setSelectedCreator(select);
    dispatch({ type: BY_CREATOR, payload: select.map((value) => value.value) });
  }

  function handleCategoryChange(e) {
    dispatch({ type: BY_CATEGORY, payload: e.target.value });
  }

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
            defaultValue={selectedAuthors}
            onChange={handleAuthorChange}
            placeholder="Select Authors"
            styles={customStyles}
            options={authorOptions}
            isMulti
          />
        </div>
      </div>

      <div>
        <span className="by-author">By Creator</span>
        <div>
          <Select
            defaultValue={selectedCreator}
            onChange={handleSelectorChange}
            placeholder="Select Creator"
            styles={customStyles}
            options={creatorOptions}
            isMulti
          />
        </div>
      </div>
      <div>
        <span className="by-author">By Category</span>
        <div className="category-filter-container">
          {allCategories.map((category) => {
            return (
              <label key={category._id} htmlFor={category.categoryName}>
                <input
                  type="checkbox"
                  id={category.categoryName}
                  onChange={handleCategoryChange}
                  value={category.categoryName}
                  checked={state.byCategory.includes(category.categoryName)}
                />
                <span>{category.categoryName}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Filters;
