export class Project{
	constructor(
		public _id: string,
		public name: string,
		public description: string,
		public category: string,
		public year: number,
		public langs: string,
		public image: string,
		public nameClient: string,
		public dateStart: string,
		public limitTime: any,
		public details: string
		){}
}

