export let memory: Memory;

export function loadMemory(): void {
  memory = Memory;
}

/**
 * Refreshes every memory entry of mining positions available on the room.
 *
 * @export
 * @param {Room} room The current room.
 */
export function refreshMiningPositions(room: Room) {
  if (!memory.rooms) {
    memory.rooms = {};
  }
  if (!memory.rooms[room.name]) {
    memory.rooms[room.name] = {};
  }
  if (!memory.rooms[room.name].unoccupied_mining_positions) {
    memory.rooms[room.name].unoccupied_mining_positions = [];
  }
}

/**
 * Clean up creep memory. Delete any creeps in memory that no longer exist in
 * a designated room.
 *
 * @export
 * @param {Room} room The current room.
 */
export function cleanupCreepMemory(room: Room): void {
  // refactor: brought in from gameManager
  // out of bounds check for creep memory entries
  if (!memory.creeps) {
    memory.creeps = {};
  }
  // clean up memory for deleted creeps
  for (let name in memory.creeps) {
    let creep: any = memory.creeps[name];

    if (creep.room === room.name) {
      if (!Game.creeps[name]) {
        console.log("[MemoryManager] Clearing non-existing creep memory:", name);

        if (memory.creeps[name].role === "sourceMiner") {
          memory.rooms[room.name].unoccupied_mining_positions
            .push(memory.creeps[name].occupied_mining_position);
        }

        delete memory.creeps[name];
      }
    } else if (_.keys(memory.creeps[name]).length === 0) {
      console.log("[MemoryManager] Clearing non-existing creep memory:", name);
      delete memory.creeps[name];
    }
  }
}
