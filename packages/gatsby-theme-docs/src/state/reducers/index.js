import AppReducers from './app';

const createReducer = handlers => (state, action) => {
    if (!Object.prototype.hasOwnProperty.call(handlers, action.type)) {
        return state;
    }

    return handlers[action.type](state, action);
};

export default createReducer({
    ...AppReducers
});
