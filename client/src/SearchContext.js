import React from 'react';

const SearchContext = React.createContext({ name: '', region: '' });

export const SearchProvider = SearchContext.Provider;
export const SearchConsumer = SearchContext.Consumer;
export default SearchContext;
