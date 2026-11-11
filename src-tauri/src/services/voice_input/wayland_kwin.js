function reportJulingRouterApplication() {
  var window = workspace.showingDesktop ? null : workspace.activeWindow || workspace.activeClient;
  callDBus(
    '__JULING_ROUTER_SERVICE__',
    '/com/juling/router/IconBridge',
    'com.juling.router.IconBridge',
    'Focus',
    window ? String(window.desktopFileName || window.resourceClass || '') : '',
    window ? String(window.internalId || window.windowId || '') : ''
  );
}

(workspace.windowActivated || workspace.clientActivated).connect(reportJulingRouterApplication);
if (workspace.showingDesktopChanged)
  workspace.showingDesktopChanged.connect(reportJulingRouterApplication);
reportJulingRouterApplication();
