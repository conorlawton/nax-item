export { };

declare global {
	namespace sc {
		interface StatsModel extends ig.GameAddon {
			getMap(this: this, map: string, stat: string | number): number;
		}
	}
}
