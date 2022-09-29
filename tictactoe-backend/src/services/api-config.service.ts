import * as dotenv from 'dotenv'
dotenv.config()

export class ApiConfigService {
    private getNumber(key: string, defaultValue = 0): number {
        return Number(process.env[key]) || defaultValue;
    }

    private getString(key: string, defaultValue = ''): string {
        return process.env[key]?.toString()
            .replace(/\\n/g, '\n')  || defaultValue;
    }

    get appConfig() {
        return {
            port: this.getNumber('PORT', 3000),
            host: this.getString('SOCKET_HOST', 'http://localhost:3000'),
        };
    }
}

export const apiConfigService = new ApiConfigService();
