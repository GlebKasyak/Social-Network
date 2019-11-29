import appReducer, { initializedSuccess } from "./app-reducer";

const initialState = {
    initialized: false
};

it("initialized should be true after changed", () => {
    const action = initializedSuccess();
    const newState = appReducer( initialState, action );

    expect(newState.initialized).toBe(true);
});