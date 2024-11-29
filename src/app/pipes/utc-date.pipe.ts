import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcDate',
  standalone: true
})
export class UtcDatePipe implements PipeTransform {

  transform(value: any, format:string ='mediumDate'): any {
    const datePipe:DatePipe=new DatePipe('en-US')
    return datePipe.transform(value,format,'UTC');
  }

}
