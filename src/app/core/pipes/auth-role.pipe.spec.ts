import { AuthRolePipe } from './auth-role.pipe';

describe('AuthRolePipe', () => {
  it('create an instance', () => {
    const pipe = new AuthRolePipe();
    expect(pipe).toBeTruthy();
  });
});
