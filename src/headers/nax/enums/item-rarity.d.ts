export { }

declare global {
	namespace nax {
		const enum ItemRarity {
			Low = 0,
			Normal = 1,
			Rare = 2,
			Legendary = 3,
			Unique = 4,
			Backer = 5,
			Scale = 6
		}

		type RaritySuffixes = {[K in nax.ItemRarity]?: string };
	}
}