let inputColor = document.querySelector("input");
let createBtn = document.querySelector(".creat-note-btn");
let list = document.querySelector(".list");
let closeBtn = document.querySelector(".close");
let colorIndecator = document.querySelector(".color-circle");
let inputImage = document.querySelector(".imgUpload");

let topIndex = 1;

inputColor.addEventListener("input", e => {
    colorIndecator.style.left = e.target.value * 90 / 360 + "%";
    colorIndecator.style.background = `hsl(${e.target.value}, 80%, 85%)`
})

inputImage.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            let imgCard = document.createElement("div");
            imgCard.classList.add("card");
            imgCard.classList.add("img");
            imgCard.style.zIndex = topIndex;
            topIndex += 1;

            imgCard.innerHTML = `
            <span class="close">x</span>
                <div class="image">
                    <img src="${e.target.result}">
                </div>`

            let img = imgCard.querySelector("img");
            console.log(img);
            img.addEventListener("mousedown", () => console.log("clicked"))
            list.appendChild(imgCard);
        }
        reader.readAsDataURL(file)
    }
})

createBtn.onclick = () => {
    let newNote = document.createElement("div");
    newNote.classList.add("card");
    newNote.classList.add("note");
    newNote.style.background = `hsl(${inputColor.value}, 80%, 85%)`;
    newNote.style.borderTopColor = `hsl(${inputColor.value}, 30%, 60%)`;

    newNote.innerHTML = `
    <span class="close">x</span>
    <textarea placeholder="Write note...." rows="10" cols="30"></textarea>`

    newNote.style.zIndex = topIndex;
    newNote.querySelector("textarea").addEventListener("focus", e => addToTop(e.target))

    list.appendChild(newNote)
}

document.addEventListener("click", e => {
    if (e.target.classList.contains("close")) {
        e.target.parentNode.remove()
    }
})


let cursor = {
    x: null,
    y: null
}

let card = {
    dom: null,
    x: null,
    y: null
}

document.addEventListener("mousedown", e => {
    if (e.target.classList.contains("card")) {
        cursor = {
            x: e.clientX,
            y: e.clientY
        }
        card = {
            dom: e.target,
            x: e.target.getBoundingClientRect().left,
            y: e.target.getBoundingClientRect().top
        }

        topIndex += 1;
    }
})

document.addEventListener("mousemove", e => {
    if (card.dom == null) return;

    let currentCursor = {
        x: e.clientX,
        y: e.clientY
    }
    let distunce = {
        x: currentCursor.x - cursor.x,
        y: currentCursor.y - cursor.y
    }

    card.dom.style.left = (card.x + distunce.x) + "px";
    card.dom.style.top = (card.y + distunce.y) + "px";
    card.dom.style.cursor = "grabbing";
    card.dom.style.zIndex = topIndex;
})

document.addEventListener("mouseup", () => {
    if (card.dom == null) return;
    card.dom.style.cursor = "auto";
    card.dom = null;
})

function addToTop(dom) {
    dom.parentNode.style.zIndex = topIndex;
    topIndex += 1;
}