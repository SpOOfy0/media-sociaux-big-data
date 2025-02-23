const form = document.querySelector("form");
const graphs = document.querySelector("#graphs");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  event.stopImmediatePropagation();

  const loader = Loader.start(graphs);

  try {
    const query = form.querySelector("input").value;

    const response = await fetch(`/videos/${query}`);
    const json = await response.json();

    graphs.innerHTML = "";

    const pairs = document.createElement("img");
    pairs.src = json.pairs;
    graphs.appendChild(pairs);

    const importance = document.createElement("img");
    importance.src = json.importance;
    graphs.appendChild(importance);

    const outliers = document.createElement("img");
    outliers.src = json.outliers;
    graphs.appendChild(outliers);
  } catch (error) {
    console.error("Error fetching video data:", error);
    graphs.innerHTML = "<p>Something went wrong. Please try again later.</p>";
  } finally {
    Loader.stop(loader);
  }
});
