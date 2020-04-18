import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.css'],
	providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {
	public title: string;
	public project: Project;
	public save_project: Project;
	public status: string;
	public filesToUpload: Array<File>;
	public page: number = 1;

	constructor(
		private _projectService: ProjectService,
		private _uploadService: UploadService
		){
		this.title = "Crear proyecto";
		this.project = new Project("", "", "", "", 2020, "", "", "", "", "", "");}

	ngOnInit(): void {
	}

	onSubmit(form){
		if (this.page == 1) {
			this.page = 2
      console.log(this.project)
		}else{
			console.log(this.project)
			this._projectService.saveProject(this.project).subscribe(
				response =>{
					 console.log("Este es el response"+JSON.stringify(response.project))

					if(response.project){

						this._uploadService.makeFileRequest(Global.url+"upload/"+response.project._id, [], this.filesToUpload, 'image' )
						.then((result:any) =>{
							this.save_project = result.project;
							this.status = "success";
							console.log(this.save_project)

							this.page = 1
							this.project = new Project("", "", "", "", 2020, "", "", "", "", "", "");

						});

					}else{
						this.status = "failed";
					}
				},
				error =>{
					console.log(<any>error);
					
				})
		}
	};

	Back(){
		this.page = 1;
	}

	fileChangeEvent(fileInput: any){
		console.log(fileInput)
		this.filesToUpload = <Array<File>>fileInput.target.files;
		console.log(this.filesToUpload)
	}


}
