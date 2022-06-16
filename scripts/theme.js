window.Theme = (function(window) {

/* Generic Theme */
function Theme(items) {
  if (Array.isArray(items))
    this.items = items.reduce(function(acc, item) {
      acc[item] = {color: "#000000"};
      return acc;
    }, {});
  else
    this.items = {};

  this.linkedElements = {};

  return this;
}

Theme.prototype.setItemColor = function(item, color, ripple) {
  if (!this.items[item]) this.items[item] = {};
  this.items[item].color = toHexColor(window.normalizeColor(color) >>> 8);
  if (ripple !== false) this.rippleToLinkedElements(item);
}

Theme.prototype.getItemColor = function(item) {
  return (this.items[item])? this.items[item].color : "";
}

Theme.prototype.updateStylesheet = function(itemName) {
  function setItem(item) {
    document.documentElement.style.setProperty("--" + item, this.getItemColor(item));
  }

  if (itemName)
    setItem.call(this, itemName);
  else
    for (item in this.items)
      setItem.call(this, item);
}

Theme.prototype.updateFromStylesheet = function(itemName) {
  function getItem(item) {
    this.setItemColor(item, window.getComputedStyle(document.documentElement).getPropertyValue("--" + item).trim());
  }

  if (itemName)
    getItem.call(this, itemName);
  else
    for (item in this.items)
      getItem.call(this, item);
}

function rgbToRgb(r, g, b) {
  return [r, g, b];
}

var colorComponentConversions = {
  rgb: {
    fromRgb: rgbToRgb,
    toRgb: rgbToRgb,
    toCssString: function(r, g, b) {
      return "rgb(" + [r, g, b].map(function(c) { return Math.round(c); }).join() + ")";
    },
    components: ['r', 'g', 'b'],
  },
  hsl: {
    fromRgb: window.ColorConverter.rgbToHsl,
    toRgb: window.ColorConverter.hslToRgb,
    toCssString: function(h, s, l) {
      return "hsl(" + [h, s + "%", l + "%"].join() + ")";
    },
    components: ['h', 's', 'l'],
  },
};

Theme.prototype.rippleToLinkedElements = function(itemName) {
  var colorComponents = window.normalizeColor.rgba(window.normalizeColor(this.getItemColor(itemName)));
  for (var element in this.linkedElements[itemName]) {
    var transformer = this.linkedElements[itemName][element];
    if (!(transformer.type in colorComponentConversions))
      continue;

    var converter = colorComponentConversions[transformer.type];
    var convertedColor = converter.fromRgb(colorComponents.r, colorComponents.g, colorComponents.b);
    var transformedComponents = converter.components.map(function(component, i) {
      return transformer[component](convertedColor[i]);
    });
    var transformedColor = converter.toRgb.apply(null, transformedComponents);
    this.setItemColor(element, colorComponentConversions.rgb.toCssString.apply(null, transformedColor), false);
  }
}

function toHexColor(colorNum) {
  var hex = colorNum.toString(16);

  while (hex.length < 6) {
    hex = '0' + hex;
  }
  hex = '#' + hex;

  return hex;
}

return Theme;
})(window);
