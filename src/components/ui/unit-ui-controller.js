function UnitUIController() {
  this.activeUnit = null;

  this.unitView = Crafty.e('UnitView');
  this.actionView = Crafty.e('ActionView');
  this.spellView = Crafty.e('SpellView');
  this.inventoryView = Crafty.e('InventoryView');

  this.bindEvents();
}

UnitUIController.prototype.constructor = UnitUIController;

UnitUIController.prototype.bindEvents = function() {
  Crafty.bind('ClearUnitView', TL.bind(this.removeViews, this));

  // Page-wide listener to close views as a convienience to the player.
  Crafty.bind('KeyDown', TL.bind(this.onKeyDown, this));

  // Triggered by the game object.
  Crafty.bind('ActiveUnitSet', TL.bind(this.renderViews, this));

  Crafty.bind('Spellbook:Close', TL.bind(this.closeSpellView, this));

  this.actionView.bind('ShouldShowSpells', TL.bind(this.shouldShowSpells, this));
  this.actionView.bind('ShouldShowInventory', TL.bind(this.shouldShowInventory, this));
  this.actionView.bind('UnitShouldCancel', TL.bind(this.tellUnitToCancel, this));
  this.actionView.bind('UnitShouldAct', TL.bind(this.tellUnitToAct, this));

  this.inventoryView.bind('UnitShouldDrink', TL.bind(this.delegateDrink, this));

  this.spellView.bind('CanCastSpell', TL.bind(this.delegateSpell, this));
};

UnitUIController.prototype.onKeyDown = function(evt) {
  switch (evt.keyCode) {
    case 27:
      console.log('tab: close unit view.........m: move............a: attack...........x: cancel');
      break;
    case 9:
      if (!this.activeUnit) return false;

      var unit = Crafty(this.activeUnit);

      if (unit.acting() || unit.moving()) return;

      this.removeViews();
      break;
    case 77:
      this.actionView.trigger('DelegateMove', 'move');
      break;
    case 65:
      this.actionView.trigger('DelegateAttack', 'attack');
      break;
    case 83:
      this.actionView.trigger('DelegateSearch', 'search');
      break;
    case 88:
      this.tellUnitToCancel();
      break;
  }
};

UnitUIController.prototype.renderViews = function(unit) {
  // TODO will this cause bugs?  Unit should get unbound after their turn.
  unit.bind('AfterMove', TL.bind(function() {
    this.actionView.update(['move']);
  }, this));

  unit.bind('AfterAction', TL.bind(function() {
    this.actionView.update(['attack', 'castSpell', 'search']);
  }, this));

  this.activeUnit = unit[0];

  // Pass the model to the unit view and render it.
  this.unitView.setSprite(unit.parentClass, unit.getSpriteCoords())
               .render(unit.toJSON());

  // Pass model attributes to the view and render it.
  this.actionView.enableActions(unit).render();
};

UnitUIController.prototype.removeViews = function() {
  this.actionView.clear();
  this.unitView.clear();
  this.spellView.clear();
  this.inventoryView.clear();
  this.activeUnit = null;
  Crafty.trigger('ClearActiveUnit');
};

UnitUIController.prototype.shouldShowSpells = function() {
  var unit = Crafty(this.activeUnit);
    // Close the spell book if it is open.
    if (unit.readingSpells()) {
      unit.closeSpellbook();
      this.spellView.clear();
     } else {
       // Or, open it!
       unit.openSpellbook();
       this.spellView.render(unit.spellbook.toJSON()).bindEvents();
     }

  return;
};

UnitUIController.prototype.shouldShowInventory = function() {
  var unit = Crafty(this.activeUnit);

  if (unit.inventory.isOpen) {
    unit.inventory.close();
    //popupController.hide();
  } else {
    unit.inventory.open();
    this.inventoryView.render(unit.inventory.toJSON()).bindEvents();
  }
};

UnitUIController.prototype.closeSpellView = function() {
  this.spellView.clear();
};

UnitUIController.prototype.delegateSpell = function(spell) {
  // TODO add a message here perhaps?
  if (Crafty(this.activeUnit).isActing) return false;
  Crafty(this.activeUnit).castSpell(spell);
};

UnitUIController.prototype.tellUnitToAct = function(action) {
  var unit = Crafty(this.activeUnit);

    // Is the unit acting already?
  if (unit.acting() || unit.moving()) {
    Crafty.console.writeLine('system', 'That unit is already doing something. Finish your action before selecting another.');
    return;
  }

  if (action.component === 'move' && unit.moved()) {
    Crafty.console.writeLine('system', 'That unit has already moved this turn.');
    return;

  } else if (action.component === 'act' && unit.acted()) {
    Crafty.console.writeLine('system', 'That unit has already acted this turn.');
    return;
  } else if (action.component === 'search' && unit.zone === 0) {
    Crafty.console.writeLine('system', 'You can\'t search a corridor.');
    return;
  }

  unit.trigger('AddAction', action);
};

/*
 * Tell the currently active unit to drink a potion.
 * @param{potion} String the id of the potion to consume.
**/
UnitUIController.prototype.delegateDrink = function(potion) {
  var unit = Crafty(this.activeUnit);

  unit.inventory.get(potion.id, potion.stack).drink(unit);
};

UnitUIController.prototype.tellUnitToCancel = function() {
  var unit = Crafty(this.activeUnit);

  if (unit.acting()) {
    unit.cancelAction();
  } else if (unit.moving()) {
    unit.finishMove();
  } else {
    Crafty.console.writeLine('system', 'That unit is not currenty active.');
  }
};
