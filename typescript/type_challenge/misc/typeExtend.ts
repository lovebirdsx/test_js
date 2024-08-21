enum Lib {
  A = 'A',
  B = 'B',
  C = 'C',
}

enum Use {
  D = 'D',
  E = 'E',
}

function getData(type: Lib) {
  return type;
}

function getDataEx(type: Lib | Use) {
  return type;
}

getData(Lib.A);
getDataEx(Use.D);
