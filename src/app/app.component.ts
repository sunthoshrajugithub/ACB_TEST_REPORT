import { Component } from '@angular/core';
import {
  addDoc,
  collection,
  docData,
  Firestore,
} from '@angular/fire/firestore';
import { doc, writeBatch } from '@firebase/firestore';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  dataString: any[] = [];
  testReportFields = [
    'sl_no',
    'date',
    'service',
    'customer',
    'location',
    'contact_person',
    'mobile',
    'e_mail',
    'panel',
    'feeder_name',
    'model',
    'mlfb',
    'z_options',
    'id_no',
    'breaker_rating',
    'size',
    'pole',
    'breaker',
    'etu',
    'in',
    'l_tripping_ir',
    'long_time_current',
    'l_time_lag_tr',
    'memory',
    'short_time_isd',
    'short_time_current_isd',
    'short_time_delay_tsd',
    'i_tripping_ii',
    'i_tripping_current_ii',
    'n_tripping_in',
    'i_n',
    'g_ct',
    'g_tripping_ig',
    'g_alarm_ig',
    'time_delay_tg_trip',
    'etu_status',
    'ct_test',
    'function_test',
    'mechanical_reclosing_lockout',
    'trip_unit',
    'mechanical_interlock',
    'racking_handle',
    'racking_mechanism',
    'contact_erosion_indicator',
    'arc_chutes',
    'shutter',
    'lamination_contacts',
    'guide_frame_terminals',
    'contact_pressure',
    'pole_set',
    'lubrication',
    'auxiliary_contact_block',
    'spring_charging_manual',
    'spring_charging_motor',
    'undervoltage',
    'closing_coil',
    'shunt_coil',
    'ready_to_close_interlock',
    'breaker_operations_manual',
    'breaker_operations_electrical',
    'overall_breaker_healthiness',
    'tested_by',
    'contact_no_1',
    'reviewed_by',
    'contact_no_2',
  ];
  inProgress = false;

  formData = [
    { id: 'date', cssClasses: ['col-md-6'], label: 'date', type: 'date' },
    { id: 'id_no', cssClasses: ['col-md-6'], label: 'id_no', type: 'text' },
    {
      id: 'heading_one',
      cssClasses: [
        'col-md-12 text-muted fw-bold h5 border-bottom pb-2 mt-3 mb-0',
      ],
      label: 'Customer Details',
      type: 'heading',
    },
    {
      id: 'customer',
      cssClasses: ['col-md-4'],
      label: 'customer',
      type: 'text',
    },
    {
      id: 'location',
      cssClasses: ['col-md-4'],
      label: 'location',
      type: 'text',
    },
    {
      id: 'service',
      label: 'service',
      cssClasses: ['col-md-4'],
      type: 'select',
      options: ['OTC', 'AMC'],
    },
    {
      id: 'contact_person',
      cssClasses: ['col-md-4'],
      label: 'contact_person',
      type: 'text',
    },
    { id: 'mobile', cssClasses: ['col-md-4'], label: 'mobile', type: 'tel' },
    { id: 'e_mail', cssClasses: ['col-md-4'], label: 'e_mail', type: 'email' },
    {
      id: 'heading_two',
      cssClasses: [
        'col-md-12 text-muted fw-bold h5 border-bottom pb-2 mt-3 mb-0',
      ],
      label: 'Breaker Details',
      type: 'heading',
    },
    {
      id: 'model',
      cssClasses: ['col-md-4'],
      label: 'Series',
      type: 'select',
      options: ['3WA', '3WL', '3WL+', '3WT', '3WT+', '3WN6', '3WN1', '3WE'],
    },
    { id: 'mlfb', cssClasses: ['col-md-4'], label: 'Model', type: 'text' },
    {
      id: 'z_options',
      cssClasses: ['col-md-4'],
      label: 'Z Options',
      type: 'text',
    },
    {
      id: 'breaker_rating',
      cssClasses: ['col-md-4'],
      label: 'Rating',
      type: 'text',
    },
    { id: 'size', cssClasses: ['col-md-4'], label: 'Size', type: 'text' },
    {
      id: 'pole',
      cssClasses: ['col-md-4'],
      label: 'No. of poles',
      type: 'text',
    },
    { id: 'breaker', cssClasses: ['col-md-4'], label: 'Type', type: 'text' },
    { id: 'etu', cssClasses: ['col-md-4'], label: 'Release', type: 'text' },
    { id: 'panel', cssClasses: ['col-md-4'], label: 'Location', type: 'text' },
    {
      id: 'feeder_name',
      cssClasses: ['col-md-4'],
      label: 'Feeder',
      type: 'text',
    },
    {
      id: 'etu_serial_no',
      cssClasses: ['col-md-4'],
      label: 'ETU Serial No',
      type: 'text',
    },
    {
      id: 'in',
      cssClasses: ['col-md-4'],
      label: 'Rating Plug <code>I<sub>n</sub></code>',
      type: 'text',
    },
    {
      id: 'last_serviced_on',
      cssClasses: ['col-md-4'],
      label: 'Last Serviced',
      type: 'text',
    },
    {
      id: 'l_tripping_ir',
      cssClasses: ['col-md-4'],
      label: 'Long Time -Tripping',
      type: 'select',
      options: ['Vamsee', 'Kalyan', 'Santhoosh', 'Raju'],
    },
    {
      id: 'long_time_current',
      cssClasses: ['col-md-4'],
      label:
        'Long Time -Tripping <code class="text-secondary">I<sub>r</sub></code> (Overload)',
      type: 'text',
    },
    { id: 'memory', cssClasses: ['col-md-4'], label: 'memory', type: 'text' },
    {
      id: 'l_time_lag_tr',
      cssClasses: ['col-md-4'],
      label: 'l_time_lag_tr',
      type: 'text',
    },
    {
      id: 'short_time_isd',
      cssClasses: ['col-md-4'],
      label: 'short_time_isd',
      type: 'text',
    },
    { id: 'In', cssClasses: ['col-md-4'], label: 'In', type: 'text' },
    {
      id: 'short_time_current_isd',
      label: 'short_time_current_isd',
      type: 'text',
    },
    {
      id: 'short_time_delay_tsd',
      cssClasses: ['col-md-4'],
      label: 'short_time_delay_tsd',
      type: 'text',
    },
    {
      id: 'i_tripping_ii',
      cssClasses: ['col-md-4'],
      label: 'i_tripping_ii',
      type: 'text',
    },
    { id: 'In', cssClasses: ['col-md-4'], label: 'In', type: 'text' },
    {
      id: 'i_tripping_current_ii',
      label: 'i_tripping_current_ii',
      type: 'text',
    },
    {
      id: 'n_tripping_in',
      cssClasses: ['col-md-4'],
      label: 'n_tripping_in',
      type: 'text',
    },
    { id: 'i_n', cssClasses: ['col-md-4'], label: 'i_n', type: 'text' },
    { id: 'g_ct', cssClasses: ['col-md-4'], label: 'g_ct', type: 'text' },
    {
      id: 'g_tripping_ig',
      cssClasses: ['col-md-4'],
      label: 'g_tripping_ig',
      type: 'text',
    },
    {
      id: 'g_alarm_ig',
      cssClasses: ['col-md-4'],
      label: 'g_alarm_ig',
      type: 'text',
    },
    {
      id: 'time_delay_tg_trip',
      cssClasses: ['col-md-4'],
      label: 'time_delay_tg_trip',
      type: 'text',
    },
    {
      id: 'etu_status',
      cssClasses: ['col-md-4'],
      label: 'etu_status',
      type: 'text',
    },
    { id: 'ct_test', cssClasses: ['col-md-4'], label: 'ct_test', type: 'text' },
    {
      id: 'function_test',
      cssClasses: ['col-md-4'],
      label: 'function_test',
      type: 'text',
    },
    {
      id: 'mechanical_reclosing_lockout',
      label: 'mechanical_reclosing_lockout',
      type: 'text',
    },
    { id: 'id_no', cssClasses: ['col-md-4'], label: 'id_no', type: 'text' },
    {
      id: 'mechanical_interlock',
      cssClasses: ['col-md-4'],
      label: 'mechanical_interlock',
      type: 'text',
    },
    {
      id: 'contact_erosion_indicator',
      label: 'contact_erosion_indicator',
      type: 'text',
    },
    {
      id: 'racking_handle',
      cssClasses: ['col-md-4'],
      label: 'racking_handle',
      type: 'text',
    },
    {
      id: 'racking_mechanism',
      cssClasses: ['col-md-4'],
      label: 'racking_mechanism',
      type: 'text',
    },
    {
      id: 'auxiliary_contact_block',
      label: 'auxiliary_contact_block',
      type: 'text',
    },
    {
      id: 'lamination_contacts',
      cssClasses: ['col-md-4'],
      label: 'lamination_contacts',
      type: 'text',
    },
    {
      id: 'pole_set',
      cssClasses: ['col-md-4'],
      label: 'pole_set',
      type: 'text',
    },
    {
      id: 'lubrication',
      cssClasses: ['col-md-4'],
      label: 'lubrication',
      type: 'text',
    },
    {
      id: 'contact_pressure',
      cssClasses: ['col-md-4'],
      label: 'contact_pressure',
      type: 'text',
    },
    {
      id: 'arc_chutes',
      cssClasses: ['col-md-4'],
      label: 'arc_chutes',
      type: 'text',
    },
    { id: 'shutter', cssClasses: ['col-md-4'], label: 'shutter', type: 'text' },
    {
      id: 'guide_frame_terminals',
      label: 'guide_frame_terminals',
      type: 'text',
    },
    {
      id: 'spring_charging_manual',
      label: 'spring_charging_manual',
      type: 'text',
    },
    {
      id: 'spring_charging_motor',
      label: 'spring_charging_motor',
      type: 'text',
    },
    {
      id: 'breaker_operations_manual',
      label: 'breaker_operations_manual',
      type: 'text',
    },
    {
      id: 'breaker_operations_electrical',
      label: 'breaker_operations_electrical',
      type: 'text',
    },
    {
      id: 'ready_to_close_interlock',
      label: 'ready_to_close_interlock',
      type: 'text',
    },
    {
      id: 'closing_coil',
      cssClasses: ['col-md-4'],
      label: 'closing_coil',
      type: 'text',
    },
    {
      id: 'shunt_coil',
      cssClasses: ['col-md-4'],
      label: 'shunt_coil',
      type: 'text',
    },
    {
      id: 'overall_breaker_healthiness',
      label: 'overall_breaker_healthiness',
      type: 'text',
    },
    {
      id: 'tested_by',
      cssClasses: ['col-md-4'],
      label: 'tested_by',
      type: 'text',
    },
    {
      id: 'contact_no_1',
      cssClasses: ['col-md-4'],
      label: 'contact_no_1',
      type: 'text',
    },
    {
      id: 'reviewed_by',
      cssClasses: ['col-md-4'],
      label: 'reviewed_by',
      type: 'text',
    },
    {
      id: 'contact_no_2',
      cssClasses: ['col-md-4'],
      label: 'contact_no_2',
      type: 'text',
    },
  ];

  constructor(private firestore: Firestore) {
    const acbTestReport = localStorage.getItem('acb-test-report');
    if (acbTestReport) {
      this.dataString = JSON.parse(acbTestReport);
    }
    // (window as any).test = this.addReport_To_DB_Bulk.bind(this);
    (window as any).test = async (id: string) => {
      const noteDocRef = doc(this.firestore, `reports/${id}`);
      docData(noteDocRef, { idField: 'id' }).subscribe((d) => {
        console.log(d);
      });
    };
  }

  async addReport_To_DB_Bulk(reports: any[]) {
    const batch = writeBatch(this.firestore);
    reports.forEach((report) => {
      const id = (
        report['date'].split('.').join('-') +
        '_' +
        report['id_no']
      ).toLowerCase();
      const docRef = doc(this.firestore, `reports`, id);
      batch.set(docRef, report);
    });
    try {
      await batch.commit();
      console.log('done---------------------');
    } catch (error) {
      console.log('error---------------------');
      console.error(error);
    }
    /* try {
      await batch.commit();
    } catch (error) {
      console.error(error);
    } */
  }

  async addReportToDB(report: any) {
    const reportsRef = collection(this.firestore, 'reports');
    // this.inProgress = true;
    try {
      await addDoc(reportsRef, { report });
      // this.inProgress = false;
    } catch (error) {
      // this.inProgress = false;
      console.error(error);
    }
  }

  removeUnderscore(val: string): string {
    return val.trim().split('_').join(' ');
  }

  onFileChange(ev: any) {
    let workBook: any = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    this.inProgress = true;
    reader.onload = async (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});

      const sheetName = Object.keys(jsonData)[0];
      const mainData = jsonData[sheetName];
      let isExcelValid = true;
      let invalidFields: string[] = [];
      this.testReportFields.forEach((key) => {
        if (!Object.keys(mainData[0]).includes(key)) {
          isExcelValid = false;
          invalidFields.push(key);
        }
      });
      if (isExcelValid) {
        this.dataString = mainData;
        localStorage.setItem('acb-test-report', JSON.stringify(mainData));
        // await this.addReport_To_DB_Bulk(mainData);
        setTimeout(() => {
          this.inProgress = false;
        }, 500);
        setTimeout(() => {
          alert('Excel Data Imported Successfully');
        }, 5);
      } else {
        alert(
          'Invaid Excel Data! Excel file may not contains required information. below fields are missing \n' +
            invalidFields.join('\n')
        );
        setTimeout(() => {
          this.inProgress = false;
        }, 500);
      }
    };
    reader.readAsBinaryString(file);
  }

  breakerHealthinessThan(startValue: number, endValue: number) {
    return this.dataString.filter((d) => {
      const refValue = Number(d['overall_breaker_healthiness']) * 100;
      return refValue > startValue && refValue <= endValue;
    });
  }
}
