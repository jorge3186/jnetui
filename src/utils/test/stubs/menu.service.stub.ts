import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { MenuItem } from '../../../services/menu.service';

export class MenuServiceStub {

	menu: MenuItem[] = [];

	public getMenu(): Observable<MenuItem[]> {
		let subject = new BehaviorSubject(this.menu);
		return subject.asObservable();
	}

	public getSubmenu(url: string): MenuItem[] {
		return this.menu;
	}
	
}