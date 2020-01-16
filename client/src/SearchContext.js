import React from 'react';

const SearchContext = React.createContext('test');

export const SearchProvider = SearchContext.Provider;
export const SearchConsumer = SearchContext.Consumer;
export default SearchContext;
