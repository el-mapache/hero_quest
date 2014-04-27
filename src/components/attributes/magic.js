/*
 * Component to add spell casting functionality to a unit.
 * All spells are stored in a spellbook component that is intialized along with
 * the Magic component.  This component behaves as a controller and public interface
 * to the spellbook.
**/

Crafty.c('Magic', {
  init: function() {
    this._magicUser = true;
    this.spellbook = Crafty.e('SpellBook');

    this.spellbook.bind('change:open', function() {
      console.log('meow')
    });

    this.spellbook.bind('oncast', TL.bind(this.onCastSpell, this));
  },

  castSpell: function(spell) {
    this.spellbook.cast(spell);
  },

  onCastSpell: function(interface) {
    this.injectActionInterface(interface);
  },

  readingSpells: function() {
    return this.spellbook.open;
  },

  closeSpellbook: function() {
    this.spellbook.set('open', false);

    return this;
  },

  openSpellbook: function() {
    this.spellbook.set('open', true);

    return this;
  }
});
