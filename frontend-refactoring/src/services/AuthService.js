import { auth } from '@api/firebase'; // 초기화된 auth 인스턴스를 가져옵니다.
import {
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';

/** 이메일과 비밀번호를 사용하여 사용자 로그인 */
export const signInUserWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await firebaseSignInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user.uid;
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
};

/** 이메일과 비밀번호를 사용하여 사용자 회원가입 */
export const createUserWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await firebaseCreateUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user.uid;
  } catch (error) {
    handleAuthError(error);
  }
};

/** 현재 로그인된 사용자의 UID 가져오기 */
export const getCurrentUserId = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user.uid);
      } else {
        reject(new Error('User not authenticated'));
      }
    });
  });
};

/** 사용자 로그아웃 */
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error.message);
    throw error;
  }
};

/** 에러 처리 함수 */
const handleAuthError = (error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  switch (errorCode) {
    case 'auth/wrong-password':
      alert('비밀번호가 틀렸습니다.');
      throw '비밀번호가 틀렸습니다.';
    case 'auth/invalid-email':
      alert('잘못된 이메일 형식입니다.');
      break;
    case 'auth/user-disabled':
      alert('비활성화된 계정입니다.');
      break;
    case 'auth/user-not-found':
      alert('존재하지 않는 계정입니다.');
      break;
    case 'auth/email-already-in-use':
      alert('이미 사용 중인 이메일입니다.');
      break;
    case 'auth/weak-password':
      alert('비밀번호가 너무 취약합니다.');
      throw '비밀번호가 너무 취약합니다.';
    default:
      alert(errorMessage);
      throw errorMessage;
  }
};
