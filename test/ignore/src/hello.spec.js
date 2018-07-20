import { HelloWorld } from './hello'

describe('Padoc spec', ()=>{
  it("HelloWorld", ()=>{
    expect( HelloWorld() ).toEqual("HelloWorld")
  })
})