{
  const jotDown = document.getElementById("jot-down");
  const promptText = document.getElementById("form-input-a").value;
  const descriptionText = document.getElementById("form-input-b").value;
  const sumbitForm = document.getElementById("submit-form");
  // const jotPad = document.getElementById("jot-pad");

  function openTheForm() {
    if (jotDown.style.display === "none") {
      jotDown.style.display = "block";
    } else {
      jotDown.style.display = "none";
    }
  }

  // // class Jot {
  // //   constructor(text) {
  // //     this.text = text;
  // //     this.isComplete = false;
  // //   }
  // // }

  class JotCards {
    constructor(selectedHtmlElement) {
      this.jotCard = JSON.parse(window.localStorage.getItem("jotCards")) || [];
      this.selectedHtmlElement =
        selectedHtmlElement || document.getElementById("jot-pad");
      this.render(this.jotCard);
    }

    render(chosenJotArray) {
      // this.selectedHtmlElement.innerHTML = "";
      // this.selectedHtmlElement.innerHTML = "";
      this.addPadWithJotCards(chosenJotArray);
    }

    addJotCardToPad(promptText, descriptionText) {
      if (
        promptText == "" ||
        promptText == null ||
        descriptionText == "" ||
        descriptionText == null
      ) {
        alert("Jot something down.");
      } else {
        this.jotCard.push(new JotCards(promptText));
        this.jotCard.push(new JotCards(descriptionText));
        this.saveJotsInLocalStorage();
      }
      this.render(this.jotCard);
    }

    addPadWithJotCards(chosenJotArray) {
      const jotCard = document.createElement("div");
      jotCard.className = "jot-card";
      chosenJotArray.forEach((jotCard, jotCardIndex) => {
        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");

        // add the front of the card
        const cardFront = document.createElement("div");
        cardFront.classList.add("card-face", "card-front");

        const promptContent = document.createElement("p");
        promptContent.classList.add("prompt-content");
        const inputA = document.createTextNode(promptText);
        sumbitForm.addEventListener("click", () => {
          promptText;
        });

        // add the back of the card
        const cardBack = document.createElement("div");
        cardBack.classList.add("card-face", "card-back");

        const DescriptionContent = document.createElement("p");
        DescriptionContent.classList.add("description-content");
        const inputB = document.createTextNode(descriptionText);
        sumbitForm.addEventListener("click", () => {
          descriptionText;
        });

        // add delete card button
        const deleteButton = document.createElement("button");
        deleteButton.createTextNode("\u00D7");
        deleteButton.classList.add("delete-button");
        deleteButton.setAttribute("aria-label", "Delete the current card");
        deleteButton.setAttribute("id", "delete-card");
        deleteButton.addEventListener("click", () => {
          jotPad.removeChild(jotCard);
          this.jotCard = this.jotCard
            .slice(0, jotCardIndex)
            .concat(this.jotCard.slice(jotCardIndex + 1, this.jotCard.length));
          this.saveJotsInLocalStorage();
          this.render(this.jotCard);
        });

        // add the flip button (flips from front to back)
        const flipButton = document.createElement("button");
        flipButton.createTextNode("\u21BA");
        flipButton.classList.add("flip-button");
        flipButton.setAttribute(
          "aria-label",
          "Flip to the back or front of the card"
        );
        flipButton.setAttribute("id", "flip-card");
        flipButton.addEventListener("click", () => {
          cardContent.classList.toggle("is-flipped");
          if (!cardFront) {
            flipButton.classList.add("display__none");
            isFrontCard = true;
          } else {
            flipButton.classList.remove("display__none");
            isFrontCard = false;
          }
        });

        promptContent.appendChild(inputA);
        cardFront.appendChild(promptContent);
        cardFront.appendChild(deleteButton);
        cardFront.appendChild(flipButton);
        DescriptionContent.appendChild(inputB);
        cardBack.appendChild(DescriptionContent);
        cardFront.appendChild(deleteButton);
        cardFront.appendChild(flipButton);
        cardContent.appendChild(cardFront);
        cardContent.appendChild(cardBack);
      });
      this.selectedHtmlElement.appendChild(jotCard);
    }

    saveJotsInLocalStorage() {
      window.localStorage.setItem("jotCards", JSON.stringify(this.jotCard));
    }
  }

  const JotIt = new JotCards();
}
