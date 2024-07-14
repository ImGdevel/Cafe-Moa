import { authService } from "../FireServer";

/** 로그인 모듈  */
export const SignInUserAccount = async (email, password) => {
  const acessId = true;
  const data = await authService.signInWithEmailAndPassword(email, password)
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        alert("비밀번호가 틀렸습니다.");
      } else if(errorCode === "auth/invalid-email"){
        alert("잘못된 아이디입니다.");
      } else if(errorCode === "auth/user-disabled"){
        alert("비활성화된 계정입니다.");
      } else if(errorCode === "auth/user-not-found"){
        alert("존재하지 않는 계정입니다.");
      } else if(errorCode === "auth/wrong-password"){
        alert("비밀번호가 틀렸습니다.");
      } else {
        alert(errorMessage);
      }
      console.log(error);
      acessId = false;
    });
  return new Promise((resolve, reject) => {
    if (acessId) resolve(data.user.uid);
    else reject(error);
  });
};

/** 회원가입 모듈 */
export const CreateUserAccount = async (email, password) => {
  let error = false;
  const user = await authService
    .createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      error = true;
      if (errorCode == "auth/weak-password") {
        alert("비밀번호가 너무 짧습니다. \n (6자 이상)");
      }  else if (errorCode === "auth/invalid-credential" && 
                  errorCode === "auth/user-disabled" &&
                  errorCode === "auth/operation-not-allowed") {
        alert("사용할 수 없는 계정입니다.");
      } else if (errorCode === "auth/email-already-in-use") {
        alert("이미 사용중인 이메일입니다.");
      } else if (errorCode === "auth/invalid-email") {
        alert("존재하지 않는 이메일입니다.");
      } else if (errorCode === "auth/invalid-verification-code") {
        alert("인증 코드가 유효하지 않습니다.");
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });

  return new Promise((resolve, reject) => {
    if (!error) {
      resolve(user.user.uid);
    }
    reject(err);
  });
};

/** 현제 로그인되어 있는 유저 아이디를 가져옵니다 */
export async function getCurrentUserId() {
  var userId = null;
  await authService.onAuthStateChanged((user) => {
    if (user != null) {
      userId = user.uid;
    }
  });
  return userId;
}

/** 현제 유저를 로그아웃 합니다. */
export async function signOut() {
  authService.signOut();
}
