import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { CreateComponent } from '../create/create.component';
import { Project } from '../../models/project';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-create2',
  templateUrl: './create2.component.html',
  styleUrls: ['./create2.component.css'],
  providers: [ProjectService]
})
export class Create2Component implements OnInit {
	public id: string;

  constructor(
  	private _projectService: ProjectService,
  	private _router: Router,
  	private _route: ActivatedRoute
  	){

  	 }

  ngOnInit(){
  	this.id = this._route.snapshot.params.id;
  	console.log(this.id);
  }

}
