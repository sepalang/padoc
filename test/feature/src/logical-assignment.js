const obj = { a:{ b:null } };
const b = 1;
let a;

a ||= b;
obj.a.b ||= c;

a &&= b;
obj.a.b &&= c;

export default obj;