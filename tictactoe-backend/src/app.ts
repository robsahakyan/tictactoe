import {Server, Socket} from 'socket.io';
import {apiConfigService} from './services/api-config.service';
import {gameService} from "./services/game.service";

export const app = new Server(apiConfigService.appConfig.port, {cors: {
        origin: apiConfigService.appConfig.host
}})

app.on('connection',async (socket: Socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    if (app.engine.clientsCount > 2) {
        socket.emit('disconnect_excessive', socket.id)
    }
    socket.on('sign_in',async (data) => {
        const result = await gameService.signIn(data, socket.id);
        
        socket.join('room');
        sendMessage('get_initial_data', result)
    })

    socket.on('send_initial_state', async (data: any[]) => {
       socket.broadcast.emit("get_initial_data", await gameService.getInitialState(data));
    })

    socket.on("sendToMove", async (data: {userId: string, id: string}) => {
        const result = await gameService.sendToMove(data);
        
        if(result) {
            for (const elem of result) {
                sendMessage(elem.message, elem.data);
            }
        }
        if (result.length === 1) {
            socket.broadcast.emit("turn_changed")
        }
    })

    socket.on('disconnect', async () => {
        console.info('Disconnect received from: ' + socket.id);

        const result = await gameService.end(socket.id);
        
        if (result) {
            sendMessage('user_disconnected', socket.id);
            socket.broadcast.emit("opponent_disconnected")
        }

        await gameService.checkUsersOnSocket()
    });
})

function sendMessage(name: string, payload?: Object) {
    console.info('Emitting event: ' + name + ' to room');
    payload ? app.to("room").emit(name, payload) : app.to("room").emit(name);
};
