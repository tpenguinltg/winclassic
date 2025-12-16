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
  this.undoButton = document.getElementById("undo-button");
  this.redoButton = document.getElementById("redo-button");
  this.nameInput = document.getElementById("theme-name");

  this.undoButton.onclick = this.undo.bind(this);
  this.undoButton.disabled = true;
  this.redoButton.onclick = this.redo.bind(this);
  this.redoButton.disabled = true;

  for (var i = 0; i < this.pickers.length; i++) {
    var picker = this.pickers[i];
    var itemName = picker.dataset.item;
    this.updateFromStylesheet(itemName);
    picker.value = this.getItemColor(itemName);
    picker.oninput = this.onColorChange.bind(this);
    picker.onchange = this.onColorCommit.bind(this);
  }

  document.getElementById("import-action").onclick = function(e) {
    this.importIniSection(importSource.value);
  }.bind(this);

  document.getElementById("download-theme-action").onclick = function() {
    this.downloadTheme();
  }.bind(this);

  this.linkElementsToggle.onchange = function() {
    this.updateLinkedElements();

    // trigger a cascade
    this.setItemColor("ButtonFace", this.items["ButtonFace"].color);
    this.updateStylesheet();
    this.resetPickers();
    this.commit();
  }.bind(this);
  this.useGradientsToggle.onchange = function() {
    this.updateLinkedElements();

    // trigger a cascade
    this.setItemColor("ActiveTitle", this.items["ActiveTitle"].color);
    this.setItemColor("InactiveTitle", this.items["InactiveTitle"].color);
    this.updateStylesheet();
    this.resetPickers();
    this.commit();
  }.bind(this);

  this.displayExport();
  this.updateLinkedElements();

  this.commit();
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

WinClassicTheme.prototype.onColorCommit = function() {
  this.displayExport();
  this.commit();
}

WinClassicTheme.prototype.exportToIni = function() {
  var ini = "";
  for (var item in this.items) {
    var rgb = window.normalizeColor.rgba(window.normalizeColor(this.items[item].color));
    ini += item + "=" + rgb.r + " " + rgb.g + " " + rgb.b + "\n";
  }

  return ini.trim();
}

WinClassicTheme.prototype.exportToTheme = function() {
  return ""
    + "; Created with the Windows Classic Theme Designer: https://tpenguinltg.github.io/winclassic/\r\n"
    + "\r\n"
    + "\r\n"
    + "[Theme]\r\n"
    + "DisplayName=" + this.nameInput.value
    + "\r\n"
    + "\r\n"
    + "[Control Panel\\Colors]\r\n"
    + this.exportToIni().split("\n").join("\r\n") + "\r\n"
    + "\r\n"
    + "\r\n"
    + "[Control Panel\\Desktop]\r\n"
    + "Wallpaper=\r\n"
    + "TileWallpaper=0\r\n"
    + "WallpaperStyle=2\r\n"
    + "Pattern=\r\n"
    + "ScreenSaveActive=0\r\n"
    + "\r\n"
    + "[Control Panel\\Desktop\\WindowMetrics]\r\n"
    + "\r\n"
    + "[Metrics]\r\n"
    + "IconMetrics=76 0 0 0 75 0 0 0 75 0 0 0 1 0 0 0 245 255 255 255 0 0 0 0 0 0 0 0 0 0 0 0 144 1 0 0 0 0 0 1 0 0 0 0 84 97 104 111 109 97 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0  \r\n"
    + "NonclientMetrics=84 1 0 0 1 0 0 0 16 0 0 0 16 0 0 0 18 0 0 0 18 0 0 0 245 255 255 255 0 0 0 0 0 0 0 0 0 0 0 0 188 2 0 0 0 0 0 1 0 0 0 0 84 97 104 111 109 97 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 12 0 0 0 15 0 0 0 245 255 255 255 0 0 0 0 0 0 0 0 0 0 0 0 188 2 0 0 0 0 0 1 0 0 0 0 84 97 104 111 109 97 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 18 0 0 0 18 0 0 0 245 255 255 255 0 0 0 0 0 0 0 0 0 0 0 0 144 1 0 0 0 0 0 1 0 0 0 0 84 97 104 111 109 97 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 245 255 255 255 0 0 0 0 0 0 0 0 0 0 0 0 144 1 0 0 0 0 0 1 0 0 0 0 84 97 104 111 109 97 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 245 255 255 255 0 0 0 0 0 0 0 0 0 0 0 0 144 1 0 0 0 0 0 1 0 0 0 0 84 97 104 111 109 97 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0  \r\n"
    + "\r\n"
    + "[MasterThemeSelector]\r\n"
    + "MTSM=DABJDKT\r\n"
    + "ThemeColorBPP=4\r\n"
    + "\r\n"
    + "\r\n"
    + "\r\n"
    + "[VisualStyles]\r\n"
    + "Path=\r\n"
    + "ColorStyle=@themeui.dll,-854\r\n"
    + "Size=@themeui.dll,-2019\r\n"
    + "Transparency=0\r\n"
    + "ColorizationColor=0XEC" + this.items["ActiveTitle"].color.slice(1).toUpperCase() + "\r\n"
    + "Composition=0\r\n"
    + "VisualStyleVersion=10\r\n"
    + "\r\n"
    + "[boot]\r\n"
    + "SCRNSAVE.EXE=";
}

WinClassicTheme.prototype.displayExport = function() {
  this.exportDestination.value = this.exportToIni();
}

WinClassicTheme.prototype.downloadTheme = function() {
  var uri ="data:text/plain;charset=utf-8," + encodeURIComponent(this.exportToTheme());

  var element = document.createElement("a");
  element.setAttribute("href", uri);
  element.setAttribute("download", this.nameInput.value + ".theme");
  element.setAttribute("target", "_blank");

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
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
  this.commit();
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

WinClassicTheme.prototype.updateLinkedElements = function() {
  this.enableLinkedElements({
    button: this.linkElementsToggle.checked,
    titlebar: !this.useGradientsToggle.checked,
  });
}

WinClassicTheme.prototype.commit = function() {
  this.history.commit({
    linkedElements: {
      button: this.linkElementsToggle.checked,
      titlebar: !this.useGradientsToggle.checked,
    },
    items: this.items,
  });
  this.undoButton.disabled = this.history.undoLength <= 0;
  this.redoButton.disabled = this.history.redoLength <= 0;
}

WinClassicTheme.prototype.undo = function() {
  var state = this.history.undo();

  this.enableLinkedElements(state.linkedElements);
  this.linkElementsToggle.checked = state.linkedElements.button;
  this.useGradientsToggle.checked = !state.linkedElements.titlebar;

  this.items = state.items;
  this.updateStylesheet();
  this.resetPickers();
  this.displayExport();
  this.undoButton.disabled = this.history.undoLength <= 0;
  this.redoButton.disabled = this.history.redoLength <= 0;
}

WinClassicTheme.prototype.redo = function() {
  var state = this.history.redo();

  this.enableLinkedElements(state.linkedElements);
  this.linkElementsToggle.checked = state.linkedElements.button;
  this.useGradientsToggle.checked = !state.linkedElements.titlebar;

  this.items = state.items;
  this.updateStylesheet();
  this.resetPickers();
  this.displayExport();
  this.undoButton.disabled = this.history.undoLength <= 0;
  this.redoButton.disabled = this.history.redoLength <= 0;
}

return WinClassicTheme;
})(window);
