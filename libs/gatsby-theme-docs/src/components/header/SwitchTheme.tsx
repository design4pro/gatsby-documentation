import Brightness4 from '@mui/icons-material/Brightness4';
import Brightness7 from '@mui/icons-material/Brightness7';
import BrightnessAuto from '@mui/icons-material/BrightnessAuto';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import React, { Fragment, useCallback, useEffect } from 'react';
import { useTheme } from '../../hooks/use-theme';
import { onBrowserThemeChanged } from '../../utils/browser-theme';

export const SwitchTheme = () => {
  const [theme, setTheme] = useTheme();

  const updateTheme = useCallback(
    (newTheme) => {
      setTheme(newTheme);
    },
    [setTheme]
  );
  const setDarkTheme = useCallback(() => updateTheme('dark'), [updateTheme]);
  const setLightTheme = useCallback(() => updateTheme('light'), [updateTheme]);
  const setAutoTheme = useCallback(() => updateTheme('auto'), [updateTheme]);

  useEffect(() => onBrowserThemeChanged(updateTheme), [updateTheme, setTheme]);

  return (
    <Fragment>
      {theme === 'auto' && (
        <Tooltip
          title="Toggle dark/light/auto theme"
          aria-label="Toggle dark/light/auto theme"
        >
          <IconButton onClick={setDarkTheme} color="inherit">
            <BrightnessAuto></BrightnessAuto>
          </IconButton>
        </Tooltip>
      )}

      {theme === 'light' && (
        <Tooltip
          title="Toggle auto/dark/light theme"
          aria-label="Toggle auto/dark/light theme"
        >
          <IconButton onClick={setAutoTheme} color="inherit">
            <Brightness4></Brightness4>
          </IconButton>
        </Tooltip>
      )}

      {theme === 'dark' && (
        <Tooltip
          title="Toggle light/auto/dark theme"
          aria-label="Toggle light/auto/dark theme"
        >
          <IconButton onClick={setLightTheme} color="inherit">
            <Brightness7></Brightness7>
          </IconButton>
        </Tooltip>
      )}
    </Fragment>
  );
};

export default SwitchTheme;
