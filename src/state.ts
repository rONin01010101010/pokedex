import {getCommands} from './repl.js'
import { createInterface, type Interface } from "readline";

export type State =
{
tem : Record<string,CLICommand>,
rl: Interface
}

export function commandExit(){
    console.log("Closing the Pokedex... Goodbye!")
    process.exit(0)
}

export function commandHelp(){
    console.log('Welcome to the Pokedex!') 
    console.log("Usage:")

    let command = getCommands()
    for(const [key,value] of Object.entries(command)){
        console.log(`${key}: ${value.description}`)
    }
}

export type CLICommand  = {
    name: string,
    description: string,
    callback: (state: State) => void
}

export function initState(){
    const rl  = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex >"
})

 let reg = {
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
   
    help:{
        name: "help",
        description: "Displays a help message",
        callback: commandHelp
    }
  };

  let s: State = {
     tem: reg,
     rl: rl
     }

    return s
}