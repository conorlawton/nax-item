export { }

declare global {
	namespace nax {
		interface EquipParams {
			elemFactor: number[];
			hp?: number;
			attack?: number;
			defense?: number;
			focus?: number;
		}
	}
}