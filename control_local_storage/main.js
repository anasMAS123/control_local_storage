theInput = document.getElementById("the-input");
theInput2 = document.getElementById("the-input2");
theButtons = document.querySelectorAll(".buttons > span");
theResult = document.querySelector(".result");

theButtons.forEach((btn) => {
  btn.addEventListener("click", (btn) => {
    if (theInput.value === "") {
      if (btn.target.classList.contains("show-items")) {
        showItems();
      } else {
        emptyWarning();
      }
    } else {
      if (btn.target.classList.contains("check-item")) {
        checkItem();
      }

      if (btn.target.classList.contains("add-item")) {
        addItem();
      }

      if (btn.target.classList.contains("delete-item")) {
        deleteItem();
      }

      if (btn.target.classList.contains("show-items")) {
        showItems();
      }
    }
  });
});
function emptyWarning() {
  Swal.fire({
    title: "Error!",
    text: "empty input",
    icon: "error",
    confirmButtonText: "OK",
  });
}
function checkItem() {
  if (localStorage.getItem(theInput.value)) {
    theResult.innerHTML = `<span>${theInput.value}</span> is found in the local storage`;
  } else {
    theResult.innerHTML = `<span>${theInput.value}</span> not found in the local storage`;
  }
  theInput.value = "";
  theInput2.value = "";
}
function addItem() {
  if (theInput.value !== "" && theInput2.value !== "") {
    localStorage.setItem(theInput.value, theInput2.value);
    theResult.innerHTML = `<span>${theInput.value}</span> is added correctly`;
    Swal.fire({
      title: "Add",
      text: "Added",
      icon: "success",
      confirmButtonText: "Cool",
    });
    theInput.value = "";
    theInput2.value = "";
  } else {
    emptyWarning();
  }
}
function deleteItem() {
  if (localStorage.getItem(theInput.value)) {
    localStorage.removeItem(theInput.value);
    theResult.innerHTML = `<span>${theInput.value}</span> is deleted correctly`;
  } else {
    theResult.innerHTML = `<span>${theInput.value}</span> is not found in the local storage`;
  }
  theInput.value = "";
  theInput2.value = "";
}
function showItems() {
  if (localStorage.length) {
    theResult.innerHTML = "";

    for (let [key, value] of Object.entries(localStorage)) {
      let localSpan = document.createElement("span");
      let localWord = document.createTextNode(
        key + ` : ${localStorage.getItem(key)} `
      );
      localSpan.appendChild(localWord);
      theResult.appendChild(localSpan);
    }

    // method two by me :

    // Object.keys(localStorage).forEach((e) => {
    //   let localSpan = document.createElement("span");
    //   let localWord = document.createTextNode(
    //     e + ` : ${localStorage.getItem(e)} `
    //   );
    //   localSpan.appendChild(localWord);
    //   theResult.appendChild(localSpan);
    // });
  } else {
    theResult.innerHTML = `local storage is empty`;
  }
}
