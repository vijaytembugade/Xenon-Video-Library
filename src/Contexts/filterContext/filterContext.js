import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import {
  BY_AUTHOR,
  BY_CATEGORY,
  BY_CREATOR,
  CLEAR_FILTER,
} from "../../Constants";
import { getAllAuthors, getAllCategory, getAllCreator } from "../../Services";
import { useVideos } from "../videoContext/videoContext";
const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const [allCategories, setAllCategories] = useState([]);
  const { videos } = useVideos();

  const initialState = {
    byAuthor: [],
    byCreator: [],
    byCategory: [],
  };

  const filterReducer = (state, action) => {
    switch (action.type) {
      case BY_CATEGORY: {
        return {
          ...state,
          byCategory: !state.byCategory.includes(action.payload)
            ? [...state.byCategory, action.payload]
            : state.byCategory.filter(
                (category) => category !== action.payload
              ),
        };
      }
      case BY_AUTHOR: {
        return { ...state, byAuthor: action.payload };
      }

      case BY_CREATOR: {
        return { ...state, byCreator: action.payload };
      }
      case CLEAR_FILTER: {
        return { byAuthor: [], byCreator: [], byCategory: [] };
      }
    }
  };

  const [state, dispatch] = useReducer(filterReducer, initialState);

  const allAuthors = useMemo(() => getAllAuthors(videos), [videos]);
  const allCreator = useMemo(() => getAllCreator(videos), [videos]);

  useEffect(() => {
    (async () => {
      const categories = await getAllCategory();
      setAllCategories(categories);
    })();
  }, []);

  return (
    <FilterContext.Provider
      value={{ state, dispatch, allAuthors, allCategories, allCreator }}
    >
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("Error is useFilter");
  }

  return context;
};

export { useFilter, FilterProvider };
