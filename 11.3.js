function skipSpace(string) {
  var skip = string.match(/^(\s|#.*)*/);
  return string.slice(skip[0].length);
}
