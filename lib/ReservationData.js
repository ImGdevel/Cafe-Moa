import { dbService } from '../FireServer';

const seatCollection = dbService.collection("seat");

export class ReservationData {
    constructor(_reservation_time, _seat_num) {
        this.reservation_time = _reservation_time;
        this.seat_num = _seat_num;
    }
}