/*
  * This component defines the list of acceptable actions that a player may take.
*/

Crafty.c('ActionView', {
  currentAction: null,
  buttons: {},

  init: function() {
    this.requires('2D, HTML');
    this.attr({x: 875, y: 90});

    this.el = this._element;

    this.template = document.getElementById('action-buttons-template').innerHTML,
    this.fragment = document.createElement('div');

    // Store the template in a temporary DOM element so we can query it.
    this.fragment.innerHTML = HeroQuest.render(this.template, {});

    this.bind('DelegateMove', TL.bind(this._dispatchToButton, this));
    this.bind('DelegateAttack', TL.bind(this._dispatchToButton, this));
    this.bind('DelegateSearch', TL.bind(this._dispatchToButton, this));

    this.attachButtonEvents();
  },

  // Store all the buttons in memory (since they never change), and assign a
  // click handler to them.
  attachButtonEvents: function() {
    var nodes = this.fragment.querySelectorAll('.btn-action');

    TL.forEach(nodes, TL.bind(function(node) {
      this.buttons[node.getAttribute('data-action')] = node;
      node.addEventListener('click', TL.bind(this.act, this));
    },this));
  },

  render: function() {
    this.el.appendChild(this.fragment);
    return this;
  },

  update: function(actions) {
    var View = this;

    TL.forEach(actions, function(action) {
      View.buttons[action].disabled = true;
    });


    return this;
  },

  clear: function() {
    this.el.innerHTML = '';

    return this;
  },

  _dispatchToButton: function(action) {
    var evt = document.createEvent("MouseEvents");

    evt.initEvent('click', true, true);
    this.el.querySelector('.btn-' + action).dispatchEvent(evt);
  },

  /*
   * Tells this component which actions a unit is capable of performing.
   *
   * @param {restrictions} Array blacklist of actions the unit can't perform.
   * @return this
   *
  **/

  enableActions: function(unit) {
    restrictions = unit.restrictions || [];

    TL.forEachIn(this.buttons, function(btnName, button) {
      if (btnName === 'move') {
        if (unit.moved()) {
          button.disabled = true;
        } else {
          button.disabled = false;
        }
      } else if (restrictions.indexOf(btnName) === -1) {
        if (unit.acted() && unit.secondAction !== btnName) {
          button.disabled = btnName === 'cancel' ? false : true;
        } else {
          // Action doesn't appear in the blacklist, so enable it.
          button.disabled = false;
        }
      } else {
        button.disabled = true;
      }
    });

    return this;
  },

  act: function(event) {
    var action = event.currentTarget.getAttribute('data-action');

    // There is no interface associate with ending an action, so exit.
    if (action === "cancel") return this.trigger('UnitShouldCancel');

    if (action === 'castSpell') {
      return this.trigger('ShouldShowSpells');
    } else if (action === 'inventory') {
      return this.trigger('ShouldShowInventory');
    }

    var interface = this._getInterface(action);

    if (!interface) return;

    this.trigger("UnitShouldAct", interface);
  },

  _getInterface: function(component) {
    var interface;

    switch (component) {
      case 'move':
        interface = {
          component: component,
          method: "roll",
          interfaceList: ['MovementDie','Move','PlayerMovement'],
          args: null
        };
        break;
      case 'attack':
        interface = {
          component: component,
          method: "playerAttack",
          interfaceList: ['CombatDie', 'PlayerAttack'],
          args: null
        };
        break;
      case 'search':
        interface = {
          component: component,
          method: 'search',
          interfaceList: ['PlayerSearch'],
          args: null
        };
        break;
      default:
        Crafty.console.writeLine('system', 'I\'m sorry, I don\'t know how to ' + component);
        return false;
        break;
    }

    return interface;
  }
});
