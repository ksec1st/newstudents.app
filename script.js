const GAS_URL =
  "https://script.google.com/macros/s/AKfycbwKlcffMWMMZCUVx_nKkOmAG4aH6T3U1xBGVb_IOCqPzLQ1soiR1ZglCyxJxplyX-WnYQ/exec";


const form =
  document.getElementById("receptionForm");

const className =
  document.getElementById("className");

const studentName =
  document.getElementById("studentName");

const experienceCount =
  document.getElementById("experienceCount");

const submitButton =
  document.getElementById("submitButton");

const message =
  document.getElementById("message");

const experienceButtons =
  document.querySelectorAll(".experience-btn");


// ================================
// 体験回数ボタン
// ================================

experienceButtons.forEach(button => {

  button.addEventListener("click", () => {

    // すべての選択を解除
    experienceButtons.forEach(btn => {
      btn.classList.remove("selected");
    });

    // 選択したボタン
    button.classList.add("selected");

    // hiddenに保存
    experienceCount.value =
      button.dataset.count;

  });

});


// ================================
// フォーム送信
// ================================

form.addEventListener("submit", async (event) => {

  event.preventDefault();


  // 体験回数チェック
  if (!experienceCount.value) {

    showMessage(
      "体験回数を選択してください。",
      "error"
    );

    return;
  }


  // 受付ボタンを無効化
  submitButton.disabled = true;

  submitButton.textContent =
    "受付中...";


  // 送信データ
  const data = {

    className:
      className.value,

    studentName:
      studentName.value.trim(),

    experienceCount:
      experienceCount.value

  };


  try {

    const response =
      await fetch(
        GAS_URL,
        {
          method: "POST",

          body:
            JSON.stringify(data)
        }
      );


    const result =
      await response.json();


    if (result.status === "success") {

      showMessage(
        "受付が完了しました！",
        "success"
      );


      // フォームリセット
      form.reset();


      // 体験回数ボタンの選択解除
      experienceButtons.forEach(btn => {

        btn.classList.remove("selected");

      });


      experienceCount.value = "";


      // 受付完了後に少し待ってリセット
      setTimeout(() => {

        message.textContent = "";

      }, 3000);

    } else {

      throw new Error(
        result.message ||
        "受付に失敗しました。"
      );

    }

  } catch (error) {

    console.error(error);

    showMessage(
      "受付に失敗しました。もう一度お試しください。",
      "error"
    );

  } finally {

    submitButton.disabled = false;

    submitButton.textContent =
      "受付を完了する";

  }

});


// ================================
// メッセージ表示
// ================================

function showMessage(text, type) {

  message.textContent = text;

  message.className =
    "message " + type;

}
