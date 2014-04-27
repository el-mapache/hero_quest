Crafty.c('SpellView', {
  init: function() {
    this.requires('2D, HTML');
    this.attr({x: 720, y: 225});
    this.selector = null;

    this.el = this._element;
    this.template = document.getElementById('spellbook-template').innerHTML;
  },

  setOptions: function(options) {
    this.selector = options.selector;
    this.callback = options.callback;
  },

  bindEvents: function() {
    var nodes = this.el.querySelectorAll('.spell-item'),
        View = this;

    TL.forEach(nodes, function(node) {
      node.addEventListener('click', TL.bind(View.canCastSpell, View));
    });
  },

  unbindEvents: function() {
    var nodes = this.el.querySelectorAll('.spell-item'),
        View = this;

    TL.forEach(nodes, function(node) {
      node.removeEventListener('click', View.casCastSpell);
    });
  },

  canCastSpell: function(evt) {
    var spell = evt.currentTarget;
    var spellData = {
      name: spell.getAttribute('data-name'),
      school: spell.getAttribute('data-school')
    };

    this.trigger('CanCastSpell', spellData);
  },

  render: function(model) {
    this.append(HeroQuest.render(this.template, model));

    return this;
  },

  clear: function() {
    this.unbindEvents();
    this.el.innerHTML = "";

    return this;
  }
});
