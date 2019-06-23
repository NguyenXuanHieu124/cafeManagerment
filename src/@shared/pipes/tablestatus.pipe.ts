import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tablestatus'
})
export class TableStatusPipe implements PipeTransform {
  transform(status: any): any {
    let value;
    switch (parseInt(status)) {
      case 1:
        value = 'Order';
        break;
      case 2:
        value = 'Serviced';
        break;
      case 3:
        value = 'Ready';
        break;
      case 4:
        value = 'Preparing';
        break;
      default:
        value = '';
        break;
    }
    return value;
  }

}
