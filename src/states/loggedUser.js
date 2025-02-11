import {reactive} from 'vue'
const loggedUser = reactive({
  token: undefined,
  _id: undefined,
  name: undefined,
  surname: undefined,
  isModerator: undefined,
  userSensitiveID: undefined
})

function setLoggedUser(data) {
  loggedUser.token = data.token;
  loggedUser._id = data._id;
  loggedUser.name = data.name;
  loggedUser.surname = data.surname;
  loggedUser.isModerator = data.isModerator;
  loggedUser.userSensitiveID = data.userSensitiveID
}

function clearLoggedUser() {
  loggedUser.token = undefined;
  loggedUser._id = undefined;
  loggedUser.name = undefined;
  loggedUser.surname = undefined;
  loggedUser.isModerator = undefined;
}

function isLogged() {
  return loggedUser.token != undefined;
}

export {loggedUser, setLoggedUser, clearLoggedUser, isLogged}