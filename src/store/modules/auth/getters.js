export const getters = {
    RULES: (state) => state.rules,
    IS_AUTH: (state) => (state.access_token ? true : false),
    user: (state) => state.user,
    role: (state) => state.role,
};