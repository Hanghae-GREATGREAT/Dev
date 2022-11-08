/*****************************************************************************
                              페이지 초기 스크립트
******************************************************************************/
const chatSubmitId = $('#chatSubmit');
const chatBoxId = $('#chatBox');
const userInfo = $('#userInfo');
const commandLine = $('.commendLine');



const socket = io('/');

$(()=>{
    chatBoxId.empty();
    userInfo.empty();
    commandLine.empty();

    const userStore = localStorage.getItem('user');
    const user = JSON.parse(userStore);
    
    dungeon();
    statusLoader(user);

    socket.emit('info', { name: user.name });
});



/*****************************************************************************
                                커맨드 스크립트
******************************************************************************/

const statusLoader = ({ username, name, level, maxhp, maxmp, hp, mp, exp }) => {
    const status = `
    <div class="infoName">
        <span>${name} / Lv. ${level}</span><span class="exp">경험치: ${exp}</span>
    </div>
    <div class="infoSub">
        <div class="infoUser"><span>${username}</span></div>
        <div class="infoStatus">
            <span>체력: ${maxhp}/${hp}</span>
            <span>마나: ${maxmp}/${mp}</span>    
        </div>
    </div>
    `;
    userInfo.append(status);
}

// const main = `<span></span>
// `
// commandLine.append(main)

async function dungeon() {
    try {
        commandLine.empty();
        const { data } = await axios.get('http://localhost:8080/battle/dungeon');

        const script = data.script;
        const options = data.options;
        const items = `<span>${script}\n\n${options}</span>`;
        commandLine.append(items);

        localStorage.setItem('battle', 'dungeon');
    } catch (error) {
        console.log(error);
    }
}


const commandHandler = () => {
console.log('handler');
    const commandEventFn = {
        'dungeon': enter(),
        'enter': event(),
    }

    const battle = localStorage.getItem('battle');
    commandEventFn[battle];
}


// const commendInput = $('#')
const commandInputHandler = () => {
    const commandEventFn = {
        'dungeon': enter2(),
        'enter': event2(),
    }

    const battle = localStorage.getItem('battle');
    commandEventFn[battle];
}
async function enter() {
    try { console.log(111111);
        e.preventDefault();
        commandLine.empty();


        if (commendInput.value > 5) {
            await dungeon();
            commandLine.append(`\n\n없는 던전입니다.`);
            document.getElementById('commendInput').value = null;
            return;
        }

        if (!commendInput.value) {
            await dungeon();
            commandLine.append(`\n\n던전을 선택해주세요.`);
            return;
        }

        const input = { input: commendInput.value };
        const { data } = await axios.post('http://localhost:8080/battle/dungeon/enter', input)
        console.log(data);

        const name = data.dungeonName;
        const op = data.opsions;
        const lev = data.recommendLevel;
        const script = data.script;
        const commend = `<span>${name}\n추천레벨 : ${lev}\n${script}\n\n${op}</span>`;
        commandLine.append(commend);
        document.getElementById('commendInput').value = null;
        localStorage.setItem('battle', 'enter');
    } catch (error) {
        console.log(error);
    }
}


async function event(e) {
    try {console.log('enter');
        e.preventDefault();
        commandLine.empty();

        if (commendInput.value == 2) {
            await dungeon();
            document.getElementById('commendInput').value = null;
            return;
        }

        const input = { input: commendInput.value };
        const { data } = await axios.post('http://localhost:8080/battle/dungeon/event', input);
        console.log(data);

        const msg = data.msg;
        const fight = `<span>${msg}</span>`;
        commandLine.append(fight);
        document.getElementById('commendInput').value = null;
    } catch (error) {
        console.log(error);
    }
}




// const commendForm = document.querySelector('.commendInput');
const commendInput = document.getElementById('commendInput');
// commendForm.addEventListener('submit', commandHandler);


async function enter(e) {
    try { console.log(111111);
        e.preventDefault();
        commandLine.empty();


        if (commendInput.value > 5) {
            await dungeon();
            commandLine.append(`\n\n없는 던전입니다.`);
            document.getElementById('commendInput').value = null;
            return;
        }

        if (!commendInput.value) {
            await dungeon();
            commandLine.append(`\n\n던전을 선택해주세요.`);
            return;
        }

        const input = { input: commendInput.value };
        const { data } = await axios.post('http://localhost:8080/battle/dungeon/enter', input)
        console.log(data);

        const name = data.dungeonName;
        const op = data.opsions;
        const lev = data.recommendLevel;
        const script = data.script;
        const commend = `<span>${name}\n추천레벨 : ${lev}\n${script}\n\n${op}</span>`;
        commandLine.append(commend);
        document.getElementById('commendInput').value = null;
        localStorage.setItem('battle', 'enter');
    } catch (error) {
        console.log(error);
    }
}


async function event(e) {
    try {console.log('enter');
        e.preventDefault();
        commandLine.empty();

        if (commendInput.value == 2) {
            await dungeon();
            document.getElementById('commendInput').value = null;
            return;
        }

        const input = { input: commendInput.value };
        const { data } = await axios.post('http://localhost:8080/battle/dungeon/event', input);
        console.log(data);

        const msg = data.msg;
        const fight = `<span>${msg}</span>`;
        commandLine.append(fight);
        document.getElementById('commendInput').value = null;
    } catch (error) {
        console.log(error);
    }
}


/*****************************************************************************
                                채팅 스크립트
******************************************************************************/

const chatNewMessage = ({ script }) => {
    console.log('NEEEEEEEEEEEW', script)
    const newMessage = `<span>${script}</span>`;
    chatBoxId.append(newMessage);
}

const chatSubmitdHandler = () => {
    const user = localStorage.getItem('user');
    const { name } = JSON.parse(user);
    console.log(user);
    const data = {
        name,
        message: chatSubmitId.val(),
    }
    socket.emit('submit', data);
    chatSubmitId.val('');
}   



socket.on('print', chatNewMessage)