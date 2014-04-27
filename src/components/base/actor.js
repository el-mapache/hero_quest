/* ACTOR COMPONENT
 *
 * Defines a generic Actor component for basically any physical element that
 * is not a 'solid', i.e. something that a unit can pass through (other units,
 * movement overlays, floor tiles, etc).
 *
*/

Crafty.c("Actor", {
  init: function() {
    this.requires('2D, Canvas, Grid');
    this.zone = 0;
  },

  setZone: function(zone) {
    this.zone = zone;
    return this;
  }
});
