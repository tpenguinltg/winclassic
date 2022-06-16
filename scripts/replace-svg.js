/*
 * Replace all SVG images with inline SVG
 * Based on <http://stackoverflow.com/questions/11978995/how-to-change-color-of-svg-image-using-css-jquery-svg-image-replacement/11978996#11978996>
 */
function makeSvgInline() {
  document.querySelectorAll('img[src$=".svg"]').forEach(function(img) {
    var imgID = img.id;
    var imgClass = img.className;
    var imgURL = img.src;

    fetch(imgURL)
      .then((response) => response.text())
      .then((body) => (new DOMParser()).parseFromString(body, 'image/svg+xml'))
      .then((svg) => {
        var root = svg.documentElement;

        if (imgID) {
          root.id = imgID;
        }
        if (imgClass) {
          root.className += " replaced-svg " + imgClass;
        }

        return root;
      }).then((svg) => { img.replaceWith(svg) });
   });
}
