import Actions from "../../state/actions"
import { useStore } from "../../state/store/hooks"

export const useTheme = () => {
  const { state, dispatch } = useStore()
  const { theme } = state
  const setTheme = theme => dispatch(Actions.setTheme(theme))

  return [theme, setTheme]
}
