import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService, UploadService]
})
export class DetailComponent implements OnInit {
	public url: string;
	public id: string;
	public project: Project;
  public save_project: Project;
  public projectJson: any;
  public filesToUpload: Array<File>;
  public editMode: boolean = false;
  public changeImg: boolean = false;
  public editClic: any = {name: false,
                          description: false,
                          nameClient: false,
                          dateStart: false,
                          limitTime: false,
                          langs: false,
                          details: false
                          };


  constructor(
  	private _projectService: ProjectService,
    private _uploadService: UploadService,
  	private _router: Router,
  	private _route: ActivatedRoute
  	){
  		this.url = Global.url;
  	 }

  ngOnInit(){
  	let param = this._route.snapshot.params;
  	this.id = param.id;
  	this.getDetail();

  }

  changeImage(){
    if(!this.changeImg){
      this.changeImg = true;
    }else{
      this.changeImg = false;
    }
  }

  getDetail(){
  	return this._projectService.getProject(this.id).subscribe(
  		response =>{
  				this.project = response.project;
  		},
  		error =>{
  				console.log(error);
  		});
  }


  //confirm("ESTE METODO SACA UN ALERT DE PARA CONFIRMAR O CANCELAR")
  deleteProject(id){
    if(confirm("¿Estas seguro que deseas borrar este proyecto?")){
      this._projectService.deleteProject(id).subscribe(
      response =>{
        if(response.project){
        this._router.navigate(['/proyectos']);
        }
      },
      error =>{
       console.log(error)
      })


    }

  
  }

  editModeOn(){
    this.editMode = true;
  }

  saveChanges(){
    this._projectService.editProject(this.project).subscribe(
      response =>{
        console.log(response);
        if(this.filesToUpload){

             this._uploadService.makeFileRequest(Global.url+"upload/"+response.project._id, [], this.filesToUpload, 'image' )
             .then((result:any) =>{
               this.save_project = result.project;
               console.log(this.save_project)
               this.editMode = false;
               this.editClic = {name: false,
                          description: false,
                          nameClient: false,
                          dateStart: false,
                          limitTime: false,
                          langs: false,
                          details: false
                          }; // Cierre de objeto editClic
                this.getDetail();

              }) // Cierre de promesa .then
        }else{
          this.getDetail();
          this.editMode = false;
        }

      },
      error => {console.log(error)})
 

  }



  fileChangeEvent(fileInput: any){
    console.log(this.project.image)
    console.log(fileInput)
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload)
  }


  activeEditName(){
    if(!this.editClic.name){
      this.editClic.name = true; 
    }else{
      this.editClic.name = false;
    }
  }

  activeEditDescription(){
    if(!this.editClic.description){
      this.editClic.description = true;
    }else{
      this.editClic.description = false;
    }
  }

  activeEditClient(){
    if(!this.editClic.nameClient){
      this.editClic.nameClient = true; 
    }else{
      console.log(this.editClic.nameClient);
      this.editClic.nameClient = false;
    }
   }
  activeEditdateStart(){
    if(!this.editClic.dateStart){
      this.editClic.dateStart = true; 
    }else{
      this.editClic.dateStart = false;
    }
  }

  activeEditlimitTime(){
    if(!this.editClic.limitTime){
      this.editClic.limitTime = true; 
    }else{
      this.editClic.limitTime = false;
    }
  }

  activeEditlangs(){
    if(!this.editClic.langs){
      this.editClic.langs = true; 
    }else{
      this.editClic.langs = false;
    }
  }

  activeEditDetails(){
    if(!this.editClic.details){
      this.editClic.details = true; 
    }else{
      this.editClic.details = false;
    }
  }


}
