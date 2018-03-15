type ValidationState = {
    verified: boolean;
    token?: string
}

export class User {
    private _username: string;
    private password: string;
    private _validation: {
        verified: boolean,
        token?: string
    };
    private _role: string;

    constructor(data: any) {
        this._username = data.username;
        this.password = data.password;
        this._validation = data.validation;
        this._role = data.role;
    }

    get role(): string {
        return this._role;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get validation(): ValidationState {
        return this._validation;
    }

    public serialize(): any {
        return {
            username: this.username,
            password: this.password,
            validation: this.validation,
            role: this.role
        };
    }
}