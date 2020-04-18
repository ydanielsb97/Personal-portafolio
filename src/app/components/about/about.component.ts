import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
	public title: string = "Yeison Serrano";
	public subtitle: string ="Programador Web - Javascript";
	public email: string = "ydanielsb97@gmail.com";

  constructor() { }

  ngOnInit(): void {
  }

}
