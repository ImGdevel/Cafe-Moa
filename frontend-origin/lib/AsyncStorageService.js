
// import { asyncStorage } from "../FireServer";


// const storeData = async tasks => {
//     try {
//       // 'tasks' 라는 항목에 tasks 저장
//       await asyncStorage.setItem('user', JSON.stringify(tasks));
//     } catch (e) {
//       // saving error
//     }
// }

// const getData = async () => {
//     try {
//       // 'tasks'항목에 저장된 자료 
//       const loadedData = await asyncStorage.getItem('user');
//       // 자료가 없을 때 에러가 뜨지 않도록 빈객체를 반환하도록 한다
//       setTasks(JSON.parse(loadedData) || "{}");
//     } catch(e) {

//     }
// }