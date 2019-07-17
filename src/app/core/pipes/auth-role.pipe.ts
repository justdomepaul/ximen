import { Pipe, PipeTransform } from '@angular/core';
import { Roles } from '../models/user';

@Pipe({
  name: 'authRole'
})
export class AuthRolePipe implements PipeTransform {

  transform(value: Roles, args?: any): string {
    let permission: string = '一般';
    if (value.hasOwnProperty('admin') && value.admin) {
      permission = `${permission} | 管理員`;
    }
    if (value.hasOwnProperty('editor') && value.editor) {
      permission = `${permission} | 可編輯`;
    }
    return permission;
  }

}
