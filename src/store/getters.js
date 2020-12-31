const getters = {
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  sourceRoutes: state => state.user.sourceRoutes,
  addRoutes: state => state.user.addRoutes,
  sidebarRouters: state => state.user.sidebarRouters,
}
export default getters
