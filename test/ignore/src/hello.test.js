import { HelloWorld } from './hello'

describe('Padoc test', ()=>{
  it("HelloWorld", ()=>{
    expect( HelloWorld() ).toEqual("HelloWorld")
  })
})