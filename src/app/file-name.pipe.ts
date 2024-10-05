import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileName',
  standalone: true
})
export class FileNamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value ? value.split('/').pop() || '' : '';
  }

}
