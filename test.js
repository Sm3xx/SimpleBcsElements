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
