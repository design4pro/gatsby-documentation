import React from "react"
import { StoreProvider } from "./src/state"

export const wrapPageElement = ({ element }) => (
  <StoreProvider>{element}</StoreProvider>
)
