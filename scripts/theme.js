/* Generic Theme */
function Theme(items) {
  if (Array.isArray(items))
    this.items = items.reduce(function(acc, item) {
      acc[item] = {color: "#000000"};
    }, {});
  else
    this.items = {};

  return this;
}

Theme.prototype.setItemColor = function(item, color) {
  if (!this.items[item]) this.items[item] = {};
  this.items[item].color = toHexColor(window.normalizeColor(color) >>> 8);
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

function toHexColor(colorNum) {
  var hex = colorNum.toString(16);

  while (hex.length < 6) {
    hex = '0' + hex;
  }
  hex = '#' + hex;

  return hex;
}
