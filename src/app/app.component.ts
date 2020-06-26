import { Component, ViewChild } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { Ophta } from './ophta';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  csvRecords:Ophta={
    id:0,
    maladie:'',
    prix:0,
    facture:'', 
    dateFacturation: '',
  }
  header = true;
 
  constructor(private ngxCsvParser: NgxCsvParser) {
  }
 
  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;
 
  // Your applications input change listener for the CSV File
  fileChangeListener($event: any): void {
 
    // Select the files from the event
    const files = $event.srcElement.files;
 
    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: any) => {
 
        console.log('Result', result);
        this.csvRecords = result;
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
  }
  facturee(csvData){
   if(csvData.facture=='f') 
   {
   csvData.facture='n'
   csvData.dateFacturation='';

   }
   else{
   csvData.facture='f'
   csvData.dateFacturation=Date.now().toString()
}
  }
}
