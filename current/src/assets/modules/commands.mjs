import { postText } from "./io.mjs"

export function help(params) {
    console.log(params.length)
    if (params.length == 0) {
        postText("Command List:");
        postText("  help       -  Displays command list");
        postText("  clear      -  Clear screen");
        postText("  portfolio  -  Display Portfolio");
        postText("  time       -  Display the System's Time");
        postText("  print      -  Display the System's Time");
        postText();

    }
}

export function unknown(input) {
    postText(`Unknown command: ${input}`)
}

export async function portfolio() {
    await postText("Basic Information:")
    await postText("    First Name: ", 200, "Ethan");
    await postText("    Last Name:  ", 200, "Egerton");
    await postText("    Location:   ", 200, "UK");
    await postText("    Contact:    ", 200, "egertonethan@gmail.com");
    await postText("    Github:     ", 200, "github.com/ethan-egerton");
    postText();
    await postText("Education:")
    await postText("    2021 - Present: ");
    await postText("        Location:           ", 100, "University Of Portsmouth");
    await postText("        Studying:           ", 100, "Studying Software Engineering");
    await postText("        First Year Result:  ", 100, "2:1");
    await postText("        Second Year Result: ", 100, "2:1");
    await postText("");
    await postText("    2019 - 2021: ");
    await postText("        Location: ", 100, "Isle Of Wight College");
    await postText("        Studying: ", 100, "Digital Technologies");
    await postText("        Awarded:  ", 200, "D* - D*");
    postText();
    await postText("Work Experience:")
    await postText("    2021, May - 2022, August:");
    await postText("        Location: ", 100, "Wetherspoons");
    await postText("        Title:    ", 100, "Bar Staff");
    postText();
    await postText("Skills:")
    await postText("    Python", 200);
    await postText("    JavaScript", 200);
    await postText("    C", 200);
    await postText("    PostgreSQL", 200);
    await postText("    Web Development", 200);
    await postText("    Database Development", 200);
    await postText("    Mobile Application Development", 200);
    postText();
}

export function time() {
    const date = new Date();
    const dateOptions = { month: 'numeric', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };

    const currentDate = date.toLocaleDateString('en-UK', dateOptions);
    const currentTime = date.toLocaleTimeString('en-UK', timeOptions);
    const formattedDate = currentDate + "/1999 " + currentTime;

    postText(`${formattedDate}`)
}
