import request from './utils';

const authUrls = {
  login: '/auth/login',
  logout: '/auth/logout',
  readMe: '/auth/user',
};

const urlPrefix = '/api';

const urls = {
  // users
  readUser: '/user/<id>',
  readUsers: '/user',
  createUsers: '/user',
  updateUsers: '/user/<id>',
  deleteUsers: '/user/<id>',
};

Object.keys(urls).map((url) => {
  urls[url] = urlPrefix + urls[url];
  return url;
});

export default new function API() {
  // auth
  this.login = params => request.post(authUrls.login, params);
  this.logout = () => request.post(authUrls.logout);
  this.readMe = params => request.get(authUrls.readMe, params);

  // users
  this.readUser = id => request.get(urls.readUser.replace('<id>', id));
  this.readUsers = () => request.get(urls.readUsers, {});
  this.createUsers = params => request.post(urls.createUsers, params);
  this.updateUsers = (id, params) => request.put(urls.updateUsers.replace('<id>', id), params);
  this.deleteUsers = id => request.delete(urls.deleteUsers.replace('<id>', id));

}();
