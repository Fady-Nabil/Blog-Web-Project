import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { UpdatePostRequest } from 'src/app/models/update-post.model';
import { PostService } from 'src/app/services/post.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-view-post',
  templateUrl: './admin-view-post.component.html',
  styleUrls: ['./admin-view-post.component.css']
})
export class AdminViewPostComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router,private route: ActivatedRoute, private postService: PostService) { }
  post : Post | undefined;
  UpdatePostForm!: FormGroup;
  submitted = false;
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
      const id = Number(params.get('id'));
      if(id) {
        this.postService.getPostById(id).subscribe(
          response => {
            this.post = response;
            // console.log(response);
          }
        );
      }
    });
    this.UpdatePostForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  onSubmit() : void {
    this.submitted = true;
    // stop the process here if form is invalid
    if (this.UpdatePostForm.invalid) {
      return;
    }
    const updatePostRequest: UpdatePostRequest = {
      title: this.post?.title,
      body: this.post?.body,
      creationDate : new Date(),
    }
    this.postService.updatePost(this.post?.id, updatePostRequest).subscribe(response => {
      alert("Post Updated Successfully");
      this.router.navigate(['']);
    });
  }

  deletePost() : void {
    if(confirm("Are you sure to delete")) {
      this.postService.deletePost(this.post?.id).subscribe(response => {
        alert("Post Deleted Successfully");
        this.router.navigate(['']);
      });
    }
  }
}
