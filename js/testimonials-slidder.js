document.addEventListener('DOMContentLoaded', ()=> {
const testimonialsContainer = document.querySelector(
  "#testimonials .test-container"
);

if (testimonialsContainer) {
  let testimonials = [];

  const leftArrow = document.querySelector(
    "#testimonials button[aria-label='slider left']"
  );
  const rightArrow = document.querySelector(
    "#testimonials button[aria-label='slider right']"
  );

  Array.from(testimonialsContainer.querySelectorAll(".test-item")).forEach(
    (ele) => {
      testimonials = [
        ...testimonials,
        {
          image: ele.querySelector(".test-image").src,
          comment: ele.querySelector(".test-comment").innerHTML,
          name: ele.querySelector(".test-name").innerHTML,
          job: ele.querySelector(".test-job").innerHTML,
        },
      ];
    }
  );

  let intervalId = setInterval(
    () => move(testimonialsContainer, testimonials, -1),
    2000
  );

  [leftArrow, rightArrow].forEach((btn) => {
    btn.addEventListener("mouseover", () => {
      clearInterval(intervalId);
    });

    btn.addEventListener("mouseleave", () => {
      intervalId = setInterval(
        () => move(testimonialsContainer, testimonials, -1),
        2000
      );
    });
  });

  leftArrow.addEventListener("click", () => {
    move(testimonialsContainer, testimonials, 1);
  });

  rightArrow.addEventListener("click", () => {
    move(testimonialsContainer, testimonials, -1);
  });
}

function getCard(testItem, isCurrent) {
  return `<div class="card border-0 test-item ${isCurrent ? "current" : ""}">
          <div class="row gy-5 gy-md-0 py-4">
            <div class="col-md-6 col-lg-5 text-center">
              <span class="test-wrapper">
                <img
                  src="${testItem.image}"
                  alt="testimonial"
                  class="test test-image"
                />
              </span>
            </div>
            <div class="col-lg-7 col-md-6">
              <p class="test-comment">
              ${testItem.comment}
              </p>
              <img src="images/stars.svg" alt="5 stars" />
              <span class="line d-block my-3" style="width: 230px"></span>
              <h3 class="test-name">${testItem.name}</h3>
              <p class="test-job">${testItem.job}</p>
            </div>
          </div>
        </div>`;
}

function move(container, items, step) {
  container.innerHTML = "";
  if (step == -1) {
    let item = items.shift();
    items.push(item);
  } else if (step == 1) {
    let item = items.pop();
    items.unshift(item);
  }

  Array.from(items).forEach((item, idx) => {
    if (!(idx == 1)) {
      container.innerHTML += getCard(item, false);
    } else {
      container.innerHTML += getCard(item, true);
    }
  });
}
});
