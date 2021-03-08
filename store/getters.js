const getters = {
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  userInfo: state => state.user.userInfo,
  sourceRoutes: state => state.user.sourceRoutes,
  addRoutes: state => state.user.addRoutes,
  sidebarRouters: state => state.user.sidebarRouters,
  theme: state => state.layout.theme,
}
export default getters
