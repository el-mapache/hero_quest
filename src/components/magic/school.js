var Collection = {
  init: function(components) {
    components = components instanceof Array ? components : [components];

    this.length = 0;
    this.components = {};
  },

  add: function(components) {

    this.length += 1;
    return this;
  },

  remove: function() {

    this.length -= 1;
    return this;
  },

  length: function() {
    return this.length;
  },

  at: function(idx) {
    return this.components[idx] || null;
  }
};