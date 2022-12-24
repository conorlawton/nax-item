export { }

declare global {
	namespace nax {
		const enum ItemType {
			Consumable = "CONS",
			Equipable = "EQUIP",
			Tradable = "TRADE",
			Key = "KEY",
			Toggleable = "TOGGLE"
		}
	}
}