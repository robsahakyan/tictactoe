import { Position } from '../interfaces/position';
import { Board } from '../interfaces/board';
import {cacheService, CacheService} from "./cache.service";

export class GameService {
    private users: any;
    private readonly cacheService: CacheService;
    constructor(cacheService: CacheService) {
        this.users = [];
        this.cacheService = cacheService;
    }

    async signIn(data: string, socketId: string) {
        let users;
        if (data) {
            this.users.push({id: socketId, nickname: data});
        }

        if (this.users.length === 2) {
            users = this.users;
        }
        return {board: await this.cacheService.getBoard(), users}
    }

    async getInitialState(data: any[]) {
        let boardFilterArray: Position[] = [];
            data.map((arr: Position[]) => {
                boardFilterArray.push(...arr);
            })
        await this.createBoard(boardFilterArray)
        return {board: await cacheService.getBoard()}
    }

    async sendToMove(data: {userId: string, id: string}) {
        let board = await cacheService.getBoard();
        let resp: any;
        if (board.firesCount < 2) {
            await this.checkTheFirstMoves(data, board);
        } else if (data.userId === board.xUser_id) {
            if (board.turn === 'oUser') {
                throw new Error("forbidden turn")
            }
            board.turn = 'oUser';
            await this.move('X', board.boardArray[data.id], board);
            resp = this.checkTheBoardState(board, 'X')
            } else if (data.userId === board.oUser_id) {
                if (board.turn === 'xUser') {
                    throw new Error("forbidden turn")
                }
                board.turn = 'xUser';
                await this.move('O', board.boardArray[data.id], board);
                resp = this.checkTheBoardState(board, 'O');

            }
            const info = [];

            switch(resp?.result) {
                case "draw":
                    info.push({message: 'update_board_table', data: board}, {message: 'the_last_emit', data: 'draw'})
                    await this.clearCache()
                case "win":
                    info.push({message: 'update_board_table', data: board}, {message: 'the_last_emit', data: resp})
                    await this.clearCache()
                default:
                    info.push({message: 'update_board_table', data: board});
            }

            return info;
        }

    async clearCache() {
        return this.cacheService.clear();
    }

    async end(socketId: string) {
        const uid = this.getUidFromSocketID(socketId)?.id;
        if (uid) {
            this.users = this.users.filter((user: any) => user.id !== uid);
        }
        return uid;
    }

    async checkTheGameId(dataId: string, thisId: string) {
        if (dataId !== thisId) {
            throw new Error("invalid game id")
        }
    }

    async createBoard(data: any) {
        const board: Board = {
            boardArray: data,
            firesCount: 0,
            xUser_id: null,
            oUser_id: null,
            turn: null
        }

        await this.cacheService.setBoard(board);
    }

    async checkTheFirstMoves(data: { userId: string | undefined; id: any }, board: Board) {
        if (!board.firesCount) {
            board.xUser_id = data.userId;
            board.turn = 'oUser';
            await this.move("X", board.boardArray[data.id], board)

        } else if(board.firesCount && !board.oUser_id) {
            board.oUser_id = data.userId;
            board.turn = 'xUser';
            await this.move("O", board.boardArray[data.id], board)
        }
    }

    async move(symbol: string, position: Position, board: Board) {
        if (!position.state) {
            position.state = symbol;
        } else {
            throw new Error("this position is already occupied")
        }

        board.boardArray[position.id] = position;
        board.firesCount++;

        await this.cacheService.setBoard(board);
    }

    checkTheBoardState(board: Board, symbol: string) {
        let lengthOfSingleArrBoard = Math.sqrt(board.boardArray.length);
        let boardHorizontalArray = Array(lengthOfSingleArrBoard).fill("");
        let boardVerticalArray = Array(lengthOfSingleArrBoard).fill("");
        let boardCornersArray = ["", ""];
        let winningflag;
        for (let i = 0; i < lengthOfSingleArrBoard; ++i) {
            for (let j = 0; j < lengthOfSingleArrBoard; ++j) {
                if (i === j) {
                   boardCornersArray[0] = boardCornersArray[0].concat(board.boardArray[lengthOfSingleArrBoard * i + j].state)
                }
                if (i + j === lengthOfSingleArrBoard - 1) {
                   boardCornersArray[1] = boardCornersArray[1].concat(board.boardArray[lengthOfSingleArrBoard * i + j].state)
                }
                boardHorizontalArray[i] = boardHorizontalArray[i].concat(board.boardArray[lengthOfSingleArrBoard * i + j].state)
                boardVerticalArray[j] = boardVerticalArray[j].concat(board.boardArray[lengthOfSingleArrBoard * i + j].state)
            }
        }
        let target = [...boardHorizontalArray, ...boardVerticalArray, ...boardCornersArray];
        const symbolsTarg = new Array(lengthOfSingleArrBoard + 1).join(symbol);

        if(board.firesCount === board.boardArray.length) {
            winningflag = {result: "draw"};
        }

        target.map((e) => {
            if (e === symbolsTarg) {
                let getUser = this.users.find((user: any) => user.id === board[`${symbol.toLowerCase()}User_id` as keyof Board])
                winningflag = {result: "win", user: getUser };
                return;
            }
        })
        return winningflag;
    }

    getUidFromSocketID(socketId: string) {
        return this.users.find((user: any) => user.id === socketId);
    };

    async checkUsersOnSocket() {
        console.log(this.users)
        if (!this.users.length) {
           await cacheService.clear()
        }
        
    }

    get getUsers() {
        return this.users
    }
}

export const gameService = new GameService(cacheService);
