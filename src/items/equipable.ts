ig.module("nax-item.items.equipable")
	.requires(
		"nax-item.items.base-item"
	)
	.defines(() => {
		nax.Equipable = nax.BaseItem.extend({
			type: nax.ItemType.Equipable,
			init(data) {
				this.parent(data);
				this.params = data.params;
				this.equipType = data.equipType;
				this.isScalable = false;
				this.properties = data.properties;
			}
		});
	});