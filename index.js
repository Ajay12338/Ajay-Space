import { tweetsData } from "./data.js";

let usersUUID = [];
let initialStrings = ["abc", "cdf", "gfg", "xyz"];
const tweetBtn = document.getElementById("tweet-btn");
const textAreaInput = document.getElementById("tweet-input");
const parentBody = document.getElementById("body");

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
            <img src="${imageId}" alt="Scimbalogo" /> 
            <div class="cards-inner-txt-txt">
                <p>${userId}</p>
                <p>${msg}</p>
                <div class="card-inner-txt-txt-btns">
                <i class="fa-regular fa-comment-dots" id="comment-${uuid}">  ${userInfo[0]}</i>
                <i class="fa-regular fa-heart" id="like-${uuid}">   ${userInfo[1]}</i>
                <i class="fa-solid fa-retweet" id="retweet-${uuid}">   ${userInfo[2]}</i>
            </div> 
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
        "#000000",
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
        "#000000",
        "fa-soli",
        "fa-soli"
      );
    currObj.isRetweeted = !currObj.isRetweeted;
  }
};
parentBody.addEventListener("click", (e) => {
  const currId = e.target.id;
  if (currId.includes("comment")) {
  } else if (currId.includes("like")) {
    toggleLikeOrRetweet(currId, "like");
  } else {
    toggleLikeOrRetweet(currId, "retweet");
  }
});
tweetBtn.addEventListener("click", generateUserCardAndRender);
staticBody();
