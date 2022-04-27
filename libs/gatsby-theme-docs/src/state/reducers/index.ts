import AppReducers from './app';

const createReducer = handlers => (state, action) => {
    if (!Object.prototype.hasOwnProperty.call(handlers, action.mode)) {
        return state;
    }

    return handlers[action.mode](state, action);
};

export default createReducer({
    ...AppReducers
});
