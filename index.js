import { tweetsData } from "./data.js";

let usersUUID = [];
let initialStrings = ["abc", "cdf", "gfg", "xyz"];
const tweetBtn = document.getElementById("tweet-btn");
const textAreaInput = document.getElementById("tweet-input");
const parentBody = document.getElementById("body");
const toggleBtn = document.getElementById("toggle-btn");
const closeModal = document.getElementById("clear-modal");
const themes = (theme) => {
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
if (toggleBtn.checked) themes("dark");
toggleBtn.addEventListener("click", () => {
  if (toggleBtn.checked) {
    themes("dark");
  } else {
    themes("light");
  }
});

const generateUserUUID = () => {
  let randomNumber = Math.floor(Math.random() * 100000000000000);
  let randomString =
    initialStrings[Math.floor(Math.random() * initialStrings.length)];
  let uuId = randomString + randomNumber;

  while (usersUUID.includes(uuId)) {
    randomNumber = Math.floor(Math.random() * 100000000000000);
    randomString =
      initialStrings[Math.floor(Math.random() * initialStrings.length)];
    uuId = randomString + randomNumber;
  }
  usersUUID.push(uuId);
  return uuId;
};

const generateUserCardAndRender = () => {
  let userDivText = "";
  const currUUID = generateUserUUID();
  const currentTxtValue = textAreaInput.value;
  if (currentTxtValue) {
    userDivText += generateCard(
      "@Ajay",
      currentTxtValue,
      "images/my_img.png",
      currUUID,
      [0, 0, 0]
    );
    tweetsData.push({
      handle: "@Ajay",
      profilePic: "images/my_img.png",
      likes: 0,
      retweets: 0,
      tweetText: currentTxtValue,
      replies: [],
      isLiked: false,
      isRetweeted: false,
      uuid: currUUID,
    });
  }
  textAreaInput.value = "";
  parentBody.innerHTML = userDivText + parentBody.innerHTML;
};

const staticBody = () => {
  let staticDivTxt = "";
  tweetsData.forEach((curr) => {
    staticDivTxt += generateCard(
      curr.handle,
      curr.tweetText,
      curr.profilePic,
      curr.uuid,
      [curr.replies.length, curr.likes, curr.retweets]
    );
  });
  parentBody.innerHTML = staticDivTxt;
};

const generateCard = (userId, msg, imageId, uuid, userInfo) => {
  return `
    <div class="cards">
        <div class="cards-inner-txt">
            <img src="${imageId}" id="img-${uuid}" alt="Scimbalogo" /> 
            <div class="cards-inner-txt-txt">
                <p>${userId}</p>
                <p>${msg}</p>
                <div class="card-inner-txt-txt-btns">
                <i class="fa-regular fa-comment-dots" id="comment-${uuid}">  ${userInfo[0]}</i>
                <i class="fa-regular fa-heart" id="like-${uuid}">   ${userInfo[1]}</i>
                <i class="fa-solid fa-retweet" id="retweet-${uuid}">   ${userInfo[2]}</i>
            </div> 
            <div class="main-sub-tweets hide" id="subtweet-${uuid}"></div>
            </div>  
        </div>
    </div>
    <hr>    
    `;
};

const fetchCurrentObject = (uuid) => {
  for (let tweet of tweetsData) {
    if (tweet.uuid === uuid) return tweet;
  }
};

const setColorAndChangeStyle = (
  currId,
  currValue,
  currColor,
  addStyle,
  removeStyle
) => {
  document.getElementById(currId).innerText = currValue;
  document.getElementById(currId).style.color = currColor;
  document.getElementById(currId).classList.add(addStyle);
  document.getElementById(currId).classList.remove(removeStyle);
};

const toggleLikeOrRetweet = (currId, type) => {
  const currentUuid = currId.substr(type.length + 1);
  const currObj = fetchCurrentObject(currentUuid);
  if (type === "like") {
    if (!currObj.isLiked)
      setColorAndChangeStyle(
        currId,
        currObj.likes + 1,
        "#ff0000",
        "fa-solid",
        "fa-regular"
      );
    else
      setColorAndChangeStyle(
        currId,
        currObj.likes,
        "#1da1f2",
        "fa-regular",
        "fa-solid"
      );
    currObj.isLiked = !currObj.isLiked;
  } else {
    if (!currObj.isRetweeted)
      setColorAndChangeStyle(
        currId,
        currObj.retweets + 1,
        "limegreen",
        "fa-soli",
        "fa-soli"
      );
    else
      setColorAndChangeStyle(
        currId,
        currObj.retweets,
        "#1da1f2",
        "fa-soli",
        "fa-soli"
      );
    currObj.isRetweeted = !currObj.isRetweeted;
  }
};

const generateSubCard = (currId) => {
  const currObj = fetchCurrentObject(currId.substr("comment-".length));
  let repliesStr = "";
  for (const reply of currObj.replies) {
    repliesStr += `
    <hr>
    <div class="sub-tweets">
      <img src="${reply.profilePic}" id="img-subtweet-${generateUserUUID()}">
      <div>
        <p>${reply.handle}</p>
        <p>${reply.tweetText}</p>
      </div>
    </div>`;
  }
  return repliesStr;
};
const generateImageModal = (src) => {
  document.getElementById("transparent-bg").style.display = "flex";
  document.getElementById("img-modal").style.background = `url("${src}")`;
  document.getElementById("img-modal").style.backgroundSize = "cover";
  document.getElementById("img-modal").style.backgroundPosition = "center";
  document.getElementById("body-main").style.overflow = "hidden";
};
const handleClicks = (e) => {
  const currId = e.target.id;
  if (currId.includes("comment")) {
    let repliesStr = generateSubCard(currId);
    let currDivId = `subtweet-${currId.substr("comment-".length)}`;
    let currElem = document.getElementById(currDivId);
    currElem.innerHTML = repliesStr;
    document.getElementById(currDivId).classList.toggle("hide");
  } else if (currId.includes("like")) {
    toggleLikeOrRetweet(currId, "like");
  } else if (currId.includes("retweet")) {
    toggleLikeOrRetweet(currId, "retweet");
  } else if (currId.includes("img")) {
    generateImageModal(e.target.src);
  }
};
closeModal.addEventListener("click", () => {
  document.getElementById("transparent-bg").style.display = "none";
  document.getElementById("body-main").style.overflow = "visible";
});
parentBody.addEventListener("click", handleClicks);
tweetBtn.addEventListener("click", generateUserCardAndRender);
staticBody();
