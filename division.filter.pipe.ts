import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'divisionFilter'
})
export class DivisionFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    return items.filter( it => {
      if (it.Division == searchText) {
          return true;
      } else {
          return false;
      }
    });
   }
}
