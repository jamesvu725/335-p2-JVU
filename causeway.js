// James Vu
// james.vu725@csu.fullerton.edu
// Contains all the algorithm and functions for traversing causeways

// holds all the visited rooms
const history = [];

//Calculate residue
function calc_residue(id1, id2, id3) {
  return Math.abs(id1-id2) + Math.abs(id1-id3) + Math.abs(id2-id3);
}

// return id into base 36
function convert_id_base(id) {
  return id.toString(36);
}

// returns a string with the room name in base 36
function get_room_name(id1, id2, id3) {
  let new_id1 = convert_id_base(id1);
  let new_id2 = convert_id_base(id2);
  let new_id3 = convert_id_base(id3);
  let name = new_id1 + new_id2 + new_id3;
  return name.toUpperCase();
}

// prints room with roomid
function draw_room(ctx, roomid, roomcnt, clr) {
  draw_rect_with_text(ctx, get_room_name(roomid[0], roomid[1], roomid[2]), 100, roomcnt * 200 +100, clr);
}

// check id limit rule
function check_limit(id1, id2, id3) {
  return (id1 <= 16 && id1 >= 0 && id2 <= 8 && id2 >= 0 && id3 <= 7 && id3 >= 0);
}

// checks zero or max rule
function check_zero_or_max(id1, id2, id3) {
  return (id1 == 16 || id2 == 8 || id3 == 7 || id2 == 0 || id3 == 0);
}

// finds the minimum residue of all rooms
function get_min_residue() {
  let min_res = 32;
  let cur_res = 32;
  let id3;
  // tries all combination of rooms fulfilling rules requirements
  for (let id1 = 0; id1 <= 16; ++id1) {
    for (let id2 = 0; id2 <= 8; ++id2) {
      id3 = get_last_id(id1, id2);
      if (id3 > 7 || id3 < 0) { continue; }
      if (check_zero_or_max(id1, id2, id3)) {
        cur_res = calc_residue(id1, id2, id3);
        min_res = Math.min(cur_res, min_res);
      }
    }
  }
  return min_res;
}

// gets the last room id given two other ids
function get_last_id(id1, id2) {
  return 16 - id1 - id2;
}

// checks if room exists already in history
function check_history(roomid) {
  let current, j;
  for (let i = 0; i < history.length; ++i) {
    if (roomid.length === history[i].length) {
      current = history[i];
      for (j = 0; j < roomid.length && roomid[j] === current[j]; ++j);
      if (j === roomid.length) { return true; }
    }
  }
  return false;
}

// finds the next room in the caverns
function find_next_room(roomid) {
  let id1 = roomid[0], id2 = roomid[1], id3 = roomid[2];
  let same = [[id1, "id1"], [id2, "id2"], [id3, "id3"]];
  let zero_max = [[7, "id3"], [8, "id2"], [0, "id3"], [0, "id2"], [16, "id1"]];
  let change;
  // brute force find next room following rules
  for (let i = 0; i < same.length; ++i) {
    for (let j = 0; j < zero_max.length; ++j) {
      if (same[i][1] == zero_max[j][1]) { continue; }
      change = get_last_id(same[i][0], zero_max[j][0]);
      if (change < 0 || change > 16) { continue; }
      id1 = null, id2 = null, id3 = null;
      // figures out which id number each number is
      switch (same[i][1]) {
        case "id1": id1 = same[i][0]; break;
        case "id2": id2 = same[i][0]; break;
        case "id3": id3 = same[i][0]; break;
        default: console.log("No id match found.");
      }
      switch (zero_max[j][1]) {
        case "id1": id1 = zero_max[j][0]; break;
        case "id2": id2 = zero_max[j][0]; break;
        case "id3": id3 = zero_max[j][0]; break;
        default: console.log("No id match found.");
      }
      if (id1 == null) { id1 = change; }
      if (id2 == null) { id2 = change; }
      if (id3 == null) { id3 = change; }
      // more rule checking
      if (!check_limit(id1, id2, id3)) {
        continue;
      }
      if (!check_history([id1, id2, id3])) { return [id1, id2, id3]; }
    }
  }
  return null;
}

// recursively update history, draw room and connections, and find next room until next room cannot be found
function update(ctx, delay, roomid, prev_room, rmcnt, min_res) {
  // adds room to history
  history.push(roomid);
  // draws connection if more than 1 room
  if (rmcnt > 0) {
    draw_connection(ctx, rmcnt);
  }
  // colors previous room blue
  if (calc_residue(prev_room[0], prev_room[1], prev_room[2]) != min_res) { draw_room(ctx, prev_room, rmcnt-1, 'blue'); }
  //colors new room orange if minimum or green for current
  if (calc_residue(roomid[0], roomid[1], roomid[2]) == min_res) {
    draw_room(ctx, roomid, rmcnt, 'orange');
    return;
  } else {
    draw_room(ctx, roomid, rmcnt, 'green');
  }
  // find next room
  let next_room = find_next_room(roomid);
  // if next room found, update canvas
  if (next_room != null) {
    ++rmcnt;
    setTimeout(function() { update(ctx, delay, next_room, roomid, rmcnt, min_res); }, delay );
  }
  return;
}
