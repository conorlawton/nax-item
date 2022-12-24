ig.module("nax-item.patches.inventory")
	.requires(
		"nax-item.items.base-item",
		"nax-item.items.consumable",
		"nax-item.items.equipable",
		"nax-item.items.key",
		"nax-item.items.scale",
		"nax-item.items.toggle",
		"nax-item.items.trade",
	)
	.defines(() => {
		nax.Inventory = ig.SingleLoadable.extend({
			_items: {},
			raritySuffixes: {},
			itemCtors: {},
			nameCrossCode: "CrossCode",

			// Only used to reduce iteration counts on this._items
			scalable: [],

			init() {

				Object.defineProperty(this, "items", {
					get() {
						return this._items[this.nameCrossCode] ? Object.values(this._items[this.nameCrossCode]) : [];
					},
				});

				if (!ig.ITEM_DATABASE) {
					return ig.warn("ig.ITEM_DATABASE not initialised.");
				}

				this.parent();

				this.registerItemRarities({
					[nax.ItemRarity.Low]: "",
					[nax.ItemRarity.Normal]: "-normal",
					[nax.ItemRarity.Rare]: "-rare",
					[nax.ItemRarity.Legendary]: "-legend",
					[nax.ItemRarity.Unique]: "-unique",
					[nax.ItemRarity.Backer]: "-backer",
					[nax.ItemRarity.Scale]: "-scale",
				});
			},

			updateScaledEquipment(newLevel) {
				this.scalable.forEach(item => {
					if (item.params) {
						// @ts-ignore sc.ItemLevelScaling exists but is untyped.
						const newParams = sc.ItemLevelScaling.adaptParams(item.params, item.baseLevel, newLevel);
						Object.assign(item.params, newParams);
						item.level = newLevel;
					}
				});
			},

			isScalable(id, modName) {
				const item = this.getItem(id, modName);
				return item ? item instanceof nax.Scalable : false;
			},

			getItem(id, modName) {
				return id < 0 ? null : this._items[modName ?? this.nameCrossCode][id];
			},

			getItemName(id, modName) {
				const item = this.getItem(id, modName);
				return item ? ig.LangLabel.getText(item.name) : null;
			},

			getItemByName(name, modName) {
				const id = this.getItemID(name, modName);
				return id ? id === -1 ? null : this._items[modName ?? this.nameCrossCode][id] : null;
			},

			getItemLevel(id) {
				const item = this.getItem(id);
				return id < 0 || !item ? 0 : item.level || 0;
			},

			getItemID(name, modName) {
				const query = name.trim().toLowerCase();
				for (const [_, item] of Object.entries(this._items[modName ?? this.nameCrossCode])) {
					if (item.name["en_US"].trim().toLowerCase() === query) {
						return item.id;
					}
				}

				return -1;
			},

			getBuffString(id, displayTime, b) {
				if (b || this.isBuffID(id)) {

					let item = this.getItem(id) as nax.Consumable;
					let temp = null;

					let iconString = "";

					let uniform = this.areStatChangesRanksUniform(item.stats);

					item.stats.forEach(stat => {
						temp = sc.STAT_CHANGE_SETTINGS[stat];

						if (!temp || temp['change'] == sc.STAT_CHANGE_TYPE['HEAL']) {
							iconString += `\\i[${(temp['icon'] || "stat-default")}]${(("\\i[" + temp['grade'] + "]") || "")}`;
							uniform || (iconString += `\\i[${temp.grade}]`);
						}
						uniform && (iconString += `\\i[${temp.grade}]`);
					});

					return `${iconString} ${displayTime ? (item.time || 0) * (sc.newgame.get("double-buff-time") ? 2 : 1) + "sec" : ""}`;
				}
			},

			// I have absolutely no idea what this does
			areStatChangesRanksUniform(b) {
				for (
					var a = b.length,
					d = sc.STAT_CHANGE_SETTINGS[b[a - 1]],
					c = d.grade;
					a--;
				) {
					d = sc.STAT_CHANGE_SETTINGS[b[a]];
					if (!d || d.change == sc.STAT_CHANGE_TYPE.HEAL || d.grade != c)
						return;

					c = d.grade;
				}

				return c;
			},

			isBuffID(id, modName) {
				const item = this.getItem(id, modName);

				return (item instanceof (nax.Consumable as new (...args: unknown[]) => nax.Consumable)) && item.isBuff;
			},

			isEquipID(id, modName) {
				return this._items[modName ?? this.nameCrossCode][id].type === nax.ItemType.Equipable;
			},

			getRaritySuffix(rarity) {
				const i = rarity as nax.ItemRarity;
				return this.raritySuffixes[i];
			},

			getItemNameWithIcon(id, modName) {
				const item = this.getItem(id, modName);

				if (item) {
					return this.getItemIcon(id) + ig.LangLabel.getText(item.name);
				} else {
					return "";
				}
			},

			getItemIcon(id, modName) {
				const item = this.getItem(id, modName);

				if (item) {
					return `\\i[${item.icon + this.getRaritySuffix(item.rarity || nax.ItemRarity.Low) || "item-default"}]`;
				} else {
					return "item-default";
				}
			},

			getItemDescription(id, modName) {
				const item = this.getItem(id, modName);

				if (item) {
					return ig.LangLabel.getText(item.description);
				} else {
					return "";
				}
			},

			getItemRarity(id, modName) {
				const item = this.getItem(id, modName);
				return item ? item.rarity : null
			},

			getItemSubType(id, modName) {
				const item = this.getItem(id, modName);

				if (item && (item instanceof (nax.Equipable as new (...args: unknown[]) => nax.Equipable))) {
					return item.equipType;
				} else {
					return null;
				}
			},

			isConsumable(id, modName) {
				const item = this.getItem(id, modName);
				return item ? (item instanceof (nax.Consumable as new (...args: unknown[]) => nax.Consumable)) : false;
			},

			getTotalItemsUnlocked(asPercent, category, equipType, log) {
				let count = 0;
				let total = 0;

				for (let [id, item] of (Object.entries(this._items) as unknown) as [number, nax.BaseItem][]) {
					if (!item.name["en_US"].startsWith("-") && !(item.type === nax.ItemType.Key || item.type === nax.ItemType.Toggleable || item.noTrack || item.noCount)) {
						if (category) {
							if (equipType && (item instanceof (nax.Equipable as new (...args: unknown[]) => nax.Equipable))) {
								if (item.type === category && item.equipType === equipType) {
									if (sc.stats.getMap("items", id)) {
										count++;
									}
									total++;
								}
							} else {
								if (item.type === category) {
									if (sc.stats.getMap("items", id)) {
										count++;
									}
									total++;
								}
							}
						} else {
							if (sc.stats.getMap("items", id)) {
								count++;
							} else {
								if (log) {
									console.log("ITEM MISSING", this.getItemName(id));
								}
							}
							total++;
						}
					}
				}

				return asPercent ? count / total : count;
			},

			// Loading
			loadInternal() {
				$.ajax({
					dataType: "json",
					url: ig.root + ig.ITEM_DATABASE + ig.getCacheSuffix(),
					context: this,
					success: (data) => this.onLoad(data, this.nameCrossCode),
					error: (data) => this.onError(data, this.nameCrossCode),
				});
			},

			onError(data, modName) {
				this._items = {};
				this.loadingFinished(true);
				ig.error("Could not load Inventory json file! Mod:", modName);
			},

			onLoad(data, modName) {
				let items: nax.BaseItem[] = data.items;

				modName ??= this.nameCrossCode;

				this._items[modName] = {};
				items.forEach((item, id) => {
					// @ts-ignore

					const constructedItem = new this.itemCtors[item.type](item);
					constructedItem.id = id;
					modName ??= this.nameCrossCode;
					this._items[modName][id] = constructedItem;
				});

				this.loadingFinished(true);
			},

			// Additions
			getItemCount() {
				return Object.values(this._items).reduce((accumulator, entry) => accumulator + Object.values(entry).length, 0);
			},

			registerItemType(type, itemCtor) {
				this.itemCtors[type] = itemCtor;
			},

			registerItemRarity(rarity, suffix) {
				// @ts-ignore This is for third parties to add their own item rarities.
				this.raritySuffixes[rarity] = suffix;
			},

			registerItemRarities(kvp) {
				Object.entries(kvp).forEach(([rarity, suffix]) => {
					this.registerItemRarity(rarity, suffix)
				});
			},

			getByMatch(regex, modName) {
				return Object.values(this._items[modName ?? this.nameCrossCode]).filter(item => regex.test(item.name["en_US"]));
			},

			loadCustomItemSet(path, modName) {
				$.ajax({
					dataType: "json",
					url: ig.root + path + ig.getCacheSuffix(),
					context: this,
					success: (data) => this.onLoad(data, modName),
					error: (data) => this.onError(data, modName),
				});
			}
		});
	});