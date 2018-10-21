import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'leagueFilter'
})
export class LeagueFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    return items.filter( it => {
      if (it.League == searchText) {
          return true;
      } else {
          return false;
      }
    });
   }
}
