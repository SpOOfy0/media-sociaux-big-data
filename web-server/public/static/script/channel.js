const form = document.querySelector("form");
const comments = document.querySelector("#comments");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  event.stopImmediatePropagation();

  comments.innerHTML = "";

  const loader = Loader.start(comments);

  try {
    const query = form.querySelector("input").value;

    const response = await fetch(`/channels/${query}`);
    const json = await response.json();

    json.result.forEach((result, i) => {
      const commentElement = document.createElement("div");
      commentElement.className = "comment";

      commentElement.innerHTML = `
        <div>${result.comment}</div>
        <div class="score ${json.sentiment[i].label.toLowerCase()}">
          ${Math.floor(json.sentiment[i].score * 100)}%
        </div>
        <div>${json.explaination[i][0].generated_text}</div>
      `;

      comments.appendChild(commentElement);
    });
  } catch (error) {
    console.error("Error fetching channel data:", error);
    comments.innerHTML = "<p>Something went wrong. Please try again later.</p>";
  } finally {
    Loader.stop(loader);
  }
});
