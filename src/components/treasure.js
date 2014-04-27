Crafty.c('Treasure', {
  CARDS: {
    0: {
      name: 'Wandering Monster',
      type: 'monster',
      desc: 'As you search through the room, a scuffling noise behind you draws your attention. A monster has crept upon you as you searched, and you must defend yourself!',
      effect: function(unit) {
        var fourway = [[0,1],[0,-1],[1,0],[-1,0]],
            unitAt = unit.at(),
            direction = null;

        // Check if squares are uoccupied.
        for (var i = 0; i < fourway.length; i++) {
          if (!Board.occupied(unitAt.x + fourway[i][0], unitAt.y + fourway[i][1])) {
            direction = [unitAt.x + fourway[i][0], unitAt.y + fourway[i][1]];
            break;
          }
        }

        if (direction) {
          Crafty.e(Board.level.wanderingMonster)
                .attr({z: 2, h: 16, w: 16 })
                .at(direction[0], direction[1], true);
        }

        //if (!freeSpace) {
          // we have to use floodfill to find an unoccupied tile.
        //}
      }
    },

    1: {
      name: 'Arrow Trap',
      type: 'hazard',
      desc: 'While you are searching, a hidden arrow shoots from the way and strikes you, dealing 1 body point of damage and stunning you. Your turn is over.',
      effect: function(unit) {
        unit.damage(-1);

        unit.addEventHook('AfterAction', function(action) {
          unit.moveComplete();
        });
      }
    },

    2: {
      name: 'Crumbling Floor',
      type: 'hazard',
      desc: 'Suddenly the stone beneath your feet gives way, and you fall into a shallow pit. You suffer 1 body point of damage and are stunned. Your turn is over.',
      effect: function(unit) {
        unit.damage(-1);

        unit.addEventHook('AfterAction', function(action) {
          unit.moveComplete();
        });
      }
    },

    3: {
      name: 'Small Gem',
      type: 'treasure',
      desc: 'You spy a an old discarded boot, curiously abandoned on the dungeon floor. As you turn it over, a small gem worth 35 gold pieces falls out.',
      effect: function(unit) {
        Crafty(unit.ownerPointer).gold += 35;
      }
    },

    4: {
      name: 'Potion of Healing',
      type: 'treasure',
      desc: 'Amid discarded bottles of mead and mulled wine, you find a small bottle of pearly blue liquid, a potion of healing. Imbibing this potion allows the hero to roll a 1d6 and restore that many body points.',
      effect: function(unit) {
        unit.inventory.add(Crafty.e('HealingPotion'));
      }
    },

    5: {
      name: 'Potion of Heroism',
      type: 'treasure',
      desc: 'You are surprised to find a leather bag hanging on the wall. Drinking this potion before an attack allows you to make two attacks instead of one.',
      effect: function(unit) {
        unit.inventory.add(Crafty.e('HeroismPotion'));
      }
    },

    6: {
      name: 'Potion of Strength',
      type: 'treasure',
      desc: 'You find a small purple flask filled with a strange smelling liquid. Drinking this potion will allow you to roll 2 extra combat dice during your next attack.',
      effect: function(unit) {
        unit.inventory.add(Crafty.e('StrengthPotion'));
      }
    },

    7: {
      name: 'Potion of Defense',
      type: 'treasure',
      desc: 'Amidst a collection of dusty bottle, you find a small vial filled with a gray liquid. Drinking it will grant the hero 2 extra defense die the next time they defend.',
      effect: function(unit) {
        unit.inventory.add(Crafty.e('DefensePotion'));
      }
    },

    8: {
      name: 'Jewels',
      type: 'treasure',
      desc: 'You find a simple-looking wooden box. Opening it, you discover it is lined with velvet and contains a cache of small jewels. The contents are worth 50 gold pieces.',
      effect: function(unit) {
        Crafty(unit.ownerPointer).gold += 50;
      }
    },

    9: {
      name: 'Purse of gold pieces',
      type: 'treasure',
      desc: 'A small purse catches your eye, most likely carelessly dropped by a drunken orc. Within, you find 15 gold pieces.',
      effect: function(unit) {
        Crafty(unit.ownerPointer).gold += 15;
      }
    },

    10: {
      name: 'Large purse of gold pieces',
      type: 'treasure',
      desc: 'You find a loose stone in the wall. Tearing it away, you discover a large pouch. Inside, you find 25 gold pieces.',
      effect: function(unit) {
        Crafty(unit.ownerPointer).gold += 25;
      }
    },

    11: {
      name: 'Ether',
      type: 'hazard',
      desc: 'You discover a small vial filled with a pearly blue liquid. Thinking it a potion of healing, you take a sip. You feel a fog of confusion washing over you. You lose 1 mind point. Your turn is over.'
    },

    12: {
      name: 'Poison',
      type: 'hazard',
      desc: 'You discover a rusty flask filled with a browish liquid. You take a sip and it turns out to be poison! You suffer 1 body point of damage and being vomitting profusely. Your turn is over.',
      effect: function(unit) {
        unit.damage(-1);

        unit.addEventHook('AfterAction', function(action) {
          unit.moveComplete();
        });
      }
    },

    13: {
      name: 'Potion of Magic Resistance',
      type: 'treasure',
      desc: 'Prying up a section of loose floor, you find an old corked bottle, half full of a brilliant orange liquid. Drinking this potion will nullify the next spell cast on this hero.',
      effect: function(unit) {
        unit.inventory.add(Crafty.e('ResistancePotion'));
      }
    },

    14: {
      name: 'Holy Water',
      type: 'treasure',
      desc: 'This unusually shaped vial may be thrown instead of attacking. It will dispel the chaos magic animating an undead creature and return it to the earth. This potion has no effect on non-undead creatures.',
      effect: function(unit) {
        unit.inventory.add(Crafty.e('HolyWater'));
      }
    },
    15: {
      name: 'Potion of Beautification',
      type: 'treasure',
      desc: ''
    }
  },

  init: function() {
    this.cards = [0,0,0,0,0,0,0,1,1,2,2,3,3,4,4,4,5,6,7,8,8,9,9,10,10,8,12,13,14];
    this.drawn = 0;
    this.shuffle();
  },

  shuffle: function() {
    // The list of objects that will be sorted.
    var sortByList = [];

    // Loop through cards array and assign each entry a random number to be
    // sorted by.
    TL.forEach(this.cards, function(value, index, array) {
      sortByList[index] = {
        index: index,
        value: value,
        criteria: HeroQuest.Maths.random()
      }
    });

    // Sort the cards and return the sorted array of pointers into cards.
    this.cards = TL.map(function(element) {
      return element.value;
    }, sortByList.sort(function(left, right) {
      var a = left.criteria,
          b = right.criteria;

      if (a !== b) {
        if (a > b) return 1;
        if (a < b) return -1;
      }
    }));
  },

  drawCard: function() {
    // If we have drawn all the cards already, shuffle the deck to ensure randomness.
    if (this.drawn === this.cards.length) {
      this.shuffle();
      this.drawn = 0;
    }

    // Draw a card.
    var card = this.cards.shift();

    if (card.type === 'hazard') {
      // Put it back at the end of the deck
      this.cards.push(card);
    }

    // increment the drawn counter;
    this.drawn += 1;

    // Return the card object from the lookup table.
    return this.CARDS[card];
  }
});
