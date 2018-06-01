function WinClassicTheme() {
  Theme.call(this);

  var pickers = document.getElementsByClassName("color-item");
  var exportDestination = document.getElementById("export");

  for (var i = 0; i < pickers.length; i++) {
    var picker = pickers[i];
    var itemName = picker.dataset.item;
    this.updateFromStylesheet(itemName);
    picker.value = this.getItemColor(itemName);
    picker.oninput = this.onColorChange.bind(this);
    picker.onchange = function() {
      exportDestination.value = this.exportToIni();
    }.bind(this);
  }

  exportDestination.value = this.exportToIni();

  return this;
}

Object.setPrototypeOf(WinClassicTheme.prototype, Theme.prototype);

WinClassicTheme.prototype.onColorChange = function(e) {
  var name = e.target.dataset.item;
  var color = e.target.value;
  this.setItemColor(name, color);
  this.updateStylesheet(name);
}

WinClassicTheme.prototype.exportToIni = function() {
  var ini = "";
  for (var item in this.items) {
    var rgb = window.normalizeColor.rgba(window.normalizeColor(this.items[item].color));
    ini += item + "=" + rgb.r + " " + rgb.g + " " + rgb.b + "\n";
  }

  return ini.trim();
}
