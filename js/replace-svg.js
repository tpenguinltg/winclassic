/*
 * Replace all SVG images with inline SVG
 * From <http://stackoverflow.com/questions/11978995/how-to-change-color-of-svg-image-using-css-jquery-svg-image-replacement/11978996#11978996>
 */
function makeSvgInline()
  {
    jQuery('img[src$=".svg"]').each(function(){
        var  = jQuery(this);
        var imgID = .attr('id');
        var imgClass = .attr('class');
        var imgURL = .attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var  = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                 = .attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                 = .attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
             = .removeAttr('xmlns:a');

            // Replace image with new SVG
            .replaceWith();

        }, 'xml');

    });
  }
