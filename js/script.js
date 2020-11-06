{
  const jotDown = document.getElementById("jot-down");

  // function openForm() {
  //   if (jotDown.style.display === "none") {
  //     jotDown.style.display = "block";
  //   } else {
  //     jotDown.style.display = "none";
  //   }
  // }
  function openTheForm() {
    if (jotDown.style.display === "none") {
      jotDown.style.display = "block";
    } else {
      jotDown.style.display = "none";
    }
  }

  if (window.localStorage.getItem("jots") == undefined) {
    let jots = [];
    window.localStorage.setItem("jots", JSON.stringify(jots));
  }

  let jots = JSON.parse(window.localStorage.getItem("jots"));

  class Jot {
    constructor(jotCard) {
      this.AddCardstoPad(jotCard);
    }

    AddCardstoPad(jotCard) {
      //Add jotCard
      const jotCard = document.createElement("div");
      jotCard.className = "jot-card";

      // Add card face container
      const cardContent = document.createElement("div");
      cardContent.classList.add("card-content");

      // Add front of card
      const cardFront = document.createElement("div");
      cardFront.classList.add("card-face", "card-front");
      const promptContent = document.createElement("p");
      promptContent.classList.add("prompt-content");
      const sumbitForm = document.getElementById("submit-form");
      sumbitForm.addEventListener("click", () => {
        const promptText = document.getElementById("form-input-a").value;
        if (promptText != "") {
          promptContent.push(promptText);
          window.localStorage.setItem("jots", JSON.stringify(jots));
        }
      });

      // Add back of card
      const cardBack = document.createElement("div");
      cardBack.classList.add("card-face", "card-back");
      const DescriptionContent = document.createElement("p");
      DescriptionContent.classList.add("description-content");
      const sumbitForm = document.getElementById("submit-form");
      sumbitForm.addEventListener("click", () => {
        const descriptionText = document.getElementById("form-input-b").value;
        if (descriptionText != "") {
          DescriptionContent.push(descriptionText);
          window.localStorage.setItem("jots", JSON.stringify(jots));
        }
      });

      // Add button to delete card
      const deleteButton = document.createElement("button");
      deleteButton.createTextNode("\u2425");
      deleteButton.classList.add("delete-button");
      deleteButton.setAttribute("aria-label", "Delete the current card");
      deleteButton.setAttribute("id", "delete-card");
      deleteButton.addEventListener("click", () => {
        this.AddCardDelete(jotCard);
      });

      // Add button to flip card face
      const flipButton = document.createElement("button");
      flipButton.createTextNode("\u21BA");
      flipButton.classList.add("flip-button");
      flipButton.setAttribute(
        "aria-label",
        "Flip to the back or front of the card"
      );
      flipButton.setAttribute("id", "flip-card");
      flipButton.addEventListener("click", () => {
        this.AddCardFlip;
      });

      //Append elements to the front of the card
      promptContent.appendChild(inputA);
      cardFront.appendChild(promptContent);
      cardFront.appendChild(deleteButton);
      cardFront.appendChild(flipButton);

      //Append elements to the back of the card
      DescriptionContent.appendChild(inputB);
      cardBack.appendChild(DescriptionContent);
      cardFront.appendChild(deleteButton);
      cardFront.appendChild(flipButton);

      //Append all JotCard elements
      cardContent.appendChild(cardFront);
      cardContent.appendChild(cardBack);
      jotCard.appendChild(cardContent);
    }

    AddCardDelete(jotCard) {
      jotPad.parentNode.removeChild(jotCard);
      let index = jots.indexOf(jotCard);
      jots.splice(index, 1);
      window.localStorage.setItem("jots", JSON.stringify(jots));
    }

    AddCardFlip() {
      cardContent.classList.toggle("is-flipped");
      if (!cardFront) {
        flipButton.classList.add("display__none");
        isFrontCard = true;
      } else {
        flipButton.classList.remove("display__none");
        isFrontCard = false;
      }
    }
  }

  for (let c = 0; c < jots.length; c++) {
    new Jot(jots[c]);
  }
}
