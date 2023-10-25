import { Component, OnInit } from '@angular/core';
import { IconSetService } from '@coreui/icons-angular';
import { ToastrService } from 'ngx-toastr';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute, Router } from '@angular/router';
import {
  cilListNumbered,
  cilPaperPlane,
  cilPlus,
  cibAddthis,
  cilPencil,
  cilChartLine,
  cilDelete,
} from '@coreui/icons';
import { PipelineService } from '../../../service/pipeline.service';
import { TokenService } from '../../../service/token.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-pipeline',
  templateUrl: './edit-pipeline.component.html',
  styleUrls: ['./edit-pipeline.component.scss']
})
export class EditPipelineComponent implements OnInit {
  pipelineId: string | undefined;
  pipeline: any;
  isLoading = false;
  isSubmitting = false;
  isFormInvalid = false;

  constructor(
    private iconSet: IconSetService,
    private PipelineService: PipelineService,
    private toastr: ToastrService,
    private TokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    iconSet.icons = {
      cilListNumbered,
      cilPaperPlane,
      cilPlus,
      cibAddthis,
      cilPencil,
      cilChartLine,
      cilDelete,
    };
  }

  ngOnInit(): void {
    const pipelineData = this.route.snapshot.paramMap.get('pipeline');
    if (pipelineData !== null) {
      this.pipeline = JSON.parse(pipelineData);
      this.pipelineId = this.pipeline.pipelineId;

      this.pipeline.source = this.pipeline.source;
      this.pipeline.cloud = this.pipeline.cloud;
      this.pipeline.githubRepository = this.pipeline.githubRepository;

    } else {
      console.error("Pipeline data not found in route.");
    }
  }

  editPipeline(formData: NgForm) {
    this.isLoading = true;
    if (!this.pipelineId) {
      this.isFormInvalid = true;
      this.isLoading = false;
      return;
    }
    this.isFormInvalid = false;
    this.isSubmitting = true;
    this.PipelineService.EditPipeline(this.pipelineId, this.pipeline).subscribe(
      (res: any) => {
        this.isSubmitting = false;
        if (res && res.status === 'success') {
          this.toastr.success('Pipeline updated successfully');
          this.router.navigate(['home/pipeline/add-pipeline']); // Navigate back to the pipeline list page
        } else {
          this.toastr.error('Something went wrong');
        }
      },
      (error) => {
        console.error('API Error:', error);
        this.toastr.error('Failed to update pipeline');
        this.isSubmitting = false;
      }
    );
  }

}
