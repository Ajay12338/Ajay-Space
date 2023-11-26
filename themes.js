export const themes = (theme) => {
  if (theme === "dark") {
    document.getElementById("body-main").style.backgroundColor = "#000000";
    document.getElementById("body-main").style.color = "#ffffff";
    document.getElementById("tweet-input").classList.add("text-area-dark");
  } else {
    document.getElementById("body-main").style.backgroundColor = "#ffffff";
    document.getElementById("body-main").style.color = "#000000";
    document.getElementById("tweet-input").classList.remove("text-area-dark");
  }
};
