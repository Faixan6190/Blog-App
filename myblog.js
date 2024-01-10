import { collection, db, getDocs, query, where } from "./firebase.js";

// console.log("myblog")

const parent = document.getElementById("parent");
window.addEventListener("load", async function () {
  // console.log("blogLoad")
  let uid = localStorage.getItem("uid");
  // console.log(uid)

  if (!uid) {
    location.href = "./index.html";
    return;
  } else {
    let q = query(collection(db, "blogs"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    //   console.log("querySnapshot", querySnapshot);
    let myBlogArr = [];
    querySnapshot.forEach(function (doc) {
      // console.log(doc.data());
      let data = doc.data();
      // console.log(data, "data");
      myBlogArr.push({
        title: data.title,
        desc: data.desc,
        uid: data.uid,
        image: data.image,
        blogId: doc.id,
        isPrivate: data.isPrivate,
      });
    });
    console.log("myblogArr", myBlogArr);
    for (let value of myBlogArr) {
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
function renderCardUI(title, desc, image, id, isPrivate) {
  //   console.log("UI is private", isPrivate);
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
      <h5 class="card-title"> ${title} ${lockValue}  </h5>
      <p class="card-text">
        ${desc}
      </p>

      <button class="btn btn-danger" id=${id}  onclick="deleteBlog(this)" >DELETE</button>
      <button class="btn btn-info"  id=${id} onclick="editBlog(this)" >EDIT</button>
      </div>
  </div>`;
  return UI;
}
