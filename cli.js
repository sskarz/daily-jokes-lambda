#!/usr/bin/env node

const readline = require("readline");

const API_URL =
  "https://9x0cx38e3b.execute-api.us-east-2.amazonaws.com/default/daily_jokes_api";

const fetchJoke = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = await response.json();
    const { joke } = payload;

    if (!joke) {
      throw new Error("Response missing joke field");
    }

    const setup = joke.setup || joke.question || "Here's a joke:";
    const punchline = joke.punchline || joke.answer || "";

    console.log(`\n${setup}`);
    if (punchline) {
      console.log(punchline);
    }
    console.log();
  } catch (error) {
    console.error(`\nFailed to fetch joke: ${error.message}\n`);
  }
};

const createInterface = () =>
  readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

const prompt = (rl, question) =>
  new Promise((resolve, reject) => {
    rl.question(question, (answer) => resolve(answer));
    rl.once("close", () => reject(new Error("Input closed")));
  });

const showMenu = async () => {
  const rl = createInterface();
  let exit = false;

  rl.on("SIGINT", () => {
    exit = true;
    rl.close();
    console.log("\nExiting...\n");
  });

  while (!exit) {
    console.log("=== Daily Jokes CLI ===");
    console.log("1) Get a new joke");
    console.log("2) Exit");
    let choice;

    try {
      choice = (await prompt(rl, "Select an option: ")).trim();
    } catch (error) {
      break;
    }

    console.log();
    switch (choice) {
      case "1":
        await fetchJoke();
        break;
      case "2":
        exit = true;
        break;
      default:
        console.log("Invalid option. Try again.\n");
    }
  }

  rl.close();
};

if (require.main === module) {
  showMenu().catch((error) => {
    if (error.message !== "Input closed") {
      console.error(`Unexpected error: ${error.message}`);
    }
  });
}

module.exports = {
  fetchJoke,
  showMenu
};
