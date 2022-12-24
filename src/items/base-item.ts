ig.module("nax-item.items.base-item")
	.requires("impact.feature.effect.effect-sheet")
	.defines(() => {
		nax.BaseItem = ig.Class.extend({
			init(data) {
				if (data.effect && data.effect.sheet && data.effect.name) {
					// @ts-ignore ig.EffectHandle is not typed.
					this.effect = new ig.EffectHandle(data.effect);
				}

				this.rarity = data.rarity;
				this.label = data.label;
				this.amount = data.amount;
				this.noTrack = data.noTrack;
				this.noCount = data.noCount;
				this.order = data.order;
				this.name = data.name;
				this.description = data.description;
				this.icon = data.icon;
				this.cost = data.cost;
			}
		});
	});