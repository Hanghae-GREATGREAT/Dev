(() => {
    console.log('ASDASD');
})();

$('.commendLine').empty();
// const main = `<span></span>
// `
// $('.commendLine').append(main)

async function dungeon() {
    try {
        await axios.get('http://localhost:3001/battle/dungeon').then((res) => {
            const { data } = res;
            const script = data.script;
            const options = data.options;
            const items = `<span>${script}\n\n${options}</span>`;
            $('.commendLine').append(items);
            localStorage.setItem('battle', 'dungeon');
        });
    } catch (error) {
        console.log(error);
    }
}

dungeon();
const commendForm = document.querySelector('.commendInput');
commendForm.addEventListener('submit', enter);
async function enter(e) {
    try {
        e.preventDefault();
        if (localStorage.getItem('battle') !== 'dungeon') throw new Error('');

        $('.commendLine').empty();

        const commendInput = document.getElementById('commendInput');

        if (commendInput.value > 5) {
            await dungeon();
            $('.commendLine').append(`\n\n없는 던전입니다.`);
            document.getElementById('commendInput').value = null;
            return;
        }

        if (!commendInput.value) {
            await dungeon();
            $('.commendLine').append(`\n\n던전을 선택해주세요.`);
            return;
        }

        const input = { input: commendInput.value };
        await axios
            .post('http://localhost:3001/battle/dungeon/enter', input)
            .then((res) => {
                const { data } = res;
                console.log(data);
                const name = data.dungeonName;
                const op = data.opsions;
                const lev = data.recommendLevel;
                const script = data.script;
                const commend = `<span>${name}\n추천레벨 : ${lev}\n${script}\n\n${op}</span>`;
                $('.commendLine').append(commend);
                document.getElementById('commendInput').value = null;
                localStorage.setItem('battle', 'enter');
            });
    } catch (error) {
        console.log(error);
    }
}

commendForm.addEventListener('submit', event);

async function event(e) {
    try {
        e.preventDefault();
        if (localStorage.getItem('battle') !== 'enter') throw new Error('');
        $('.commendLine').empty();
        const commendInput = document.getElementById('commendInput');
        if (commendInput.value == 2) {
            await dungeon();
            document.getElementById('commendInput').value = null;
            return;
        }
        const input = { input: commendInput.value };
        await axios
            .post('http://localhost:3001/battle/dungeon/event', input)
            .then((res) => {
                const { data } = res;
                console.log(data);
                const msg = data.msg;
                const fight = `<span>${msg}</span>`;
                $('.commendLine').append(fight);
                document.getElementById('commendInput').value = null;
            });
    } catch (error) {
        console.log(error);
    }
}
