export function cleanInput(input: string): string[]{
    let arr:string[] = input.split(", ");
    return arr;
}

cleanInput("hello world")