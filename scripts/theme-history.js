window.ThemeHistory = (function() {
function ThemeHistory() {
  this.undoHistory = [];
  this.redoHistory = [];
  this.current = undefined;

  return this;
}

ThemeHistory.prototype.commit = function(item) {
  if (typeof this.current !== "undefined") {
    this.undoHistory.push(this.current);
    this.redoHistory.length = 0;
  }
  this.current = JSON.parse(JSON.stringify(item));
}

ThemeHistory.prototype.undo = function() {
  this.redoHistory.push(this.current);
  this.current = this.undoHistory.pop();
  return JSON.parse(JSON.stringify(this.current));
}

ThemeHistory.prototype.redo = function() {
  this.undoHistory.push(this.current);
  this.current = this.redoHistory.pop();
  return JSON.parse(JSON.stringify(this.current));
}

Object.defineProperty(ThemeHistory.prototype, "undoLength", {
  enumerable: true,
  get: function() {
    return this.undoHistory.length;
  },
});

Object.defineProperty(ThemeHistory.prototype, "redoLength", {
  enumerable: true,
  get: function() {
    return this.redoHistory.length;
  },
});

return ThemeHistory;
})();
