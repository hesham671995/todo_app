import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class CronJobService {

    /**
     * This Function runEveryTwoMinutes() 
     * runs at every two minutes ( cron job runs every two minutes )
     */
    @Cron('*/2 * * * *')
    async runEveryTwoMinutes() {
        await console.log("this cron job run every two minutes");
    }

}