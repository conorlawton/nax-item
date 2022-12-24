ig.module("nax-item.items.scale")
	.requires(
		"nax-item.items.base-item",
		"nax-item.items.equipable"
	)
	.defines(() => {
		nax.Scalable = nax.Equipable.extend({
			type: nax.ItemType.Equipable,
			isScalable: true,
			init(data) {
				this.parent(data);
				this.isScalable = true;
			}
		});
	});