import { postText } from "./io.mjs"

export function help(params) {
    console.log(params.length)
    if (params.length == 0) {
        console.log("balls")
        postText("Command List:")
        postText("help   - Displays command list")
        postText("clear  - Clear screen")
    }
}

export function unknown(input) {
    postText(`Unknown command: ${input}`)
}