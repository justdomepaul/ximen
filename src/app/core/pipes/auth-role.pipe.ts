import { Pipe, PipeTransform } from '@angular/core';
import { Roles } from '../models/user';

@Pipe({
  name: 'authRole'
})
export class AuthRolePipe implements PipeTransform {

  transform(value: Roles, args?: any): string {
    if (value.hasOwnProperty('admin') && value.admin) {
      return '管理員';
    }
    if (value.hasOwnProperty('editor') && value.editor) {
      return '可編輯';
    }
    return '一般';
  }

}
