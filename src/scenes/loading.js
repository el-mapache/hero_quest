// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files

Crafty.scene('Loading', function() {

  // Load all of the sprites needed for the game
  Crafty.load([
    'assets/sprites/barbarian.png',
    'assets/sprites/overlay.png',
    'assets/sprites/attack.png',
    'assets/sprites/walls_floors.png',
    'assets/sprites/walls_floors-2x.png',
    'assets/sprites/sprite_sheet.png',
    'assets/sprites/sprite_sheet-3x.png',
    'assets/sprites/barbarian-3x.png'], onAssetsLoaded);

  // Callback function executed after all assets have been loaded.
  function onAssetsLoaded() {
    /* Define the individual sprites in the image
     * Each one (spr_tree, etc.) becomes a component
     * These components' names are prefixed with "spr_" to remind us
     * that they cause the component to be drawn with a certain sprite
    **/

    Crafty.sprite(16, 'assets/walls_floors.png', {
      spr_solid_rock:   [0, 12],
      spr_wall_a:       [3, 4],
      spr_wall_d2:      [0, 2],
      spr_wall_d3:      [3, 2],
      spr_wall_d4:      [4, 2],
      spr_wall_d5:      [6, 2],
      spr_wall_c:       [2, 0],
      spr_wall_d:       [12, 1],
      spr_wall_e:       [12, 1],
      spr_drape_a:      [10, 0],
      spr_torch_a:      [1,  2],
      spr_door_a:       [10, 3],
      spr_door_b:       [11, 3],
      spr_stairs:       [12, 2, 2, 2], // last two values are the size in tiles, not pixels!!!!
      spr_floor_a:      [6, 11],
      spr_table:        [8, 4, 3, 2],
      spr_throne:       [2, 13],
      spr_closed_chest: [4, 12],
      spr_fireplace_a:  [8, 6, 3, 1],
      spr_bookcase_a:   [8, 8],
      spr_cabinet_a:    [11, 4, 3, 1],
      spr_altar:        [12, 9, 2, 3],
      spr_tomb:         [10, 9, 2, 3],
      spr_rack:         [8, 9, 2, 3],
      spr_weapons:      [9, 8, 2, 1],
    },0,0);

    Crafty.sprite(48, 'assets/sprites/sprite_sheet-3x.png', {
      spr_dwarf_3x:         [0,0],
      spr_wizard_3x:        [2,0],
      spr_elf_3x:           [4,0],
      spr_skeleton_3x:      [4,4],
      spr_zombie_3x:        [6,4],
      spr_mummy_3x:         [0,8],
      spr_goblin_3x:        [6,0],
      spr_orc_3x:           [0,12],
      spr_chaos_warrior_3x: [2,8],
      spr_fimir_3x:         [0,4],
      spr_gargoyle_3x:      [4,8]
    });

    Crafty.sprite(16, 'assets/sprites/sprite_sheet.png', {
      spr_dwarf:         [0,0],
      spr_wizard:        [2,0],
      spr_elf:           [4,0],
      spr_skeleton:      [4,4],
      spr_zombie:        [6,4],
      spr_mummy:         [0,8],
      spr_goblin:        [6,0],
      spr_orc:           [0,12],
      spr_chaos_warrior: [2,8],
      spr_fimir:         [0,4],
      spr_gargoyle:      [4,8]
    });

    Crafty.sprite(16, 'assets/sprites/barbarian.png', {
      spr_barbarian:      [0,0]
    }, 0, 0);

    Crafty.sprite(48, 'assets/sprites/barbarian-3x.png', {
      spr_barbarian_3x:  [0,0]
    });

    Crafty.sprite(16, 'assets/sprites/overlay.png', {
      overlay:   [0, 0]
    });

    Crafty.sprite(17, 'assets/sprites/attack.png', {
      attack:   [0, 0]
    });

    // Now that our sprites are ready to draw, start the game
    Crafty.scene('Game');
  }
});
