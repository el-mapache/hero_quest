Crafty.c('InventoryView', {
  init: function() {
    this.requires('2D, HTML');
    this.attr({x: 720, y: 225});

    this.el = this._element;
    this.template = document.getElementById('inventory-template').innerHTML;
  },

  render: function(model) {
    this.append(HeroQuest.render(this.template, model));

    return this;
  },

  clear: function() {
    this.el.innerHTML = '';
    return this;
  },

  bindEvents: function() {
    var nodes = this.el.querySelectorAll('button'),
        View = this;

    TL.forEach(nodes, function(node) {
      node.addEventListener('click', TL.bind(View.onDrink, View));
    });
  },

  unbindEvents: function() {
    var nodes = this.el.querySelectorAll('button'),
        View = this;

    TL.forEach(nodes, function(node) {
      node.removeEventListener('click', View.onDrink);
    });
  },

  onDrink: function(evt) {
    this.trigger('UnitShouldDrink', {
      id: evt.currentTarget.getAttribute('data-id'),
      stack: parseInt(evt.currentTarget.getAttribute('data-stack'), 10)
    });
  },
});
