// Scroll-to-the-bottom functionality for the "İletişim" button

document.querySelector(".contact-button").addEventListener("click", () => {
  window.scrollTo(0, document.body.scrollHeight);
});

// Contact Form Fetch

function sendEmail(){
    const emailParams = {
      userFirstName: document.getElementById("fName").value,
      userLastName: document.getElementById("lName").value,
      userEmail: document.getElementById("email").value,
      userMessage: document.getElementById("message").value
    }

    fetch("/contactFetch", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(emailParams)
    });
}

// Archive Gallery Application

function elementResizer(item, width, ratio){
    item.style.height = `${width*ratio}px`;
}

function archiveGalleryResize() {
    const archiveGalleryItem = document.querySelector(".carousel-inner");
    const archiveGalleryImg = document.querySelectorAll(".carousel-item img");
    const itemWidth = getComputedStyle(archiveGalleryItem).width.slice(0, -2);
    elementResizer(archiveGalleryItem, itemWidth, (9/16));
    archiveGalleryImg.forEach((img) => {
      elementResizer(img, itemWidth, (9/16));
    });
}

archiveGalleryResize();
window.addEventListener("resize", archiveGalleryResize);
