// export const getters = {
//   isAuthenticated(state) {
//     return state.auth.loggedIn; // auth object as default will be added in vuex state, when you initialize nuxt auth
//   },
//   isAuthenticatedAdmin(state) {
//     return state.auth.user.admin;
//   },
//   getUserInfo(state) {
//     return state.auth.user;
//   },
// };

// export const actions = {
//   async getQuestions() {
//     let res = await this.$axios.get("/api/content");
//     return res;
//   },
//   async getQuestion(id) {
//     let res = await this.$axios.get("/api/content/question", {
//       params: { id: id },
//     });
//     return res;
//   },
// };
