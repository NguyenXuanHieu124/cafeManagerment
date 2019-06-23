import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pipename' })
export class PipeNameProductPipe implements PipeTransform {
    transform(pipename: String) {
        if (pipename.length > 7) {
            const result = pipename.substring(0, 7);
            return `${result} ...`;
        }
        return pipename;
    }
}