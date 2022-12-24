ig.module("nax-item.items.trade")
	.requires(
		"nax-item.items.base-item"
	)
	.defines(() => {
		nax.Tradable = nax.BaseItem.extend({
			type: nax.ItemType.Tradable,
			sources: undefined,

			init(data) {
				this.parent(data);
				this.sources = data.sources;
			}
		});
	});