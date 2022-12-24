ig.module("nax-item.items.key")
	.requires(
		"nax-item.items.base-item"
	)
	.defines(() => {
		nax.Key = nax.BaseItem.extend({
			type: nax.ItemType.Key,
			init(data) {
				this.parent(data);
			}
		});
	});