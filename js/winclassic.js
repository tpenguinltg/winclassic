function WinClassicTheme() {
  Theme.call(this);

  this.pickers = document.getElementsByClassName("color-item");
  this.exportDestination = document.getElementById("export");
  var importSource = document.getElementById("import");

  for (var i = 0; i < this.pickers.length; i++) {
    var picker = this.pickers[i];
    var itemName = picker.dataset.item;
    this.updateFromStylesheet(itemName);
    picker.value = this.getItemColor(itemName);
    picker.oninput = this.onColorChange.bind(this);
    picker.onchange = this.displayExport.bind(this);
  }

  this.displayExport();

  document.getElementById("import-action").onclick = function(e) {
    this.importIniSection(importSource.value);
  }.bind(this);

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

WinClassicTheme.prototype.displayExport = function() {
  this.exportDestination.value = this.exportToIni();
}

WinClassicTheme.prototype.parseIniSection = function(content) {
  return content.split('\n').reduce(function(items, line) {
    var parsed = line.match(/^\s*([A-Za-z]+)\s*=\s*((?:[1-9]|1\d|2[0-4])?\d|25[0-5])\s*((?:[1-9]|1\d|2[0-4])?\d|25[0-5])\s*((?:[1-9]|1\d|2[0-4])?\d|25[0-5])\s*$/);
    if (parsed)
      items[parsed[1]] = "rgb(" + parsed.slice(2).join() + ")";
    return items;
  }, {});
}

WinClassicTheme.prototype.importIniSection = function(content) {
  var items = this.parseIniSection(content);
  console.log(items);
  for (var item in items) {
    this.setItemColor(item, items[item]);
    this.updateStylesheet(item);
  }
  this.resetPickers();
  this.displayExport();
}

WinClassicTheme.prototype.resetPickers = function() {
  for (var i = 0; i < this.pickers.length; i++) {
    var picker = this.pickers[i];
    picker.value = this.getItemColor(picker.dataset.item);
  }
}
