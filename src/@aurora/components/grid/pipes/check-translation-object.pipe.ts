import { Pipe, PipeTransform } from '@angular/core';
import { CoreLang, Translatable } from '@aurora';

@Pipe({
    name: 'checkTranslationObject',
})
export class CheckTranslationObjectPipe implements PipeTransform
{
    transform(
        object: Translatable,
        activatedLangs: CoreLang[],
        completedClass: string = 'completed-translations',
        uncompletedClass: string = 'uncompleted-translations',
    ): string
    {
        const langIds: string[] = object.availableLangs; // get langs from object
        for (const lang of activatedLangs)
        {
            if (langIds.indexOf(lang.id) === -1) return uncompletedClass;
        }
        return completedClass;
    }
}
