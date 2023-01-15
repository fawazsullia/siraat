import bcrypt from "bcrypt"

class ManagePassword {

    public async hashPassword(password: string){
        const salt = await bcrypt.genSalt(8);
        return bcrypt.hash(password, salt);
    }

    public checkPassword(password: string, passwordHash: string){
        return bcrypt.compare(password, passwordHash);
    }
}

export const managePassword = new ManagePassword()