(() => {
  console.log("ASDASD")  
})();

function a(evt) {
    evt.preventDefault(); /* POST 이벤트 중지 */
    const commendInput = evt.target.commendInput.value;
    console.log(commendInput)
    if (!commendInput) {
      return alert('이름과 개수를 모두 입력하세요');
    }
  
    const url = 'http://127.0.0.1:3000/';
    const data = { commendInput };
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
}
  
document.querySelector('form').addEventListener('submit', a);