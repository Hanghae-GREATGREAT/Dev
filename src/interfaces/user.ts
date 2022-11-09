

interface SignupForm {
    username: string;
    password: string;
    confirm: string;
}

interface UserSession {
    username: string;
    name: string;
    level: number;
    maxhp: number;
    maxmp: number;
    hp: number;
    mp: number;
    exp: number;
    questId: number;
}


export {
    SignupForm,
    UserSession,
}