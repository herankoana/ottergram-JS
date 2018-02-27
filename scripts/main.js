var DETAIL_IMAGE_SELECTOR = "[data-image-role=\"target\"]";
var DETAIL_TITLE_SELECTOR = "[data-image-role=\"title\"]";
var THUMBNAIL_LINK_SELECTOR = "[data-image-role=\"trigger\"]";
var NEXT_BUTTON_SELECTOR = "[data-button-role=\"gonext\"]";
var PREV_BUTTON_SELECTOR = "[data-button-role=\"goprev\"]";

function setDetails(imageUrl, titleText) {
  "use strict";
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute("src", imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-url");
}

function titleFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-title");
}

function setDetailsFromThumb(thumbnail) {
  "use strict";
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  "use strict";
  thumb.addEventListener("click", function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

function getThumbnailsArray() {
  "use strict";
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function nextImage() {
  "use strict";
  var thumbnails = getThumbnailsArray();
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  var detImgSrc = detailImage.getAttribute("src");
  var index = 0;

  for (var i = 0; i < thumbnails.length; i++){
    if (detImgSrc == thumbnails[i].getAttribute("href")){
      index = i + 1;
      if (index == thumbnails.length){
        index = 0;
        break;
      }
      break;
    }
  }

  setDetailsFromThumb(thumbnails[index]);
}

function prevImage() {
  "use strict";
  var thumbnails = getThumbnailsArray();
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  var detImgSrc = detailImage.getAttribute("src");
  var index = 0;

  for (var i = 0; i < thumbnails.length; i++){
    if (detImgSrc == thumbnails[i].getAttribute("href")){
      index = i - 1;
      if (index < 0){
        index = thumbnails.length - 1;
        break;
      }
      break;
    }
  }

  setDetailsFromThumb(thumbnails[index]);
}

function addNextPrevHandler() {
  "use strict";
  var prevButton = document.querySelector(PREV_BUTTON_SELECTOR);
  var nextButton = document.querySelector(NEXT_BUTTON_SELECTOR);
  prevButton.addEventListener("click", function(event) {
    event.preventDefault();
    prevImage();
  });

  nextButton.addEventListener("click", function(event) {
    event.preventDefault();
    nextImage();
  });
}

function initializeEvents() {
  "use strict";
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addNextPrevHandler();
}

initializeEvents();
