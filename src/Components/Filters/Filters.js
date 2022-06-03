import React, { useEffect, useRef, useState } from "react";
import "./Filters.css";
import Select from "react-select";
import { useFilter } from "../../Contexts";
import {
  BY_AUTHOR,
  BY_CATEGORY,
  BY_CREATOR,
  CLEAR_FILTER,
} from "../../Constants";
import useLockBodyScroll from "../../Hooks/useLockBodyScroll";
import useOnClickOutside from "../../Hooks/useOnClickOutside";

const Filters = ({ setShowFilter }) => {
  const { state, dispatch, allAuthors, allCategories, allCreator } =
    useFilter();

  const filterbarRef = useRef();

  useOnClickOutside(filterbarRef, () => setShowFilter(false));

  const [selectedAuthors, setSelectedAuthor] = useState([]);
  const [selectedCreator, setSelectedCreator] = useState([]);

  useEffect(() => {
    setSelectedAuthor(
      state.byAuthor.map((value) => ({ value: value, label: value }))
    );
  }, [state.byAuthor]);

  useEffect(() => {
    setSelectedCreator(
      state.byCreator.map((value) => ({ value: value, label: value }))
    );
  }, [state.byCreator]);

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
    <>
      <div
        className="btn btn-small btn-primary"
        onClick={() => setShowFilter(false)}
      >
        <span class="material-icons">apps</span>FILTERS
      </div>

      <div className="filter" ref={filterbarRef}>
        <span className="title resposnive-filter-title">Filters</span>
        <div className="filter-subdiv">
          <span className="by-author">By Author</span>
          <div>
            <Select
              value={selectedAuthors}
              onChange={handleAuthorChange}
              placeholder="Select Authors"
              styles={customStyles}
              options={authorOptions}
              isMulti
            />
          </div>
        </div>

        <div className="filter-subdiv">
          <span className="by-author">By Creator</span>
          <div>
            <Select
              value={selectedCreator}
              onChange={handleSelectorChange}
              placeholder="Select Creator"
              styles={customStyles}
              options={creatorOptions}
              isMulti
            />
          </div>
        </div>
        <div className="filter-subdiv">
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

        <div
          className="btn btn-small btn-primary-outline clear-filter-btn"
          onClick={() => {
            dispatch({ type: CLEAR_FILTER });
          }}
        >
          <span class="material-icons">clear_all</span>Clear
        </div>

        <button
          className="btn btn-primary-outline btn-filter-responsive"
          onClick={() => setShowFilter(false)}
        >
          Apply and Close
        </button>
      </div>
    </>
  );
};

export default Filters;
