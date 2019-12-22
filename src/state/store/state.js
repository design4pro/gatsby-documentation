import { useEffect, useState } from "react"
import {
  useStorageListener,
  useStorageReader,
  useStorageWriter,
} from "./storage"

const createUseStorageState = storage => (key, defaultState) => {
  const savedState = useStorageReader(storage, key, defaultState)

  const [state, setState] = useState(savedState)
  const writeError = useStorageWriter(storage, key, state)
  useStorageListener(key, setState)

  useEffect(() => {
    setState(savedState)
  }, [key, savedState])

  return [state, setState, writeError]
}

export default createUseStorageState
