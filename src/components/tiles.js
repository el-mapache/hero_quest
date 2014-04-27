/*
 * TILES
 * This file defines basic tile components, like walls, floors, and
 * movement area overlays
 *
 * All sprite names are mapped in the loading scene.
 *
*/


/*
 * BASE WALL COMPONENT
**/

Crafty.c('Floor', {
  init: function() {
    this.requires('Actor');
  }
});

Crafty.c('SolidTile', {
  init: function() {
    this.requires('Actor, Solid');
  }
});

Crafty.c("Wall", {
  type: 'wall',
  init: function() {
    var randomize = Math.random(),
        wall = 'spr_wall_';

    // Choose a random tile and set it as the sprite
    wall += randomize < 0.9 ? 'a' : 'c';
    this.requires('Actor, Solid, ' + wall);
  }
});

Crafty.c('InnerWall', {
  type: 'wall',
  init: function() {
    var randomize = Math.random(),
        wall = 'spr_wall_d';

    // Choose a random tile and set it as the sprite
    wall += randomize < 0.4 ? '4' :
            randomize < 0.7 ? '2' :
            randomize < 0.9 ? '3' : '5';

    this.requires('SolidTile, ' + wall);
    this.attr({h: 16, w: 16});
  }
});

Crafty.c('OuterWall', {
  type: 'wall',

  init: function() {
    this.requires('SolidTile, spr_wall_a')
        .attr({h: 16, w: 16});
  }
});

Crafty.c('Floor', {
  init: function() {
    this.requires('Actor');
    this.attr({
      h: HeroQuest.CONSTANTS.TILE_SIZE,
      w: HeroQuest.CONSTANTS.TILE_SIZE
    });
  }
});

Crafty.c('Door', {
  type: 'door',
  init: function() {
    this.requires('Mouse, spr_door_a');
    this.bind('Click', this.canOpenDoor);
  },

  // TODO: This will be changing.
  canOpenDoor: function() {
    // door position
    var doorAt = this.at();

    // check all spaces around door to see if a hero occupies them.
    var directions = [[0,-1],[0,1],[1,0],[-1,0]];


    // is it occupied by the currently acting hero.
    // yes, open, no, that character is too far away to do that
    // Make sprite invisible.
    this.open();
  },

  // This currently just makes the sprite invisible and removes the solid component,
  // so we could feasibly close it again.
  open: function() {
    this.visible = false;
    this.removeComponent('Solid');
  }
});

/*
 * BASE FLOOR COMPONENT
**/

// Crafty.c('BaseFloor', {
//   // Giant tile of the entire base gray floor.
//   init: function() {
//     this.requires('Actor, Image, base_floor');
//     this.attr({w: 576, h: 430, z: 1});
//     this.image("assets/sprites/floor.png", "no-repeat");
//   }
// });

Crafty.c("Floor", {
  init: function() {
    this.requires('Actor, spr_floor_b');
    this.attr({z: 0});
  }
});


/*
 * MOVEMENT OVERLAY
**/


Crafty.c("Overlay", {
  type: 'move',

  init: function() {
    var Overlay = this;

    this.requires("Actor, Mouse, overlay");

    this.bind('Click', function() {
      Crafty.trigger('OnMove', {dest: this.at()});
    });

    Crafty.bind('ClearOverlays', TL.bind(this.removeOverlays,this));
  },

  removeOverlays: function() {
    this.destroy();
  }
});

/*
 * Attack Overlay Tile
**/


Crafty.c("ActionOverlay", {
  type: 'action',

  init: function() {
    this.requires("Actor, Mouse, HTML, Tween, Color");

    this.css({height: "15px", width: "15px", border:"1px solid #e3e3e3"});

    // TODO pulsing animation would be great here.
    this.color("rgba(250,84,84,0.3)");


    this.bind('Click', this._triggerAttack);

    Crafty.bind('ClearActionOverlays', TL.bind(this.removeOverlays,this));
  },

  _triggerAttack: function() {
    Crafty.trigger('ToAttack', {dest: this.at()});
  },

  removeOverlays: function() {
    this.destroy();
  }
});

Crafty.c('EnabledUnitOverlay', {
  type: 'enabled',

  init: function() {
    this.requires('Actor, Mouse, HTML');
    this.attr({ z: 0});
    this.css({border: '1px solid rgb(213,12,12)'});

    this._bindEvents();
  },

  _bindEvents: function() {
    this.bind('Click', this.selectUnit);
    Crafty.bind("ClearEnabledUnitOverlays", TL.bind(this.removeOverlays, this));
  },

  selectUnit: function() {
    var position = this.at();

    Crafty.trigger('GetUnit', position.x + ',' + position.y);
  },

  remove: function() {
    this.destroy();
  }
});

Crafty.c('DisabledUnitOverlay', {
  type: 'disabled',

  init: function() {
    this.requires('Actor, Mouse, HTML');

    this.attr({ z: 0});

    this.css({
      background: 'rgba(180,180,180, 0.6)',
      border: '1px solid #999'
    });

    Crafty.bind("ClearDisabledUnitOverlays", TL.bind(this.removeOverlays, this));
  },

  remove: function() {
    this.destroy();
  }
});
