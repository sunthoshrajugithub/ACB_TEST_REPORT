import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-breaker-details',
  templateUrl: './manage-breaker-details.component.html',
  styleUrls: ['./manage-breaker-details.component.scss'],
})
export class ManageBreakerDetailsComponent implements OnInit {
  @Input() formData: any[] = [];
  @ViewChild('addNewReportModal', { static: true })
  addNewReportModal!: ModalDirective;
  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  show() {
    this.addNewReportModal.show();
  }
}
