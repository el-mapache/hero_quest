window.HeroQuest = window.HeroQuest || {};

window.HeroQuest.Templates = {
  treasure: `<div class="spell-list-inner text-center">
        <br />
        <h3 class="light-blue">searching for treasure you find...</h3>
        <br />
        <h1 class="red munro-regular column2 center"><%= obj.name %>!</h1>
        <br />
        <div class="<%= obj.type %> center"></div>
        <br />
        <p class="munro-small column2 center txt-white" style="font-size: 19px">
          <%= obj.desc %>
        </p>
        <br />
        <button type="button" id="close" class="munro-small">Close</button>
        <br /><br />
      </div>`,

  unitView: `<div
        class="unit-view column3 wall-background"
        style="border: 3px solid rgb(23, 23, 23);"
      >
        <h1 class="name red munro-regular column2 margin-left-medium">
          <%= name %>
        </h1>
        <h3
          class="flavor txt-white munro-small column2 margin-left-medium"
          style="font-weight:500"
        >
          <%= flavor %>
        </h3>

        <div class="stats munro-small">
          <!--<p style="color: white"><%= type %></p>-->
          <div class="stat column1">
            <p class="pull-left">attack</p>
            <p class="offset1"><%= attack %></p>
          </div>
          <div class="stat column1">
            <p class="pull-left">defense</p>
            <p class="defend offset1"><%= defense %></p>
          </div>
          <div class="stat column1">
            <p class="pull-left">body</p>
            <p class="body offset1"><%= body %></p>
          </div>
          <div class="stat column1">
            <p class="pull-left">mind</p>
            <p class="mind offset1"><%= mind %></p>
          </div>
          <div class="stat column1">
            <p class="pull-left">movement</p>
            <p class="offset1"><%= moves %></p>
          </div>
        </div>
      </div>`,

  actionButtons: `<div class="column2 action-buttons">
        <div class="column2" style="margin-bottom: 10px">
          <button
            class="btn btn-action btn-move"
            data-action="move"
            data-title="Move"
            disabled="true"
          ></button>
          <button
            class="btn btn-action btn-attack"
            data-action="attack"
            data-title="Attack"
            disabled="true"
          ></button>
          <button
            class="btn btn-action btn-spell"
            data-action="castSpell"
            data-title="Spell"
            disabled="true"
          ></button>
        </div>
        <div class="column2">
          <button
            class="btn btn-action btn-search"
            data-action="search"
            data-title="Search"
            disabled="true"
          ></button>
          <button
            class="btn btn-action btn-inv"
            data-action="inventory"
            data-title="Items"
            disabled="true"
          ></button>
          <button
            class="btn btn-action btn-cancel"
            data-action="cancel"
            data-title="Cancel"
            disabled="true"
          ></button>
        </div>
      </div>`,

  spellbook: `<div class="inventory-list column3" style="z-index:1000000">
        <div class="spell-list-inner">
          <div>
            <span class="torch"></span>
            <h2 class="gold munro-small">SpellBook</h2>
          </div>
          <table class="munro-small">
            <tbody>
              <tr>
                <th>Spell</th>
                <th>School</th>
              </tr>
              <% for (var school in obj) { %> <% for (var i = 0; i <
              obj[school].length; i++) { %> <%= disabled = obj[school][i].used ?
              "spell-item-disabled" : '' %>
              <tr
                class="spell-item <%= disabled %>"
                data-school="<%= obj[school][i].school%>"
                data-name="<%= obj[school][i].id %>"
              >
                <td><%= obj[school][i].name %></td>
                <td><%= school %></td>
                <td><button class="munro-small">Cast</button></td>
              </tr>
              <% } %> <% } %>
            </tbody>
          </table>
        </div>
      </div>`,

  inventory: `<div class="inventory-list">
        <div>
          <h2 class="gold munro-small text-center">Inventory</h2>
        </div>
        <div class="cf"></div>
        <table>
          <thead>
            <th>Item</th>
            <th>Qty</th>
            <th>Action</th>
          </thead>
          <tbody>
            <% for (var i = 0; i < obj.length; i++) { %>
            <tr class="munro-small gold-bottom-border">
              <td><%= obj[i].name %></td>
              <td>x<%= obj[i].length %></td>
              <td>
                <button
                  type="button"
                  class="munro-small"
                  data-action="drink"
                  data-id="<%= obj[i].id %>"
                  data-stack="<%= obj[i].stack %>"
                >
                  Drink
                </button>
              </td>
            </tr>
            <% } %>
          </tbody>
        </table>
        <button id="close" class="munro-small medium-font medium-top-margin">
          Close
        </button>
      </div>`,

  gameView: `<div class="column2 blk-bg munro-small txt-white wall-background" style="font-size: 17px;padding:10px">
        <p>Game Time: <span data-bind="playTime"></span></p>
        <br>

        <p>Total Turns: <span data-bind="totalTurns"></span></p>
        <br>

        <p>Current Player: <span data-bind="activePlayer"></span></p>
        <br>

        <p>Acting Unit: <span data-bind="activeUnit"></span></p>
        <br>
        <br>
        <button id="end-turn">End Turn</button>
      </div>`
};
