/* 
 createContext is a function in React that helps components
 share information with each other, even if they are not directly connected 
 in the component tree.
 createContext is like creating a central place where components can share 
 and access specific data without passing it
  down through many levels of the component tree manually.*/ 
import React, { createContext, useState, useEffect } from "react";

import { fetchDataFromApi } from "../utils/api";
export const Context = createContext();

//AppContext component is acting as the provider
export const AppContext = (props) => {
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("New");
    const [mobileMenu, setMobileMenu] = useState(false);

    //This sets up an effect that will run when the component mounts and 
    //whenever the selectedCategory state changes.
    // It calls the fetchSelectedCategoryData function to fetch data
    // based on the selected category.
    useEffect(() => {
        fetchSelectedCategoryData(selectedCategory);
    }, [selectedCategory]);

/* useEffect is a special function in React that allows you to perform tasks
 in your components that need to happen at specific times*/
    const fetchSelectedCategoryData = (query) => {
        setLoading(true);//state change to true 
        fetchDataFromApi(`search/?q=${query}`).then(({ contents }) => {
            console.log(contents);
            setSearchResults(contents);
            setLoading(false);
        });
    };
/* a Context Provider in React is like a special container that holds and shares 
information for components. It's used when you want multiple components to
 easily access and use the same data without having to pass it explicitly
  between them.
  AppContext component is acting as the provider.*/ 
    return (
        <Context.Provider
            value={{
                loading,
                setLoading,
                searchResults,
                selectedCategory,
                setSelectedCategory,
                mobileMenu,
                setMobileMenu,
            }}
        >
            {props.children}
        </Context.Provider>
/* props.children syntax is a way to include any components that are passed as 
children to the AppContext component.*/        
    );
};