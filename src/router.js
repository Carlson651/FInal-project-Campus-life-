export function initRouter() {
  function renderRoute() {
    const hash = location.hash || "#/";
    const view = document.getElementById("results");

    if (!view) return;

    switch (hash) {
      case "#/events":
        view.textContent = "Events page (placeholder)";
        break;
      case "#/clubs":
        view.textContent = "Clubs page (placeholder)";
        break;
      default:
        view.textContent = "Home (placeholder)";
    }
  }

  window.addEventListener("hashchange", renderRoute);
  renderRoute();
}
