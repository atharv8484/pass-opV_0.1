const upload_Image_block = document.querySelector(".uploadImage");
const website_inp = document.querySelector("#website_inp");
const email_inp = document.querySelector("#email_inp");
const password_inp = document.querySelector("#password_inp");
const link_inp = document.querySelector("#link_inp");
const folder_inp = document.querySelector("#folder_inp");
const save = document.querySelector("#save");
var formData = new FormData();
formData.append("abc", "abc");

upload_Image_block.addEventListener("click", () => {
  const fileElement = document.createElement("input");
  fileElement.setAttribute("type", "file");
  fileElement.click();
  const reader = new FileReader();
  fileElement.addEventListener("change", (e) => {
    const files = e.target.files;
    if (files.length >= 1) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      formData.append("logo", file);
      console.log(url);
      upload_Image_block.style.backgroundImage = `url(${url})`;
      upload_Image_block.style.backgroundSize = "cover"; // optional
      upload_Image_block.style.backgroundPosition = "center"; // optional
    }
  });
});
save.addEventListener("click", function () {
  const data = {
    website: website_inp.value,
    email: email_inp.value,
    link: link_inp.value,
    folder: folder_inp.value,
    password: password_inp.value,
    userName: document.getElementById("userName_inp").value,
  };
  if (
    [
      website_inp,
      email_inp,
      link_inp,
      folder_inp,
      password_inp,
      document.getElementById("userName_inp"),
    ].some(function (intups) {
      return intups.value === "";
    })
  ) {
    alert("fill the form the correctly  something is remaining ");
  } else {
    alert("good boi ");
    formData.append("data", JSON.stringify(data ,   null , 2));
    fetch("/create" , {
        method:"POST",
        body:formData
    }).then((res)=>{
      return res.json()
    }).then((res)=>{
      window.location.reload()
      // alert(res.error)
    })
  }
});
