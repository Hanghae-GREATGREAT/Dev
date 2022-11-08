

interface SignupForm {
    username: string;
    password: string;
    confirm: string;
}

interface UserSession {
    userId: number;
    characterId: number;
    username: string;
    name: string;
}


export {
    SignupForm,
    UserSession,
}