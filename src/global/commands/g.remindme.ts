import {db, getUser} from '../utils/knex';
import {DateTime} from 'luxon';
import {
  Users,
  UserDrugDoses,
  UserReminders,
} from '../@types/pgdb';
import log from '../utils/log';
import * as path from 'path';
const PREFIX = path.parse(__filename).name;

/**
 *
 * @param {'get' | 'set' | 'delete'} command
 * @param {string} userId
 * @param {number | null} recordNumber
 * @param {string | null} reminderText
 * @param {Date | null} triggerAt
 * @return {any}
 */
export async function remindme(
  command: 'get' | 'set' | 'delete',
  userId: string,
  recordNumber: number | null,
  reminderText: string | null,
  triggerAt: Date | null,
):Promise<any> {
  log.debug(`[${PREFIX}] Starting!`);

  log.debug(`[${PREFIX}] 
    command: ${command}
    userId: ${userId}
    recordNumber: ${recordNumber}
    reminderText: ${reminderText}
    triggerAt: ${triggerAt} 
  `);

  if (command === 'delete') {
    if (recordNumber === null) {
      return 'You must provide a record number to delete!';
    }
    log.debug(`[${PREFIX}] Deleting record ${recordNumber}`);

    const userUniqueId = (await db<Users>('users')
      .select(db.ref('id'))
      .where('discord_id', userId))[0].id;

    const unsorteddata = await db<UserReminders>('user_reminders')
      .select(
        db.ref('id').as('id'),
        db.ref('user_id').as('user_id'),
        db.ref('reminder_text').as('reminder_text'),
        db.ref('trigger_at').as('trigger_at'),
        db.ref('created_at').as('created_at'),
      )
      .where('user_id', userUniqueId);

    if (unsorteddata.length === 0) {
      return 'You have no dose records, you can use /idose to add some!';
    }

    // Sort data based on the created_at property
    const data = unsorteddata.sort((a, b) => {
      if (a.created_at < b.created_at) {
        return -1;
      }
      if (a.created_at > b.created_at) {
        return 1;
      }
      return 0;
    });

    const record = data[recordNumber];
    if (record === undefined || record === null) {
      return 'That record does not exist!';
    } else {
      const recordId = record.id;
      const reminderDate = data[recordNumber].created_at.toISOString();
      // log.debug(`[${PREFIX}] reminderDate: ${reminderDate}`);
      const timeVal = DateTime.fromISO(reminderDate);

      log.debug(`[${PREFIX}] I deleted:
      (${recordNumber}) ${timeVal.monthShort} ${timeVal.day} ${timeVal.year} ${timeVal.hour}:${timeVal.minute}
      ${record.reminder_text}
      `);

      await db<UserDrugDoses>('user_drug_doses')
        .where('id', recordId)
        .del();

      return `I deleted:
      > **(${recordNumber}) ${timeVal.monthShort} ${timeVal.day} ${timeVal.year} ${timeVal.hour}:${timeVal.minute}**
      > ${record.reminder_text}
      `;
    }
  }
  if (command === 'get') {
    const data = await db<Users>('users')
      .select(db.ref('id'))
      .where('discord_id', userId);

    log.debug(`[${PREFIX}] data: ${JSON.stringify(data)}`);

    if (data.length === 0) {
      return false;
    }

    const userUniqueId = data[0].id;

    log.debug(`[${PREFIX}] userUniqueId: ${userUniqueId}`);

    const unsorteddata = await db<UserReminders>('user_reminders')
      .select(
        db.ref('id').as('id'),
        db.ref('user_id').as('user_id'),
        db.ref('reminder_text').as('reminder_text'),
        db.ref('trigger_at').as('trigger_at'),
        db.ref('created_at').as('created_at'),
      )
      .where('user_id', userUniqueId);

    log.debug(`[${PREFIX}] Data: ${JSON.stringify(unsorteddata, null, 2)}`);

    log.debug(`[${PREFIX}] unsorteddata: ${unsorteddata.length}`);

    if (unsorteddata !== null && unsorteddata.length > 0) {
      // Sort data based on the trigger_at property
      const data = unsorteddata.sort((a, b) => {
        if (a.trigger_at < b.trigger_at) {
          return -1;
        }
        if (a.trigger_at > b.trigger_at) {
          return 1;
        }
        return 0;
      });

      log.debug(`[${PREFIX}] Sorted ${data.length} items!`);

      const reminders = [] as {
        index: number,
        date: Date,
        value: string,
      }[];

      for (let i = 0; i < data.length; i += 1) {
        const reminder = data[i];
        const reminderDate = data[i].trigger_at;

        // Lowercase everything but the first letter
        const field = {
          index: i,
          date: reminderDate,
          value: `${reminder.reminder_text}`,
        };
        reminders.push(field);
      }
      return reminders;
    } else {
      return false;
    }
  }
  if (command === 'set') {
    if (!triggerAt) {
      return 'You must provide a date and time for the reminder!';
    }
    const userData = await getUser(userId, null);
    await db<UserReminders>('user_reminders')
      .insert({
        user_id: userData.id,
        reminder_text: reminderText,
        trigger_at: triggerAt,
      });
  }
}
