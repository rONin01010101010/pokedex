import { createInterface } from 'node:readline';
import { on, EventEmitter } from 'node:events';
import process from 'node:process';


export type CLICommand  = {
    name: string,
    description: string,
    callback: (commands: Record<string, CLICommand>) => void
}

export function cleanInput(input: string): string[]{
    return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((word) => word !== "");
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

export function getCommands(): Record<string, CLICommand> {
  
    return {
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
}

export function startREPL(){
const ee = new EventEmitter()
const rl  = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex >"
})


rl.prompt()

rl.on('line', (input) => {
    let ot = cleanInput(input)
    let command = getCommands()

    
        for(const [key,value] of Object.entries(command)){
           if(ot[0] == value.name){
              if(value.name == 'exit'){
                commandExit()
              }

              if(value.name == 'help'){
                commandHelp()
              }

              else {
                console.log("Unknown command")
              }
           }
           
        }

    if(ot == null){
        rl.prompt()
    }
    
   
    rl.prompt()
})
}