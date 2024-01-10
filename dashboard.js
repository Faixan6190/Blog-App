import { addDoc, collection, db, getDocs } from "./firebase.js";

let parent = document.getElementById("parent");
let exampleModal = document.getElementById("exampleModal");
// console.log(parent, exampleModal);
let myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {
  keyboard: false,
});
// console.log(myModal);

window.addEventListener("load", async function () {
  //   console.log("Hello Dashboard");
  let uid = localStorage.getItem("uid");
  //  console.log("uid", uid)
  if (!uid) {
    location.href = "./index.html";
    return;
  }
  let blogArr = [];
  const querySnapshot = await getDocs(collection(db, "blogs"));
  querySnapshot.forEach(function (doc) {
    // console.log(doc.data().desc);
    // console.log(doc.data().title);
    // console.log(doc.data().uid);
    blogArr.push({
      title: doc.data().title,
      desc: doc.data().desc,
      uid: doc.data().uid,
      image: doc.data().image,
      blogId: doc.id,
      isPrivate: doc.data().isPrivate,
    });
  });
  // console.log(blogArr);

  for (let value of blogArr) {
    // console.log(value.isPrivate, "blogArr Value");
    if (value.isPrivate) {
      if (value.uid === uid) {
        parent.innerHTML += renderCardUI(
          value.title,
          value.desc,
          value.image,
          value.blogId,
          value.isPrivate
        );
      }
    } else {
      parent.innerHTML += renderCardUI(
        value.title,
        value.desc,
        value.image,
        value.blogId,
        value.isPrivate
      );
    }
  }
});

async function createBlog() {
  // console.log("createBlog");
  const title = document.getElementById("title");
  const desc = document.getElementById("desc");
  const privatePost = document.getElementById("privatePost").checked;
  const uid = localStorage.getItem("uid");
  // console.log(uid)
  // console.log(title, desc, privatePost);
  let blogObj = {
    title: title.value,
    desc: desc.value,
    uid: uid,
    image: "",
    isPrivate: privatePost,
  };
  const docRef = await addDoc(collection(db, "blogs"), blogObj);
  // console.log("docRef", docRef.uid);
  parent.innerHTML += renderCardUI(
    title.value,
    desc.value,
    "",
    docRef.id,
    privatePost
  );
  myModal.hide();
  title.value = "";
  desc.value = "";
  // console.log("docRef", docRef);
}

function renderCardUI(title, desc, image, id, isPrivate) {
  // console.log("UI is private", isPrivate);
  let lockValue = "";
  if (isPrivate) {
    lockValue = `<i class="fa-solid fa-lock"></i>`;
  } else {
    lockValue = "";
  }
  let UI = `<div class="card" style="width: 18rem">
  <img
    src="https://picsum.photos/300/200"
    class="card-img-top"
    alt="..."
  />
  <div class="card-body">
    <h5 class="card-title">${title} ${lockValue}</h5>
    <p class="card-text">
      ${desc}
    </p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`;
  return UI;
}

// window.addEventListener("load", async function () {
//   const querySnapshot = await getDocs(collection(db, "blogs"));
//   querySnapshot.forEach((doc) => {
//     // console.log(`${doc.id} => ${doc.data()}`);
//     // console.log(doc.data());
//   });
// });
window.createBlog = createBlog;
