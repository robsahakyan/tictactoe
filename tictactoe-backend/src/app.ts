import {Server, Socket} from 'socket.io';
import {apiConfigService} from './services/api-config.service';
import {gameService} from "./services/game.service";
export const app = new Server(apiConfigService.appConfig.port, {cors: {
        origin: apiConfigService.appConfig.host
    }})

app.on('connection',async (socket: Socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    console.log(app.engine.clientsCount)
    if (app.engine.clientsCount > 2) {
        socket.emit('disconnect_excessive', `this user is unnecessary ${socket.id}`)
    }
    socket.on('sign_in',async (data) => {
        const result = await gameService.signIn(data, socket.id);
        socket.join('room');

        app.sockets.to('room').emit('get_initial_data', result)
    })

    socket.on('send_initial_state', async (data) => {
       return await gameService.getInitialState(data);
    })

    socket.on("sendToMove", async (data: any) => {
        const result = await gameService.sendToMove(data);
        
        if(result?.info) {
            for (const elem of result.info) {
                sendMessage(elem.message, elem.data);
            }
        }
    })

    socket.on('disconnect', async () => {
        console.info('Disconnect received from: ' + socket.id);

        const result = await gameService.end(socket.id);

        if (result.userId) {
            sendMessage('user_disconnected', socket.id);
        }

        gameService.checkClientsOnSocket(app.engine.clientsCount)
    });
})

function sendMessage(name: string, payload?: Object) {
    console.info('Emitting event: ' + name + ' to room');
    payload ? app.to("room").emit(name, payload) : app.to("room").emit(name);
};
