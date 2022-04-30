import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() formData: any[] = [];
  @ViewChild('addNewReportModal', { static: true })
  addNewReportModal!: ModalDirective;
  constructor() {}
  ngOnInit(): void {}

  getCssClasses(css: string[] | undefined): string {
    if (css) {
      return css.join(' ');
    } else {
      return 'col-md-4';
    }
  }

  show() {
    this.addNewReportModal.show();
  }

  getInputType(type: string): 'select' | 'input' | 'heading' {
    if (type === 'select') {
      return 'select';
    }
    if (type === 'heading') {
      return 'heading';
    }
    return 'input';
  }
}
