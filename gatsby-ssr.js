import React from "react"
import { renderToString } from "react-dom/server"
import { StoreProvider } from "./src/state"

export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
  const ConnectedBody = () => <StoreProvider>{bodyComponent}</StoreProvider>
  replaceBodyHTMLString(renderToString(<ConnectedBody />))
}
