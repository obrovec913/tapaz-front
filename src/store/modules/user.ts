import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({ namespaced: true})
class User extends VuexModule {
  public isLoggedIn: boolean = false;
  @Mutation
  public setLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedIn = isLoggedIn;
  }
  @Action({rawError: true})
  public updateIsLoggedIn(isLoggedIn: boolean): void {
    this.context.commit('setLoggedIn', isLoggedIn);
  }
}
export default User;
