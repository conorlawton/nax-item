ig.module("nax-item.items.toggle")
	.requires(
		"nax-item.items.base-item"
	)
	.defines(() => {
		nax.Toggleable = nax.BaseItem.extend({
			type: nax.ItemType.Toggleable,
			init(data) {
				this.parent(data);
			}
		});
	});