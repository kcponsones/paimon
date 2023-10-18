import bcrypt from 'bcryptjs'

export function generatePassword(){
    let pass = '',
        str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

    let generatePassLength = Math.random() * (12 - 8) + 8;

     for (let i = 1; i <= generatePassLength; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char)
    }
    return pass;
}


export function hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hash: any) {
    return bcrypt.compareSync(password, hash);
}