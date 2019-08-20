(function(){
	var BCS = window.BCS;
	const ELEMENT = {
		_parent: null,
		html: function(){
			return this._element;
		},
		attachTo: function(element){
			this._parent = element;
			return this;
		},
		remove: function(){
			this._element.remove();
			return true;
		},
		create: function(){
			this._parent.appendChild(this._element);
			return this;
		}
	};

	/**
	 * Create a new Button
	 * @param {Object} options Buttons Settings
	 * @property {String} text Button Text
	 * @property {String} helpText Help text of the button
	 * @property {String} href Link that should be opend on click
	 * @property {Function} onclick Click Handler
	 * @property {String} css CSS String for styling the button
	 * @property {String} type Type of the Button (bcs_blue, bcs_gray)
	 * @property {String} background HEX Color code for background
	 * @property {String} text_color HEX Color code for text
	 * @property {Boolean} color_gradient Activate color gradient for the button
	 * @returns {Object} Button Instance
	 */
	function Button(options){
		const ITEM = {
			_element: createButtonElements(),

			setProperties: function(options){
				const label = this._element.querySelector('span');

				helplabels['contextinfo_' + options.text.replace(' ', '_')] = options.helpText;

				label.innerHTML = options.text;
				label.classList.add('hover');

				this._element.setAttribute(
					'onmouseover',
					`showInfo(this, 'contexthelp', 'contextinfo_${options.text.replace(' ', '_')}', '')`
				);

				if (options.href) this._element.setAttribute('href', options.href);
				if (options.onclick) {
					this._element.onclick = function(){
						if (this._element.classList.contains('disabled')) return;

						if (typeof options.onclick === 'function') {
							options.onclick();
						}
					}.bind(this);
				}

				if (options.css) this._element.style = options.css;

				if (options.type) {
					switch (options.type) {
						case 'bcs_blue':
							options.background = '#32a0e6';
							options.text_color = '#fff';
							options.color_gradient = true;
							break;
						case 'bcs_gray':
							options.color_gradient = true;
							options.background = 'transparent';
							break;
					}
				}

				if (options.text_color) this._element.style.color = options.text_color;

				if (options.background) {
					this._element.style.backgroundColor = options.background;
				}

				if (options.color_gradient === true && options.background === '#32a0e6') {
					this._element.style.backgroundImage =
						'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAgCAYAAAAv8DnQAAABIklEQVQ4EZVSCY4DIQyDER/bR/d5JWs7DpO2q0qLRhPjHDiB+fOIGAMfFtGcabknXkHWAaAQxD08XIAKYKSWStDBoEy7ZHqR9DkgxmKZGFtElmaES0oD3NNEGNNyTZhFUMQHZkBs/O+Kyu2aIfLLkga0dDIcmwp6m+Wwh2PQSGBTpAfDuAYH5XkOTnWlbq6IGlKnb7yYe0Si/sTF5IVl0B8a2nFIUEA2ZOUoV0JZ+ft7YEA2nOcd7BI87NJFEdXRZUX9+z28tSmR/FXf+aI5C5DiIXJj4J0oR1m0iVGHU1QOLm8pHC9qw29GrwuY1isHVaMj2TG2OqK4FIkTXJA8RN7XrZuH87wA4LWfW1fsI+E9SDi7sGzO4+M9kKxBMfcVj/ELI1PTxuT7jsEAAAAASUVORK5CYII=)';
				} else if (options.background !== 'transparent') {
					this._element.style.backgroundImage = 'none';
				}

				return this;
			},

			setProperty: function(prop, value){
				this._element.setAttribute(prop, value);

				return this;
			},

			setDisabled: function(disabled){
				if (disabled) this._element.classList.add('disabled');
				else this._element.classList.remove('disabled');

				return this;
			}
		};

		Object.assign(ITEM, ELEMENT);
		return ITEM.setProperties(options);
	}

	/**
	 * Create a new DropDown Menu element
	 * @param {Object} options Settings for the Element
	 * @property {String} text Text of the Button
	 * @property {Boolean} seperated Create gray bar on top of element
	 * @property {String} background HEX value of a color for the background
	 * @property {String} icon URL to an Image to display
	 * @property {Function} onclick Click Handler Function
	 * @returns {Object} DropDownElement Instance
	 */
	function DropDownElement(options){
		const ITEM = {
			_element: createDropDownElements(),

			/**
			 * Set Properties of the Element
			 * @private
			 * @param {Object} options Settings Object
			 * @returns {Object} 
			 */
			setProperties: function(options){
				if (options.seperated) this._element.style = 'border-top: 1px solid rgb(230, 230, 230)';
				if (options.text) this._element.querySelector('span').innerHTML = options.text;
				if (options.background) this._element.style += 'background:' + options.background;

				if (options.icon) this._element.querySelector('img').setAttribute('src', options.icon);
				else this._element.querySelector('img').remove();

				if (options.onclick) {
					this._element.onclick = function(){
						if (this._element.querySelector('a').classList.contains('disabled')) return;

						if (typeof options.onclick === 'function') {
							options.onclick();
						}
					}.bind(this);
				}

				return this;
			},

			/**
			 * Set the button active/inactive
			 * @param {Boolean} disabled Disabled boolean
			 */
			setDisabled: function(disabled){
				if (disabled) this._element.querySelector('a').classList.add('disabled', 'dropDown');
				else this._element.querySelector('a').classList.remove('disabled', 'dropDown');

				return this;
			}
		};

		Object.assign(ITEM, ELEMENT);
		return ITEM.setProperties(options);
	}

	/**
	 * Create a new DropDownButton
	 * @param {Object} options Settings for the Button
	 * @property {String} text Text of the DropDown Button
	 * @returns {Object} DropDownButtonElement Instance
	 */
	function DropDownButton(options){
		const ITEM = {
			_element: createDropDownButtonElements(),
			_id: Math.random().toString(36).substring(7),

			/**
			 * Set the Properties of the Element
			 * @private
			 * @param {Object} options 
			 */
			setProperties: function(options){
				if (options.text) this._element.innerHTML = options.text + this._element.innerHTML;
				this._element.id = this._id;

				return this;
			},

			/**
			 * Set the menu to be opened on click
			 * @param {Object} menu Menu Object
			 */
			setMenuToOpen: function(menu){
				document.getElementsByTagName('form')[0].appendChild(menu._element);
				this._element.setAttribute(
					'onclick',
					"return openSubMenu('" + menu.id + "', '" + this._id + "', null, null, null, event)"
				);
			}
		};

		Object.assign(ITEM, ELEMENT);
		return ITEM.setProperties(options);
	}

	/**
	 * Create new DropDownMenu
	 */
	function DropDownMenu(){
		const MENU = {
			_id: Math.random().toString(36).substring(7),
			_element: createDropDownMenuElements(),

			get id() {
				return this._id;
			},

			/**
			 * Add a new Element to the Menu
			 * @param {Object} element DropDownElement Instance
			 */
			addElement: function(element){
				const menu = this._element.querySelector('table table');
				element.attachTo(menu).create();
			}
		};
		MENU._element.id = MENU._id;
		return MENU;
	}

	/**
	 * Create all HTML elements for the Button
	 */
	function createButtonElements(){
		const a = document.createElement('a');
		a.className = 'hasNoSelectedRows';

		const span = document.createElement('span');

		a.append(span);
		return a;
	}

	/**
	 * Create all HTML elemens for the DropDownElemnt
	 */
	function createDropDownElements(){
		const tr = document.createElement('tr');

		const td = document.createElement('td');
		td.className = 'submenu_item_jq';
		td.style = 'vertical-align:middle;white-space:nowrap';

		const a = document.createElement('a');

		const img = document.createElement('img');
		img.className = 'objecticon';
		img.height = '16';
		img.width = '16';

		const span = document.createElement('span');

		a.appendChild(img);
		a.appendChild(span);

		td.appendChild(a);
		tr.appendChild(td);

		return tr;
	}

	/**
	 * Create all HTML elements for the DropDown Button
	 */
	function createDropDownButtonElements(){
		const a = document.createElement('a');
		const img = document.createElement('img');

		img.setAttribute('src', '/graphics/menu_arrow_down.png?t=19.1.29');
		img.setAttribute('height', '13');
		img.setAttribute('width', '17');

		a.appendChild(img);
		a.className = 'submenu_openlink';
		return a;
	}

	/**
	 * Create all HTML elements for the DropDownMenu
	 */
	function createDropDownMenuElements(){
		const div = document.createElement('div');
		div.classList = 'submenu_layer layer_hidden';
		div.style =
			'left: 1721px;top: 154px;min-width: 150px;min-height: 1px;position: absolute;transform: translate3d(0px, 0px, 0px);';

		const outerTable = document.createElement('table');
		outerTable.className = 'rte_cleanable';

		const outerTr = document.createElement('tr');
		const outerTd = document.createElement('td');

		const innerTable = document.createElement('table');
		innerTable.className = 'rte_cleanable';
		innerTable.style.float = 'left';

		outerTd.appendChild(innerTable);
		outerTr.appendChild(outerTd);
		outerTable.appendChild(outerTr);
		div.appendChild(outerTable);

		return div;
	}

	// Adding all functions to the BCS Object
	BCS.newDropDownElement = function(settings){
		return DropDownElement(settings);
	};

	BCS.newButton = function(settings){
		return Button(settings);
	};

	BCS.newDropDownButton = function(settings){
		return DropDownButton(settings);
	};

	BCS.newDropDownMenu = function(settings){
		return DropDownMenu(settings);
	};

	// Set the Style for disabled buttons
	const style = document.createElement('style');
	style.innerText =
		'.disabled {background: #dedede !important; background-image: none !important; color: #a2a2a2 !important; box-shadow: none !important; cursor: default !important}' +
		'.disabled.dropDown {background: transparent !important; background-image: none !important; color: #a2a2a2 !important; box-shadow: none !important;}' +
		'.disabled.dropDown:hover {background: #d6d6d6 !important; color: black !important;}';
	document.getElementsByTagName('body')[0].append(style);
})();
