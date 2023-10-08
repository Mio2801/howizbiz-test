export * from "./action";

export const authUser = (state) => state.auth.currentUser;
export const authLoading = (state) => state.auth.loading;
export const authErrorMessage = (state) => state.auth.errorMessage;
