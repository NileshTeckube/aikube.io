import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPipelineComponent } from './add-pipeline/add-pipeline.component';
import { EditPipelineComponent } from './edit-pipeline/edit-pipeline.component';

const routes: Routes = [
    {
        path: '', 
        children: [
          {
            path: 'add-pipeline',
            component: AddPipelineComponent, 
          },
        ],
      },
      {path:'edit-pipeline',component:EditPipelineComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PipelineRoutingModule { }
