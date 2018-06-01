function WinClassicTheme() {
  Theme.call(this);

  var pickers = document.getElementsByClassName("color-item");

  for (var i = 0; i < pickers.length; i++) {
    var picker = pickers[i];
    var itemName = picker.dataset.item;
    this.updateFromStylesheet(itemName);
    picker.value = this.getItemColor(itemName);
    picker.oninput = this.onColorChange.bind(this);
  }

  return this;
}

Object.setPrototypeOf(WinClassicTheme.prototype, Theme.prototype);

WinClassicTheme.prototype.onColorChange = function(e) {
  var name = e.target.dataset.item;
  var color = e.target.value;
  this.setItemColor(name, color);
  this.updateStylesheet(name);
}
