import { Component, OnInit } from '@angular/core';
import { AddPostRequest } from 'src/app/models/add-post.model';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import {Router} from "@angular/router"
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-add-post',
  templateUrl: './admin-add-post.component.html',
  styleUrls: ['./admin-add-post.component.css']
})
export class AdminAddPostComponent implements OnInit {

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private router: Router, private postService: PostService) { }
  AddPostForm!: FormGroup;
  submitted = false;

  post: AddPostRequest = {
    title: '',
    body: '',
    creationDate: new Date(),
  };

  ngOnInit(): void {
    this.AddPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }
  onSubmit() : void {
    this.submitted = true;
    // stop the process here if form is invalid
    if (this.AddPostForm.invalid) {
      return;
    }
    
    this.postService.addPost(this.post).subscribe(response => {
      alert("Post Added Successfully");
      this.router.navigate(['']);
    });
  }

}
