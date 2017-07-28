export class RouterStub {

	public url:string = 'dashboard';
	
	public navigateByUrl(url:string) {return url};
	
	public navigate(url: string[]): void {
		console.log('navigating');
	}
	
	public routerState = { 
		root: 'dashboard',
		children: [],
		pathFromRoute: [],
		toString: ():string => { return 'dashboard' }};
	
	public events = { subscribe: () => {}};
}	