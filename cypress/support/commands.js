let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorageCache", () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorageCache", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

Cypress.Commands.add("clearLocalStorageCache", () => {
  localStorage.clear();
  LOCAL_STORAGE_MEMORY = {};
});

Cypress.Commands.add("getToken", () => {
  return cy.window().then((window) => {
    const keys = Object.keys(window.sessionStorage);
    const key = keys.find((element) => element.startsWith("firebase"));
    if (key) {
      return JSON.parse(window.sessionStorage.getItem(key)).stsTokenManager
        .accessToken;
    } else {
      return null;
    }
  });
});
