// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 設定（さっきコピーしたやつ）
const firebaseConfig = {
  apiKey: "XXXX",
  authDomain: "XXXX",
  projectId: "XXXX",
  storageBucket: "XXXX",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser = null;

// 匿名ログイン
document.getElementById("login").onclick = async () => {
  const result = await signInAnonymously(auth);
  currentUser = result.user;
  alert("ログイン成功 UID: " + currentUser.uid);
};

// テスト保存
document.getElementById("save").onclick = async () => {
  if (!currentUser) {
    alert("先にログインして");
    return;
  }

  await addDoc(collection(db, "logs"), {
    user_id: currentUser.uid,
    word_id: "apple",
    mode: "choice",
    correct: false,
    time: new Date()
  });

  alert("保存完了");
};
