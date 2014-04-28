Crafty.c('UnitView', {
  currentSprite: null,

  init: function() {
    this.requires('2D, HTML');
    this.attr({x: 720});

    this.el = this._element;
    this.template = document.getElementById('unit-view-template').innerHTML;
  },

  setSprite: function(unitName, spriteCoords) {
    // Remove the currently active sprite.
    if (this.currentSprite) {
      this.currentSprite.destroy();
    }


    var x = spriteCoords.x,
        y = spriteCoords.y,
        // format two word names
        name = unitName.split(' ').join('_').toLowerCase();

    // Generate an ad hoc sprite component to show the selected unit.
    this.currentSprite = Crafty.e('spr_' + name + '_3x')
                               .requires('HTML, DOM, SpriteAnimation')
                               .animate('PlayerMovingDown', x, y, 1 + x)
                               .attr({x: 740, h: 48, w: 48, y: 20 })
                               .css({'border': '4px solid rgb(141, 151, 126)'});

    // Set the sprite to animate, increasing player delight.
    this.currentSprite.animate('PlayerMovingDown', 15, 3);

    return this;
  },

  render: function(unit) {
    this.el.innerHTML = HeroQuest.render(this.template, unit);

    return this;
  },

  clear: function() {
    this.currentSprite && this.currentSprite.destroy();
    this.currentSprite = null;
    this.el.innerHTML = "";
  }
});
