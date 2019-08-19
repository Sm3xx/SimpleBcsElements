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

	function DropDownElement(options){
		const ITEM = {
			_element: createDropDownElements(),

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

			setDisabled: function(disabled){
				if (disabled) this._element.querySelector('a').classList.add('disabled', 'dropDown');
				else this._element.querySelector('a').classList.remove('disabled', 'dropDown');

				return this;
			}
		};

		Object.assign(ITEM, ELEMENT);
		return ITEM.setProperties(options);
	}

	function createButtonElements(){
		const a = document.createElement('a');
		a.className = 'hasNoSelectedRows';

		const span = document.createElement('span');

		a.append(span);
		return a;
	}

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

	function lightenDarkenColor(col, amt){
		var usePound = false;
		if (col[0] == '#') {
			col = col.slice(1);
			usePound = true;
		}

		var num = parseInt(col, 16);

		var r = (num >> 16) + amt;

		if (r > 255) r = 255;
		else if (r < 0) r = 0;

		var b = ((num >> 8) & 0x00ff) + amt;

		if (b > 255) b = 255;
		else if (b < 0) b = 0;

		var g = (num & 0x0000ff) + amt;

		if (g > 255) g = 255;
		else if (g < 0) g = 0;

		console.log((usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16));
		return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
	}

	BCS.newDropDownElement = function(settings){
		return DropDownElement(settings);
	};

	BCS.newButton = function(settings){
		return Button(settings);
	};

	const style = document.createElement('style');
	style.innerText =
		'.disabled {background: #dedede !important; background-image: none !important; color: #a2a2a2 !important; box-shadow: none !important; cursor: default !important}' +
		'.disabled.dropDown {background: transparent !important; background-image: none !important; color: #a2a2a2 !important; box-shadow: none !important;}' +
		'.disabled.dropDown:hover {background: #d6d6d6 !important; color: black !important;}';
	document.getElementsByTagName('body')[0].append(style);
})();
