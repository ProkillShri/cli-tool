#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        "kaun banega Crorepati ? \n"
    );

    await sleep();
    rainbowTitle.stop();

    console.log(`
        ${chalk.bgBlue('How to Play')}
        I am a process on your computer
        if you get any question wrong I will be ${chalk.bgRed("I will kill your machine")}
        So get your all answers correct....
    `);
}

async function askName() {
    const answers = await inquirer.prompt({
        name: "player_name",
        type: "input",
        message: "What your Name",
        default() {
            return "Player";
        }
    });

    playerName = answers.player_name
}

async function question1() {
    const answers = await inquirer.prompt({
        name: "question_1",
        type: "list",
        message: "When was I born \n",
        choices: [
            "February 31st, 2020",
            "May 19th, 2018",
            "November 24th, 2008",
            "January 7th, 2001"
        ]
    });

    return handleAnswer(answers.question_1 == "February 31st, 2020");
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner("Checking answers..").start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `Nice work ${playerName} 😀` });
    } else {
        spinner.error({ text: `💀💀💀 Game over, you lose ${playerName} , hint - I am your laptop and I was never born and you are a Fooled 😆😆` })
        process.exit(1);
    }

}

function winner() {
    console.clear();
    const msg = `Congrats  ${playerName} !\n $1 , 0 0 0, 0 0 0 !`

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    })
}

await welcome();
await askName();
await question1();
winner();