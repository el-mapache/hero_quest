/*
 * BUTTON
 *
 * Generic button component to provide basic naming, ui skinning and
 * event binding capabilities.
 *
**/

Crafty.c('Button', {
  init: function() {
    this.requires('2D, HTML, Mouse');

    // All buttons need to show a pointer when moused over.
    this.css({cursor: 'pointer'});

    // A Button always needs to be clickable!
    this.attr({z: 100});
  },

  _bindEvents: function() {
    this.bind('Click', function() {
      this.trigger('ActionButton:Click', this.name);
    });
  },

  _unbindEvents: function() {
    this.unbind('Click');
  },

  // Initialize the button with a label, optional tooltip text,
  // and an optional sprite.
  button: function(sprite, tooltip) {
    if (sprite) this.addComponent(sprite);

    if (tooltip) {
      this.tooltipText = tooltip;

      this.bind('MouseOver', function(event) {
        // Show tip
      }).bind('MouseOut', function(event) {
        // hide tip
      });
    }

    return this;
  },

  name: function(name) {
    this.name = name;
    return this;
  },

  /*
   * Show a label on the button.  Useful for non graphical button elements.
   * @param {text} String the text to appear on the button.
   * @return this
  **/
  label: function(text, css) {
    // Basic component to display the text of the button.
    this.labelText = Crafty.e('2D, Text, HTML')
                           .attr({x: this.x, y: this.y, w: this.w});

    this.labelText.css(css)
    this.labelText.text(text);

    // Add the label component to the button.
    this.attach(this.labelText);

    return this;
  },

  registerCallback: function(callback) {
    this.bind('Click', callback);

    return this;
  }
});
