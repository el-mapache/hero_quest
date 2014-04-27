Crafty.c('GameStateView', {
  init: function() {
    this.requires('HTML, Mouse')
        .attr({x: 1015, y: 0});

    this.el = this._element;
    this.el.addEventListener('click', TL.bind(this.endTurn, this));
    this.template = document.getElementById('game-view-template').innerHTML;

    this.bind('AttributeUpdate', TL.bind(this.updateView, this));
  },

  render: function(player) {

    this.el.innerHTML = HeroQuest.render(this.template, {});

    return this;
  },

  endTurn: function(e) {
    if (e.target && e.target.id === "end-turn") {
      var confirmed = confirm("Are you sure you end to end your turn?");

      if (confirmed) {
        this.trigger('EndTurn');
      }

      return;
    }
  },

  updateView: function(updateObj) {
    var node = this.el.querySelector('span[data-bind='+updateObj.key+']');

    if (node) {
      node.innerHTML = updateObj.value;
    }
  }
});
