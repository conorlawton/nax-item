ig.module("nax-item.items.consumable")
	.requires(
		"nax-item.items.base-item"
	)
	.defines(() => {
		nax.Consumable = nax.BaseItem.extend({
			type: nax.ItemType.Consumable,

			init(data) {
				this.parent(data);
				if (data.isBuff) {
					this.isBuff = data.isBuff;
				}
			}
		});
	});