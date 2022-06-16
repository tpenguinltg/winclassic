window.WinClassicTheme = (function(window) {

function identity(x) { return x; }
function multiplyBy(m) { return function(n) { return m * n; }; }
var identityColor = {
  type: "rgb",
  r: identity,
  g: identity,
  b: identity,
};
var luminanceThreeHalves = {
  type: "hsl",
  h: identity,
  s: identity,
  l: multiplyBy(3/2),
};
var luminanceTwoThirds = {
  type: "hsl",
  h: identity,
  s: identity,
  l: multiplyBy(2/3),
};
var buttonLinkedElements = {
  ButtonFace: {
    // identity
    ActiveBorder: identityColor,
    ButtonLight: identityColor,
    InactiveBorder: identityColor,
    Menu: identityColor,

    // 3/2 luminance
    ButtonHilight: luminanceThreeHalves,
    Scrollbar: luminanceThreeHalves,

    // 2/3 luminance
    AppWorkspace: luminanceTwoThirds,
    ButtonShadow: luminanceTwoThirds,
    GrayText: luminanceTwoThirds,
    InactiveTitle: luminanceTwoThirds,
  }
}
var titlebarLinkedElements = {
  // active title
  ActiveTitle: {
    GradientActiveTitle: identityColor,
  },
  GradientActiveTitle: {
    ActiveTitle: identityColor,
  },

  // inactive title
  InactiveTitle: {
    GradientInactiveTitle: identityColor,
  },
  GradientInactiveTitle: {
    InactiveTitle: identityColor,
  }
};

function WinClassicTheme() {
  Theme.call(this);
  var importSource = document.getElementById("import");

  this.pickers = document.getElementsByClassName("color-item");
  this.exportDestination = document.getElementById("export");
  this.linkElementsToggle = document.getElementById("link-elements");
  this.useGradientsToggle = document.getElementById("use-gradients");

  for (var i = 0; i < this.pickers.length; i++) {
    var picker = this.pickers[i];
    var itemName = picker.dataset.item;
    this.updateFromStylesheet(itemName);
    picker.value = this.getItemColor(itemName);
    picker.oninput = this.onColorChange.bind(this);
    picker.onchange = this.displayExport.bind(this);
  }

  document.getElementById("import-action").onclick = function(e) {
    this.importIniSection(importSource.value);
  }.bind(this);

  var updateLinkedElements =
    this.linkElementsToggle.onchange =
    this.useGradientsToggle.onchange = function() {
      this.enableLinkedElements({
        button: this.linkElementsToggle.checked,
        titlebar: !this.useGradientsToggle.checked,
      });
    }.bind(this);

  this.displayExport();
  updateLinkedElements();

  return this;
}

WinClassicTheme.prototype = Object.create(Theme.prototype, {
  constructor: {
    value: WinClassicTheme,
    enumerable: false,
    writeable: true,
    configurable: true,
  }
});

WinClassicTheme.prototype.onColorChange = function(e) {
  var name = e.target.dataset.item;
  var color = e.target.value;
  this.setItemColor(name, color);
  this.updateStylesheet();
  this.resetPickers();
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

WinClassicTheme.prototype.enableLinkedElements = function(types) {
  var enabledElementLinks = {};

  if (types.button) {
    Object.assign(enabledElementLinks, buttonLinkedElements);
  }
  if (types.titlebar) {
    Object.assign(enabledElementLinks, titlebarLinkedElements);
  }

  this.linkedElements = enabledElementLinks;
}

return WinClassicTheme;
})(window);
