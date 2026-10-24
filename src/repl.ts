import { createInterface } from 'node:readline';
import { on, EventEmitter } from 'node:events';
import process from 'node:process';

export function cleanInput(input: string): string[]{
    return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((word) => word !== "");
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

    if(ot == null){
        rl.prompt()
    }

    console.log(`You command was <${ot}>`)
    rl.prompt()
})
}