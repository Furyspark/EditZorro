function Bind() {
  this.initialize.apply(this, arguments);
}

Bind.prototype.constructor = Bind;

Bind.prototype.initialize = function(parent) {
  this.initMembers();
  this.parent = parent;
  this.id = this.parent.parent.bindCount;
  this.parent.parent.bindCount++;
}

Bind.prototype.initMembers = function() {
  this.alt = false;
  this.ctrl = false;
  this.shift = false;
  this.key = "";
  this.origin = "";
  this.rapidfire = 0;
  this.toggle = false;
  this.jra = false;
  this.label = "";
  this.hwid = "";
  this.keymap = null;

  this.parent = null;
}

Bind.prototype.remove = function() {
  if(this.parent) this.parent.removeBind(this);
}

Bind.prototype.name = function() {
  if(this.keymap) return this.origin + " -> " + this.keymap.name + (this.label !== "" ? " (" + this.label + ")" : "");
  return this.origin + " -> " + this.key + (this.label !== "" ? " (" + this.label + ")" : "");
}

Bind.prototype.refresh = function() {
  // Remove old bind with same origin in same keymap
  for(var a = 0;a < this.parent.binds.length;a++) {
    var bind = this.parent.binds[a];
    if(bind !== this && bind.origin == this.origin) {
      bind.remove();
      a--;
    }
  }
}
