import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  dataString: any[] = [];
  testReportFields = [
    'Sl no',
    'Date - DD.MM.YYYY',
    'Service',
    'Customer ',
    'Location',
    'Contact Person',
    'Mobile',
    'E-Mail ',
    'Panel',
    'Feeder Name',
    'Model',
    'MLFB',
    'Z-Options',
    'ID no.',
    'Breaker Rating',
    'Size ',
    'Pole',
    'Breaker',
    'ETU',
    'ETU Serial No',
    'Last Serviced on - MM/YYYY',
    'In',
    'L-Tripping IR =',
    'Long Time Current ',
    'L-Time-Lag tr (@6 x IR)',
    'Memory',
    'Short Time Isd',
    'Short Time Current Isd',
    'Short Time Delay tsd (@12 x In)',
    'I-tripping Ii =',
    'I-tripping Current Ii =',
    'N-Tripping IN',
    'I N',
    'G-CT',
    'G-Tripping Ig',
    'G-Alarm Ig',
    'Time Delay tg TRIP',
    'ETU STATUS',
    'CT Test',
    'Function Test',
    'Mechanical reclosing lockout',
    'Trip Unit (N+G)',
    'Mechanical Interlock',
    'Racking Handle',
    'Racking Mechanism ',
    'Contact Erosion Indicator',
    'Arc Chutes',
    'Shutter',
    'Lamination Contacts',
    'Guide Frame Terminals',
    'Contact Pressure',
    'Pole Set',
    'Lubrication',
    'Auxiliary Contact Block',
    'Spring Charging - Manual',
    'Spring Charging - Motor',
    'Undervoltage',
    'Closing Coil',
    'Shunt Coil',
    'Ready to Close Interlock',
    'Breaker Operations - Manual',
    'Breaker Operations - Electrical',
    'CRM Testing Done',
    'CRM Values - Before',
    'CRM Values - After',
    'Timing Testing Done',
    '__EMPTY',
    'Mandatory Spares',
    'Recommended Spares',
    'Comments',
    'Open Points',
    'Overall Breaker Healthiness',
    'Tested By',
    'Contact No: ',
    'Reviewed By',
    'Contact No: _1',
  ];
  inProgress = false;

  constructor() {
    const acbTestReport = localStorage.getItem('acb-test-report');
    if (acbTestReport) {
      this.dataString = JSON.parse(acbTestReport);
    }
  }

  onFileChange(ev: any) {
    let workBook: any = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    this.inProgress = true;
    reader.onload = (event) => {
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
}
