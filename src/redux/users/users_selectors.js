import { createSelector } from "reselect";

export const getUsersSelector = state => {
    return state.usersPage.users
};

//чтобы компонент не перерендорелся каждый раз при сложном селекте,
// используем библиотеку reselect
export const getUsers = createSelector(getUsersSelector,
    //getUsersSelector - простой селектор(функция), users - состояние(которое будет меняться)
    (users) => {
    return users.filter(u => true)
});

export const getPageSize = state => {
    return state.usersPage.pageSize
};

export const getTotalItemsCount = state => {
    return state.usersPage.totalItemsCount
};

export const getCurrentPage = state => {
    return state.usersPage.currentPage
};

export const getIfFetching = state => {
    return state.usersPage.ifFetching
};

export const getFollowingInProgress = state => {
    return state.usersPage.followingInProgress
};

