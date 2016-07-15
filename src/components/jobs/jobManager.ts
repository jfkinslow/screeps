import { Config } from './../../config/config';

export namespace JobManager {

  export let harvesterJobs: number = 0;

  export const haulerJobs: number = 3; // not used yet.
  export const upgraderJobs: number = 5;
  export const builderJobs: number = 1;
  export const repairerJobs: number = 3;
  export const wallRepairerJobs: number = 2;

  /**
   * Initialization scripts for the JobManager namespace.
   *
   * @export
   */
  export function load() {
    harvesterJobs = 2;

    if (Config.VERBOSE) {
      console.log("[JobManager] Successfully loaded")
    }
  }

}