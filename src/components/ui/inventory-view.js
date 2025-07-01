Crafty.c("InventoryView", {
  init: function () {
    this.requires("2D, HTML");
    this.attr({ x: 720, y: 225 });

    this.el = this._element;
    this.template = document.getElementById("inventory-template").innerHTML;
    this.isVisible = false;
    this._onDrink = this.onDrink.bind(this);
    this._onClose = this.onClose.bind(this);
  },

  render: function (model) {
    // Prevent multiple instances by clearing any existing content first
    this.clear();

    this.append(HeroQuest.render(this.template, model));
    this.isVisible = true;

    return this;
  },

  clear: function () {
    this.el.innerHTML = "";
    this.isVisible = false;
    return this;
  },

  bindEvents: function () {
    var nodes = this.el.querySelectorAll('button[data-action="drink"]');

    TL.forEach(nodes, (node) => {
      node.addEventListener("click", this._onDrink);
    });

    // Add close button functionality
    var closeButton = this.el.querySelector("#close");
    if (closeButton) {
      closeButton.addEventListener("click", this._onClose);
    }
  },

  unbindEvents: function () {
    var nodes = this.el.querySelectorAll("button[data-action='drink']");

    TL.forEach(nodes, (node) => {
      node.removeEventListener("click", this._onDrink);
    });

    // Remove close button event listener
    var closeButton = this.el.querySelector("#close");
    if (closeButton) {
      closeButton.removeEventListener("click", this._onClose);
    }
  },

  onDrink: function (evt) {
    this.trigger("UnitShouldDrink", {
      id: evt.currentTarget.getAttribute("data-id"),
      stack: parseInt(evt.currentTarget.getAttribute("data-stack"), 10),
    });
  },

  onClose: function () {
    this.trigger("InventoryShouldClose");
  },

  isOpen: function () {
    return this.isVisible;
  },
});
