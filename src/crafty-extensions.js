Crafty.extend({

  /*
	 * Takes an array of component names and an object,
	 * then removes each of said components from the object
	**/

	cleanup: function(ctx,list) {
		var i = 0,
				len = list.length;

		for(i; i < len; i++) {
			ctx['removeComponent'](list[i],false);
		}
	},

	addInterface: function(ctx, interfaceList) {
		// Return interfaces as a string.
		var list = interfaceList.toString();

		// If the component doesnt already contain an interfaces property,
		// create one.
		ctx.interfaces = ctx.interfaces || [];

		ctx.addComponent(list);

		ctx.interfaces.push(interfaceList);

		return ctx;
	},


	/* Removes all specified components from the specified crafty object,
	 * then triggers an optional event for other components to
	 * listen to.
	 *
	 * @return crafty object.
	**/

  removeInterface: function(ctx,evt) {
    // If we havent called addInterface already, return from the method
    if (typeof ctx.interfaces === 'undefined' ||
        typeof ctx.interfaces[0] === 'undefined') {
      return;
    }


    Crafty.cleanup(ctx,ctx.interfaces[0]);
    ctx.interfaces.length = 0;

    if (typeof evt !== 'undefined' && evt) Crafty.trigger(evt);

    ctx.trigger('RemoveInterfaces');

    return ctx;
  },

  /*
   * Gets all pointers to a given type of entity.
   *
   * When you execute a crafty search i.e. Crafty('NPC'), it returns
   * an object containing all the pointers as well as all the base Crafty functions.
   * This method returns an array composed of only pointers to entities.
   *
   * @param{searchTerm} String the entity type
   * @return array
  **/
  getAll: function(searchTerm) {
    var searchResults = Crafty(searchTerm),
        entities = [];

    if (searchResults.length === 0) return entities;

    return TL.every(searchResults, function(el) {
      if (typeof el === 'number') {
        return el;
      }
    });
  }
});
