import {Injectable} from '@angular/core';

namespace AccountEnums {

  export enum loginIdentifierConflict {
    'ignore',
    'failOnSiteConflictingIdentity',
    'failOnAnyConflictingIdentity'
  }

}

@Injectable()
export class Utils {

  getEnumOptions(name: string) {
    const enumObject = AccountEnums[name];
    if (!enumObject) {
      return null;
    }
    const options = Object.keys(enumObject);
    return options.slice(options.length / 2);
  }

  getTypeValueList(obj: any) {
    let result: Array<object> = [];
    for (const property in obj) {
      if (obj.hasOwnProperty(property)) {
        const type = typeof obj[property];
        result.push({
          name: property,
          value: obj[property],
          inputType: this.getInputTypeByType(type),
          options: this.getOptionsByField(property)
        });
      }
    }
    return result;
  }

  getOptionsByField(name: string): object {
    const enumOptions = this.getEnumOptions(name);
    if (!enumOptions) {
      return null;
    }
    return enumOptions;
  }

  getInputTypeByType(typeName: string) {

    let inputType;

    switch (typeName) {
      case 'boolean':
        inputType = 'checkbox';
        break;
      case 'string':
        inputType = 'text';
        break;
      case 'datetime':
        inputType = 'date';
        break;
      default:
        inputType = typeName;
        break;

    }

    return inputType;
  }
}
