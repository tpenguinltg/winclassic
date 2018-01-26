/*
 * Replace all SVG images with inline SVG
 * From <http://stackoverflow.com/questions/11978995/how-to-change-color-of-svg-image-using-css-jquery-svg-image-replacement/11978996#11978996>
 */
function makeSvgInline()
  {
    jQuery('img[src$=".svg"]').each(function(){
        var svg = jQuery(this);
        var imgID = svg.attr('id');
        var imgClass = svg.attr('class');
        var imgURL = svg.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var realSvg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                realSvg = realSvg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                realSvg = realSvg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
             realSvg = realSvg.removeAttr('xmlns:a');

            // Replace image with new SVG
            svg.replaceWith(realSvg);

        }, 'xml');

    });
  }
