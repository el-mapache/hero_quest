function PopupController(el) {
  this.el = el;
  this.content = null;
  this.showing = false;
}

PopupController.prototype.constructor = PopupController;

PopupController.prototype = {
  bind: function(evnt, elementId) {
    var Controller = this;

    this.el.addEventListener(evnt, function(evt) {
      if (evt.target && evt.target.id === elementId) {
        Controller.hide();
      }
    });
  },

  unbind: function(evnt) {
    this.el.removeEventListener(evnt);
  },

  update: function(content) {
    this.content = content;
    return this;
  },

  render: function() {
    this.el.innerHTML = this.content;
    return this;
  },

  show: function() {
    Avgrund.show(this.el);
    this.bind('click', 'close');
    this.showing = true;
  },

  hide: function() {
    Avgrund.hide();
    this.unbind('click');
    this.showing = false;
  }
};
