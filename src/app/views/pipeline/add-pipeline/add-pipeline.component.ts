import { Component, OnInit,Output, EventEmitter} from '@angular/core';
import { IconSetService } from '@coreui/icons-angular';
import { ToastrService } from 'ngx-toastr';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
  cilListNumbered,
  cilPaperPlane,
  cilPlus,
  cibAddthis,
  cilPencil,
  cilChartLine,
  cilDelete,
  cilMediaPlay
} from '@coreui/icons';
import { PipelineService } from '../../../service/pipeline.service';
import { TokenService } from '../../../service/token.service';
import { NgForm } from '@angular/forms';
import { PopupComponent } from '../popup/popup.component';


interface Pipeline {
  name: string;
  source: string;
  cloud: string;
  githubRepository: string;
}

@Component({
  selector: 'app-add-pipeline',
  templateUrl: './add-pipeline.component.html',
  styleUrls: ['./add-pipeline.component.scss'],

})
export class AddPipelineComponent implements OnInit {
  @Output() confirmDeleteEvent = new EventEmitter<void>();
  @Output() cancelDeleteEvent = new EventEmitter<void>();

  confirmDelete() {
    this.confirmDeleteEvent.emit();
  }


  cancelDelete() {
    this.cancelDeleteEvent.emit();
  }
  pipelineName: string = '';
  source: string = '';
  cloud: string = '';
  githubRepository: string = '';

  data: Pipeline[] = [];

  pageSize: number = 5;
  currentPage: number = 1;
  isLoading = true;
  isSubmitting = false;
  isFormInvalid = false;
  //public Editor = ClassicEditor;
  ckeditorContent = '';
  showSpinner = false;

  public config = {
    itemsPerPage: 5,
    currentPage: 1,
  };

  constructor(
    public iconSet: IconSetService,
    private PipelineService: PipelineService,
    private toastr: ToastrService,
    private TokenService: TokenService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    public dialog: MatDialog
  ) {
    iconSet.icons = {
      cilListNumbered,
      cilPaperPlane,
      cilPlus,
      cibAddthis,
      cilPencil,
      cilChartLine,
      cilDelete,
      cilMediaPlay
    };
  }

  ngOnInit(): void {
    this.fetchAllPipelines();
  }

  handleActionClick( githubRepository: string,name: string,) {




    this.PipelineService.TriggerPipeline(githubRepository,name)
    //console.log('Clicked URL:', url);

  }


  fetchAllPipelines() {
    this.TokenService.fetchToken();
    this.isLoading = true;
    this.PipelineService.fetchAllPipelines().subscribe(
      (data: Pipeline[]) => {
        this.isLoading = false;
        console.log(data)
        if (data && data.length > 0) {
          this.data = data;
        } else {
          this.isLoading = false;
          this.toastr.error('You have not created any pipeline');
        }
      },
      (error) => {
        this.isLoading = false;
        this.toastr.error('Failed to fetch pipelines');
        console.error(error);
      }
    );
  }

  createPipeline(formData: NgForm) {
    this.isLoading = true;
    if (!this.pipelineName || !this.source || !this.cloud || !this.githubRepository) {
      this.isFormInvalid = true;
      this.isLoading = false;
      return;
    }
    this.isFormInvalid = false;
    this.isSubmitting = true;
    this.PipelineService.CreatePipeline({
      name: this.pipelineName,
      source: this.source,
      cloud: this.cloud,
      githubRepository: this.githubRepository,
    }).subscribe(
      (res: any) => {
        this.isSubmitting = false;
        formData.resetForm();
        if (res && res.status === 'success') {
          this.toastr.success('Pipeline created successfully');
          this.fetchAllPipelines();
          // window.location.reload();
        } else {
          this.toastr.error('Something went wrong');
        }
      },
      (error) => {
        this.isSubmitting = false;
        console.error('API Error:', error);
        this.toastr.error('Failed to create pipeline');
      }
    );
  }

  editPipeline(pipeline: Pipeline) {
    this.router.navigate([
      'home/pipeline/edit-pipeline',
      { pipeline: JSON.stringify(pipeline) },
    ]);
  }


  deletePipeline(pipeline: any){
    //this.dialog.open(PopupComponent)
     const dialogRef = this.dialog.open(PopupComponent);

     dialogRef.afterClosed().subscribe(result => {
       //console.log(`Dialog result: ${result}`);


       if(result===true){
        this.PipelineService.DeletePipeline(pipeline.pipelineId).subscribe(
          (res: any) => {
            if (res && res.status === 'success') {
              this.toastr.success('Pipeline deleted successfully');

              // Navigate to the current page again to refresh it
              const currentUrl = this.router.url;
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate([currentUrl]);
              });
            } else {
              this.toastr.error('Something went wrong');
            }
          },
          (error) => {
            console.error('API Error:', error);
            this.toastr.error('Failed to delete pipeline');
          }
        );





       }
     });

   }



}
