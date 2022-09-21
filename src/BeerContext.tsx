// import React from 'react'
import { createContext } from "react";

const BeerContext = createContext({});
export const BeerProvider = BeerContext.Provider;
export const BeerConsumer = BeerContext.Consumer;
export default BeerContext;