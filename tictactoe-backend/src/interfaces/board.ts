import { Position } from './position';
export interface Board {
    boardArray: Position[], 
    firesCount: number, 
    xUser_id?: string | null, 
    oUser_id?: string | null,
    turn: string | null
}
