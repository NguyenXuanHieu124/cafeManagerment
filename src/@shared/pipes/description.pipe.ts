import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'description'})
export class DescriptionPipe implements PipeTransform {
    transform(description: String) {
        if (description.length > 40) {
            const result = description.substring(0, 40);
            return `${result} ...`;
        }
        return description;
    }
}