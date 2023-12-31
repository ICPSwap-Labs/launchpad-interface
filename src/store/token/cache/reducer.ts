import { updateTokenInfo, updateTokenStandard, updateImportedToken } from "./actions";
import { initialState } from "./states";
import { createReducer } from "@reduxjs/toolkit";

export default createReducer(initialState, (builder) => {
  builder
    .addCase(updateTokenInfo, (state, { payload }) => {
      if (!!payload && !!payload.canisterId) {
        state.tokens[payload.canisterId] = payload;
      }
    })
    .addCase(updateTokenStandard, (state, { payload }) => {
      if (!!payload && !!payload.canisterId) {
        state.standards[payload.canisterId] = payload.standard;
      }
    })
    .addCase(updateImportedToken, (state, { payload }) => {
      if (!!payload && !!payload.canisterId) {
        state.importedTokens[payload.canisterId] = payload.metadata;
      }
    });
});
