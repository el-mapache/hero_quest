function TilesTable() {
  var tilesTable = {
    "000": {
      sprite: 'Floor, spr_floor_a',
      h: 16,
      w: 16,
      animation: false,
      description: 'A floor.',
      isSolid: false,
      type: 'floor',
      layer: 1
    },

    "001": {
      sprite: 'spr_solid_rock',
      h: 16,
      w: 16,
      animation: false,
      description: 'Solid black rock.',
      isSolid: true,
      layer: 2
    },

    "002": {
      sprite: 'OuterWall',
      h: 16,
      w: 16,
      animation: false,
      description: 'Slightly cracked and pearlescent blue.',
      isSolid: true,
      layer: 2
    },

    "003": {
      sprite: 'spr_wall_c',
      h: 16,
      w: 16,
      animation: false,
      description: 'Dark blue brick.',
      isSolid: true,
      layer: 2
    },

    "004": {
      sprite: 'InnerWall',
      h: 16,
      w: 16,
      animation: false,
      description: 'Light gray brick.',
      isSolid: true,
      layer: 2
    },

    "005": {
      sprite: 'spr_wall_e',
      h: 16,
      w: 16,
      animation: false,
      description: 'Dark purple brick.',
      isSolid: true,
      layer: 2
    },

    "006": {
      sprite: 'spr_drape_a',
      h: 16,
      w: 16,
      animation: false,
      description: 'A heavy drape.',
      isSolid: true,
      layer: 2
    },

    "007": {
      sprite: 'spr_torch_a',
      h: 16,
      w: 16,
      animation: function(sprite) {
        sprite.requires('SpriteAnimation')
              .animate('AnimateMe', 1, 2 ,2)
              .animate('AnimateMe', 130, -1);
      },
      description: 'A flickering torch against light gray stone.',
      isSolid: true,
      type: 'wall',
      layer: 2
    },

    "008": {
      sprite: "Door",
      h: 16,
      w: 16,
      animation: false,
      description: 'Just a wooden door.',
      isSolid: true,
      type: 'door',
      layer: 2
    },

    "020": {
      sprite: 'spr_stairs',
      h: 32,
      w: 32,
      animation: false,
      description: 'A large stone staircase.',
      isSolid: false,
      layer: 1
    },

    "021": {
      sprite: 'spr_table',
      h: 32,
      w: 48,
      animation: false,
      description: 'A wooden table',
      isSolid: true,
      layer: 2
    },

    "022": {
      sprite: 'spr_throne',
      h: 16,
      w: 16,
      animation: false,
      description: 'A guilded throne',
      isSolid: true,
      layer: 2
    },

    "023": {
      sprite: 'spr_closed_chest',
      h: 16,
      w: 16,
      animation: false,
      description: 'A simple chest',
      isSolid: true,
      layer: 2
    },
    "024": {
      sprite: 'spr_fireplace_a',
      h: 16,
      w: 48,
      animation: false,
      description: 'A roaring fire',
      isSolid: true,
      layer: 2
    },
    "025": {
      sprite: 'spr_bookcase_a',
      h: 16,
      w: 16,
      animation: false,
      description: 'A bookshelf',
      isSolid: true,
      layer: 2
    },

    "026": {
      sprite: 'spr_cabinet_a',
      h: 16,
      w: 48,
      animation: false,
      description: 'A cabinet',
      isSolid: true,
      layer: 2
    },

    "027": {
      sprite: 'spr_rack',
      h: 48,
      w: 32,
      animation: false,
      description: 'A torture rack',
      isSolid: true,
      layer: 2
    },

    "028": {
      sprite: 'spr_tomb',
      h: 48,
      w: 32,
      animation: false,
      description: 'A large stone sarcophogus',
      isSolid: true,
      layer: 2
    },

    "029": {
      sprite: 'spr_altar',
      h: 48,
      w: 32,
      animation: false,
      description: 'A large stone altar',
      isSolid: true,
      layer: 2
    },

    "030": {
      sprite: 'spr_weapons',
      h: 16,
      w: 32,
      animation: false,
      description: 'A weapons rack',
      isSolid: true,
      layer: 2
    },

    "100": {
      sprite: 'Elf',
      h: 16,
      w: 16,
      animation: false,
      description: '',
      isSolid: true,
      layer: 2
    },

    "101": {
      sprite: 'Dwarf',
      h: 16,
      w: 16,
      animation: false,
      description: '',
      isSolid: true,
      layer: 2
    },

    "102": {
      sprite: 'Wizard',
      h: 16,
      w: 16,
      animation: false,
      description: '',
      isSolid: true,
      layer: 2
    },

    "103": {
      sprite: 'Barbarian',
      h: 16,
      w: 16,
      animation: false,
      description: '',
      isSolid: true,
      layer: 2
    },

    "104": {
      sprite: 'Skeleton',
      h: 16,
      w: 16,
      animation: false,
      description: '',
      isSolid: true,
      layer: 2
    },

    "105": {
      sprite: 'Zombie',
      h: 16,
      w: 16,
      animation: false,
      description: '',
      isSolid: true,
      layer: 2
    },

    "106": {
      sprite: 'Mummy',
      h: 16,
      w: 16,
      animation: false,
      description: '',
      isSolid: true,
      layer: 2
    },

    "107": {
      sprite: 'Goblin',
      h: 16,
      w: 16,
      animation: false,
      description: '',
      isSolid: true,
      layer: 2
    },

    "108": {
      sprite: 'Orc',
      h: 16,
      w: 16,
      animation: false,
      description: '',
      isSolid: true,
      layer: 2
    },

    "109": {
      sprite: 'ChaosWarrior',
      h: 16,
      w: 16,
      animation: false,
      description: '',
      isSolid: true,
      layer: 2
    },

    "110": {
      sprite: 'Fimir',
      h: 16,
      w: 16,
      animation: false,
      description: '',
      isSolid: true,
      layer: 2
    },

    "111": {
      sprite: 'Gargoyle',
      h: 16,
      w: 16,
      animation: false,
      description: '',
      isSolid: true,
      layer: 2
    }
  };

  return {
    generateTile: function(tileId, position, zone) {
      // 0 indicates a placeholder.
      if (tileId === 0) return;

      // Tile doesnt exist, so throw an error.
      if (!tilesTable[tileId]) {
        throw new Error('Unknown tile. TileId: ' + tileId + ' requested.');
      }

      // Cache the current tile to make lookups easier.
      var tile = tilesTable[tileId];

      var c = tile.sprite;

      // Create and draw the sprite component.
      var spr = Crafty.e(c).requires((tile.isSolid) ? 'Actor, Solid' : 'Actor')
                      .attr({z: tile.layer, h: tile.h, w: tile.w})
                      .at(position.x, position.y, tile.isSolid)
                      .setZone(zone);

      if (tile.isSolid && ((tile.h /16) > 1 ||(tile.w/16) > 1)) {
        // This tile occupies more than one square.
        var yOccupy = tile.h / 16;
        var xOccupy = tile.w / 16;

        for (var xx = position.x; xx < position.x + xOccupy; xx++) {
          for (var yy = position.y; yy < position.y + yOccupy; yy++) {
            Board.map[xx][yy] = {
              occupied: true,
              pointer: spr[0]
            };
          }
        }
      }

      //if (tile.animation) tile.animation(spr);

      return spr;
    }
  };
}
