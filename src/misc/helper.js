export function getNameIntials(name) {
  const spilitName = name.toUpperCase().split(" ");

  if (spilitName.length > 1) {
    return spilitName[0][0] + spilitName[1][0];
  }

  return spilitName[0][0];
}
