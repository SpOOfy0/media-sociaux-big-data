/**
 * Loader API.
 * Kind of similar to the native Interval API.
 */
class Loader {
  /**
   * The loader HTML and CSS code.
   */
  static html;

  /**
   * Creates a new loader and append it inside the given element.
   * @param {HTMLElement} element The element to embed the loader in. 
   * @returns {HTMLElement} The loader element.
   */
  static start(element) {
    const loader = document.createElement("div");
    loader.classList.add("loader");

    loader.innerHTML = Loader.html;

    element.appendChild(loader);
    return loader;
  }

  /**
   * Stops a given loader.
   * @param {HTMLElement} loader The loader to stop.
   */
  static stop(loader) {
    loader.parentNode.removeChild(loader);
  }
}

fetch("/static/html/loader.html")
  .then(res => res.text())
  .then(res => Loader.html = res);