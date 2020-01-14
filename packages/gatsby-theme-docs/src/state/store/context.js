import { createContext } from 'react';
import PropTypes from 'prop-types';

export const StoreContext = createContext();

StoreContext.propTypes = {
    state: PropTypes.any,
    dispatch: PropTypes.any,
    writeError: PropTypes.any
};

export default StoreContext;
